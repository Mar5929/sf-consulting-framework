# Multi-User Concurrency Plan for sf-consulting-framework

**Date:** 2026-03-16
**Context:** Making the framework safe and usable for teams where multiple developers, PMs, BAs, and QAs all work against the same project repo simultaneously.

---

## The Core Problems

### Problem 1: Documentation and Code in One Repo

The current structure puts `docs/`, `wiki/`, `deliverables/`, and `force-app/` in the same Git repository. When a BA pulls the repo Monday, edits `wiki/applications/sales-cloud/requirements.md`, and pushes Wednesday without pulling first, their push carries stale `force-app/` metadata from Monday. If merge conflicts arise in XML metadata files, a non-technical person will resolve them wrong.

### Problem 2: No File Ownership or Path-Based Guards

Anyone can modify any file. There's nothing preventing a QA engineer from accidentally staging and committing changes to `force-app/main/default/classes/` alongside their `deliverables/test-plans/` edits. A simple `git add .` from the wrong role is a production risk.

### Problem 3: Living Docs Concurrency

The COMPONENT_REGISTRY.md, COMPONENT_MANIFEST.yaml, and BACKLOG.md are single files that multiple people update. Two developers building separate features simultaneously will both modify these files, creating merge conflicts on every PR. These aren't code conflicts that are easy to resolve — they're structured data files where a bad merge breaks the registry.

### Problem 4: No Branch-to-Work-Item Enforcement

The framework defines a `feature/BL-XXX-description` convention but nothing enforces it. A developer can push to `develop` directly, create branches without backlog IDs, or commit without the `feat(BL-XXX):` format. The CI/CD pipelines only validate Salesforce deployments, not workflow compliance.

### Problem 5: Claude Sessions Are Isolated

Each developer runs their own Claude Code session. Claude maintains context via CLAUDE.md and living docs, but two Claude sessions don't know about each other. Developer A's Claude might be designing changes to `AccountService.cls` while Developer B's Claude is also modifying it — neither session knows the other exists.

---

## Solution Architecture

The plan below is organized into layers. Each layer is independently valuable — you don't have to implement all of them at once.

---

## Layer 1: CODEOWNERS + Branch Protection (Do This First)

This costs nothing, takes 30 minutes to configure, and prevents the most dangerous failure modes.

### 1.1 CODEOWNERS File

Add to the repo root. This file tells GitHub who must approve changes to which paths:

```
# .github/CODEOWNERS
#
# Each line maps a path pattern to the GitHub users/teams who must approve PRs
# touching those paths. The LAST matching pattern takes precedence.
#
# Format: <path-pattern>  <owner1> <owner2> ...

# ── Salesforce Source (Developers Only) ──────────────────────
/force-app/                     @dev-team
/config/                        @dev-team
/.github/workflows/             @dev-team @tech-lead

# ── Living Docs (Developers own, others can propose) ────────
/docs/COMPONENT_REGISTRY.md     @dev-team
/docs/COMPONENT_MANIFEST.yaml   @dev-team
/docs/CODE_ATLAS.md             @dev-team
/docs/TECHNICAL_SPEC.md         @dev-team @tech-lead
/docs/DATA_MODEL.md             @dev-team @tech-lead

# ── Requirements & Backlog (PM/BA own) ──────────────────────
/docs/BACKLOG.md                @pm-team
/docs/REQUIREMENTS.md           @pm-team @ba-team
/docs/DECISIONS.md              @tech-lead

# ── Wiki (Shared, but reviewed) ─────────────────────────────
/wiki/                          @pm-team @ba-team @tech-lead

# ── Deliverables (Role-based) ───────────────────────────────
/deliverables/brd/              @ba-team
/deliverables/sdd/              @tech-lead @dev-team
/deliverables/test-plans/       @qa-team
/deliverables/data-migration/   @dev-team
/deliverables/architecture/     @tech-lead
/deliverables/presentations/    @pm-team
/deliverables/training/         @pm-team @ba-team

# ── Project Config (Tech Lead only) ─────────────────────────
/CLAUDE.md                      @tech-lead
/sfdx-project.json              @tech-lead
```

### 1.2 Branch Protection Rules

Configure in GitHub → Settings → Branches:

**`develop` branch:**
- Require pull request reviews before merging
- Require review from Code Owners (this activates CODEOWNERS)
- Require status checks to pass (sf-validate workflow)
- Require branches to be up to date before merging
- Do NOT allow bypassing the above settings

**`main` branch:**
- Same as develop, plus:
- Require 2 reviewers
- Restrict who can push to release managers only

### 1.3 What This Solves

A BA can now only get their changes merged if a Code Owner for that path approves. If a BA's PR accidentally includes `force-app/` changes, the `@dev-team` must approve those changes — and a developer will see the stale files and reject the PR. This is the single most impactful change for team safety.

---

## Layer 2: Path-Scoped CI Checks (Prevent Bad Commits)

Add GitHub Actions workflows that validate PRs based on what files were changed.

### 2.1 Docs-Only PR Validation

A new workflow that runs on PRs touching only docs/wiki/deliverables and ensures no code files were accidentally included:

```yaml
# .github/workflows/docs-validate.yml
name: Validate Docs PR

on:
  pull_request:
    branches: [develop, main]
    paths:
      - 'docs/**'
      - 'wiki/**'
      - 'deliverables/**'

jobs:
  check-no-code-changes:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check for accidental code changes
        run: |
          # Get list of changed files in this PR
          CHANGED=$(git diff --name-only origin/${{ github.base_ref }}...HEAD)

          # Check if any force-app files were modified
          CODE_CHANGES=$(echo "$CHANGED" | grep -E '^(force-app/|config/|scripts/|\.github/workflows/)' || true)

          if [ -n "$CODE_CHANGES" ]; then
            echo "::error::This PR includes code/config changes alongside documentation changes."
            echo "::error::Please split into separate PRs:"
            echo "::error::  1. A docs-only PR for wiki/docs/deliverables changes"
            echo "::error::  2. A code PR for force-app/config changes"
            echo ""
            echo "Files that should be in a separate PR:"
            echo "$CODE_CHANGES"
            exit 1
          fi

          echo "✅ Docs-only PR verified. No code changes detected."

  validate-markdown:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Check markdown syntax
        uses: DavidAnson/markdownlint-cli2-action@v19
        with:
          globs: |
            docs/**/*.md
            wiki/**/*.md
            deliverables/**/*.md
```

### 2.2 Code PR Validation (Enhanced)

Update the existing `sf-validate.yml` to also verify that docs were updated:

```yaml
# Add this job to .github/workflows/sf-validate.yml
  check-docs-updated:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check if component docs were updated
        run: |
          CHANGED=$(git diff --name-only origin/${{ github.base_ref }}...HEAD)

          # If Apex/LWC/Flow files changed, check for registry updates
          CODE_CHANGED=$(echo "$CHANGED" | grep -E '^force-app/' || true)
          REGISTRY_CHANGED=$(echo "$CHANGED" | grep -E '^docs/(COMPONENT_REGISTRY|COMPONENT_MANIFEST)' || true)

          if [ -n "$CODE_CHANGED" ] && [ -z "$REGISTRY_CHANGED" ]; then
            echo "::warning::Code files changed but COMPONENT_REGISTRY.md / COMPONENT_MANIFEST.yaml were not updated."
            echo "::warning::Per Golden Rule 15, every component change must update both files."
            echo ""
            echo "Changed code files:"
            echo "$CODE_CHANGED"
            # Warning only — don't block, but make it visible
            # Change to 'exit 1' to make this a hard gate
          fi

      - name: Check commit message format
        run: |
          # Verify commits follow feat(BL-XXX): format
          COMMITS=$(git log --format='%s' origin/${{ github.base_ref }}..HEAD)
          BAD_COMMITS=$(echo "$COMMITS" | grep -v -E '^(feat|fix|chore|docs|test|refactor)\(BL-[0-9]+\):' || true)

          if [ -n "$BAD_COMMITS" ]; then
            echo "::warning::Some commits don't follow the format 'feat(BL-XXX): description':"
            echo "$BAD_COMMITS"
          fi
```

### 2.3 YAML Manifest Validation

Add a check that `COMPONENT_MANIFEST.yaml` is valid YAML and hasn't been corrupted by a bad merge:

```yaml
# Add to sf-validate.yml
  validate-manifest:
    runs-on: ubuntu-latest
    if: contains(github.event.pull_request.changed_files, 'COMPONENT_MANIFEST')
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Validate YAML
        run: |
          pip install pyyaml --break-system-packages
          python3 -c "
          import yaml, sys
          try:
              with open('docs/COMPONENT_MANIFEST.yaml') as f:
                  data = yaml.safe_load(f)
              assert 'version' in data, 'Missing version field'
              assert 'domains' in data, 'Missing domains field'
              assert 'components' in data, 'Missing components field'
              print('✅ COMPONENT_MANIFEST.yaml is valid')
          except Exception as e:
              print(f'::error::COMPONENT_MANIFEST.yaml validation failed: {e}')
              sys.exit(1)
          "
```

---

## Layer 3: Structured Living Docs (Reduce Merge Conflicts)

The root cause of merge conflicts in living docs is that they're monolithic files. Two developers adding components to the same COMPONENT_REGISTRY.md will always conflict.

### 3.1 Split Component Registry by Domain

Instead of one `COMPONENT_REGISTRY.md`, use per-domain registry files:

```
docs/
├── COMPONENT_MANIFEST.yaml          # Master index (machine-readable, rarely hand-edited)
├── COMPONENT_REGISTRY.md            # Summary table only (auto-generated from domain files)
├── registry/
│   ├── lead-management.md           # Components in lead-management domain
│   ├── opportunity-management.md    # Components in opportunity-management domain
│   ├── case-management.md           # Components in case-management domain
│   └── ...
└── domains/
    ├── lead-management.md           # Domain context (already exists)
    └── ...
```

With this structure, Developer A working on lead management only modifies `docs/registry/lead-management.md`, while Developer B working on case management only modifies `docs/registry/case-management.md`. No conflicts.

The summary `COMPONENT_REGISTRY.md` is auto-generated by a script or GitHub Action that concatenates the domain files — nobody edits it directly.

### 3.2 Split Changelog by Sprint/Cycle

Instead of a single `CHANGELOG.md`, use per-sprint files:

```
docs/
├── CHANGELOG.md                     # Auto-generated rollup
└── changelog/
    ├── sprint-2026-03-17.md         # Sprint starting 2026-03-17
    ├── sprint-2026-03-31.md         # Sprint starting 2026-03-31
    └── ...
```

Developers append to the current sprint's changelog file. At sprint end, the rollup is auto-generated.

### 3.3 BACKLOG.md as Read-Only (Linear is Source of Truth)

You already have the Linear sync workflow that generates BACKLOG.md from Linear. Take this to its logical conclusion: make BACKLOG.md a fully auto-generated file that nobody edits directly. All backlog updates happen in Linear, and the sync workflow pushes the rendered markdown.

Add to `.github/CODEOWNERS`:
```
/docs/BACKLOG.md                @github-actions[bot]
```

This eliminates BACKLOG.md as a merge conflict source entirely.

---

## Layer 4: Git Workflow Automation in sf-develop Skill

Update the `sf-develop` skill to handle git operations as part of the development workflow, so developers don't have to remember conventions.

### 4.1 Add Pre-Development Git Setup to sf-develop

Add to the beginning of sf-develop's "Pre-Development Verification" section:

```markdown
## 0. Git Branch Setup (Before Any Work)

Before writing any code:

1. **Verify clean working directory:**
   ```bash
   git status
   ```
   If there are uncommitted changes, ask the user to commit or stash them.

2. **Pull latest develop:**
   ```bash
   git checkout develop
   git pull origin develop
   ```

3. **Create feature branch from develop:**
   ```bash
   git checkout -b feature/BL-XXX-short-description
   ```
   Use the BL-ID from the approved solution plan. If no BL-ID exists, create the
   Linear issue first and get the ID.

4. **Confirm branch:**
   Tell the user: "Working on branch `feature/BL-XXX-short-description` from latest develop."
```

### 4.2 Add Post-Implementation Commit Protocol to sf-develop

Add to the end of sf-develop, after "Living Document Updates":

```markdown
## 7. Commit & PR Protocol

After all code and docs are updated:

1. **Stage only the files from this work item:**
   ```bash
   git add force-app/main/default/classes/NewService.cls
   git add force-app/main/default/classes/NewService.cls-meta.xml
   git add docs/COMPONENT_REGISTRY.md
   git add docs/COMPONENT_MANIFEST.yaml
   # ... etc, list each file explicitly
   ```
   **NEVER use `git add .`** — always stage specific files to avoid
   including unrelated changes.

2. **Commit with standard format:**
   ```bash
   git commit -m "feat(BL-XXX): Short description

   - Created NewService.cls (service layer for X)
   - Updated COMPONENT_REGISTRY.md (+1 Apex Class)
   - Updated COMPONENT_MANIFEST.yaml (new entry in domain Y)
   - Updated docs/DATA_MODEL.md (new field Z on Object)"
   ```

3. **Push and create PR:**
   ```bash
   git push origin feature/BL-XXX-short-description
   gh pr create \
     --base develop \
     --title "feat(BL-XXX): Short description" \
     --body "## Changes\n- [summary]\n\n## Docs Updated\n- [list]\n\n## Testing\n- [test results]"
   ```

4. **Update Linear status:**
   Use Linear MCP to set the issue to "In Review".

Present the PR URL to the user and remind them to request review from the
appropriate Code Owners.
```

### 4.3 Add Conflict Detection

Add to the sf-develop pre-development check:

```markdown
## 0.5 Conflict Pre-Check

Before starting implementation, check if other branches are touching the same files:

```bash
# List all open feature branches
git branch -r | grep 'origin/feature/'

# For each, check if it touches files in the same domain
# This is advisory — show the user what's in flight
```

If another branch modifies files in the same `force-app/` paths, warn the user:
"Branch `feature/BL-042-case-routing` also modifies `CaseService.cls`.
Consider coordinating with that developer to avoid merge conflicts."
```

---

## Layer 5: Session Awareness (Cross-Developer Coordination)

### 5.1 Active Work Lock File

Add a lightweight lock mechanism using a file in the repo:

```
docs/.active-work.json
```

```json
{
  "locks": [
    {
      "developer": "Michael Rihm",
      "branch": "feature/BL-042-case-routing",
      "files": [
        "force-app/main/default/classes/CaseService.cls",
        "force-app/main/default/classes/CaseHandler.cls"
      ],
      "started": "2026-03-16T10:00:00Z",
      "linear_issue": "BL-042"
    }
  ]
}
```

Update sf-develop to:
1. **On start:** Read `.active-work.json`, check for conflicts, add own lock entry, commit and push
2. **On finish:** Remove lock entry, commit and push
3. **On conflict:** Warn the developer and suggest coordination

This is advisory (soft locks), not hard enforcement. But it makes conflicts visible before they happen.

### 5.2 Session Startup Enhancement

Update CLAUDE.md Section 8 (Session Startup) to include:

```markdown
5.5 **Check active work locks:**
    - Read `docs/.active-work.json`
    - If another developer is working on files in the same domain, warn:
      "[Developer] is currently working on [files] for [BL-ID]. Coordinate
      before modifying these files."
    - Show all active locks to the user
```

---

## Layer 6: Repo Separation Strategy (For Scale)

If the team grows beyond 4-5 people or non-technical users consistently struggle with Git, split into two repos:

### 6.1 Code Repo (developers only)

```
acme-crm-code/
├── CLAUDE.md
├── sfdx-project.json
├── force-app/
├── config/
├── scripts/
├── docs/
│   ├── COMPONENT_REGISTRY.md
│   ├── COMPONENT_MANIFEST.yaml
│   ├── CODE_ATLAS.md
│   ├── TECHNICAL_SPEC.md
│   ├── DATA_MODEL.md
│   └── domains/
└── .github/workflows/
```

### 6.2 Project Repo (everyone)

```
acme-crm-project/
├── CLAUDE.md                        # Lighter version, project-context only
├── docs/
│   ├── BACKLOG.md                   # Auto-synced from Linear
│   ├── REQUIREMENTS.md
│   ├── DECISIONS.md
│   └── CHANGELOG.md                 # Auto-synced from code repo
├── wiki/
├── deliverables/
└── .github/workflows/
    ├── sync-from-code-repo.yml      # Pull registry, changelog from code repo
    └── docs-validate.yml
```

### 6.3 Cross-Repo Sync

A GitHub Action in the code repo pushes read-only copies of certain files to the project repo whenever they change:

```yaml
# In code repo: .github/workflows/sync-to-project-repo.yml
name: Sync Docs to Project Repo

on:
  push:
    branches: [develop]
    paths:
      - 'docs/COMPONENT_REGISTRY.md'
      - 'docs/DATA_MODEL.md'
      - 'docs/CHANGELOG.md'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code repo
        uses: actions/checkout@v4

      - name: Push to project repo
        uses: cpina/github-action-push-to-another-repository@v1.7
        env:
          SSH_DEPLOY_KEY: ${{ secrets.PROJECT_REPO_DEPLOY_KEY }}
        with:
          source-directory: 'docs/'
          destination-github-username: 'Mar5929'
          destination-repository-name: 'acme-crm-project'
          target-branch: 'main'
          target-directory: 'docs/synced-from-code/'
```

This way, PMs and BAs can browse the component registry and data model in the project repo (read-only synced copies) without ever touching the code repo.

---

## Layer 7: Skill Updates Required

### 7.1 Update sf-project-init

Add the following to the interview and scaffolding:

**Round 1 additions:**
- Ask: "How many consultants will be working in this repo simultaneously?"
- Ask: "Which team members are non-technical (PMs, BAs, QAs)?"
- If non-technical users: "Will non-technical team members need to edit documentation directly in the repo, or will they use Linear/Notion/external tools?"

**Round 6 additions:**
- Ask: "Should we set up CODEOWNERS to enforce path-based review requirements?"
- Ask: "Should we set up a docs-only validation workflow to prevent accidental code changes in documentation PRs?"
- If team > 3: recommend the per-domain registry split from Layer 3

**Scaffolding additions:**
- Generate `.github/CODEOWNERS` based on team roles from Round 1
- Generate `.github/workflows/docs-validate.yml`
- Generate `docs/.active-work.json` (empty locks array)
- Add conflict-check logic to the CLAUDE.md Session Startup section
- If team includes non-technical users: generate a `CONTRIBUTING.md` with role-specific git workflow guides

### 7.2 Update sf-develop

- Add the pre-development git branch setup (Layer 4.1)
- Add the post-implementation commit protocol (Layer 4.2)
- Add the conflict pre-check (Layer 4.3)
- Add active work lock file management (Layer 5.1)
- Update the "Living Document Updates" section to use per-domain registry files if the split is enabled

### 7.3 Update sf-architect-solutioning

- Add a "Concurrency Check" step after the Pre-Implementation Gate:
  - Read `.active-work.json` for conflicts
  - Check open PRs on GitHub for overlapping file changes
  - Warn the user if the solution plan touches components another developer is actively modifying

### 7.4 New Skill: sf-git-workflow

Consider a new skill specifically for git operations:

```markdown
---
name: sf-git-workflow
description: >
  Manages git operations for Salesforce consulting engagements. Creates feature branches
  from backlog items, handles commits with proper formatting, creates PRs, manages
  active work locks, and coordinates with other developers. Trigger when user says
  "start working on BL-XXX", "commit my changes", "create a PR", "what branches
  are active", or "who's working on what".
---
```

This keeps git concerns separate from architecture (sf-architect-solutioning) and implementation (sf-develop), following the same separation of concerns pattern.

---

## Implementation Priority

| Priority | Layer | Effort | Impact | Description |
|----------|-------|--------|--------|-------------|
| **P0** | Layer 1 | 30 min | Critical | CODEOWNERS + branch protection — prevents the worst failure modes |
| **P0** | Layer 2.1 | 1 hour | High | docs-validate.yml — catches accidental code in doc PRs |
| **P1** | Layer 4.1-4.2 | 2-3 hours | High | Git automation in sf-develop — standardizes the dev workflow |
| **P1** | Layer 2.2 | 1 hour | Medium | Enhanced code PR checks — warns on missing doc updates |
| **P1** | Layer 3.3 | 1 hour | Medium | BACKLOG.md as read-only auto-generated — eliminates conflict source |
| **P2** | Layer 3.1 | 3-4 hours | Medium | Per-domain registry split — reduces registry merge conflicts |
| **P2** | Layer 5.1 | 2-3 hours | Medium | Active work lock file — makes concurrent work visible |
| **P2** | Layer 2.3 | 30 min | Low | YAML manifest validation — catches bad merges |
| **P3** | Layer 7.4 | 4-6 hours | Medium | sf-git-workflow skill — dedicated git operations skill |
| **P3** | Layer 6 | 6-8 hours | High (at scale) | Repo separation — only needed if team > 4-5 or git literacy is low |
| **P3** | Layer 7.1-7.3 | 4-6 hours | Medium | Skill updates — wire concurrency into existing skills |

---

## What This Doesn't Solve (Future Considerations)

1. **UI for non-technical users** — Layers 1-7 make the repo safer but still require Git literacy. A web UI that abstracts Git for PMs/BAs is a separate effort worth considering if your consulting company scales.

2. **Real-time collaboration** — Two Claude sessions can't communicate in real-time. The lock file (Layer 5) is eventually consistent, not instant. For true real-time coordination, you'd need an external service (like a Slack bot or webhook) that notifies developers when someone starts working on overlapping files.

3. **Automated documentation generation from code changes** — The current framework tells Claude to update docs when code changes, but doesn't verify it happened. A post-merge GitHub Action that diffs `force-app/` changes against `docs/COMPONENT_REGISTRY.md` and opens a "docs out of date" issue if new components aren't registered would close this gap.

4. **Org metadata drift detection** — When someone makes changes directly in the Salesforce org (clicks in Setup) without pulling them into source control, the repo diverges from reality. A scheduled GitHub Action that retrieves metadata from the org and compares against `force-app/` would catch this.
