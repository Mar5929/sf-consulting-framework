# Salesforce Consulting Framework - Requirements Document

**Project:** Salesforce Consulting Framework for Claude Code
**Author:** Michael Rihm
**Date:** 2026-03-11
**Status:** DRAFT

---

## Overview

A standardized framework for Salesforce consulting engagements, built on Claude Code. All consultants at the firm use this framework when starting new client engagements. The framework provides a structured initialization skill (`sf-project-init`) that scaffolds projects through an 8-round interview, enforces Salesforce Well-Architected best practices, integrates with the firm's toolchain (VS Code, Git/GitHub, Linear, GitHub Actions, SFDX CLI), and produces professional-grade documentation and diagrams.

---

## Requirement Index

| ID | Title | Priority | Status |
|---------|-------------------------------------------------------|----------|--------|
| REQ-001 | sf-project-init Skill | P0 | DRAFT |
| REQ-002 | 8-Round Interview Flow | P0 | DRAFT |
| REQ-003 | Entry Point Support (4 Types) | P0 | DRAFT |
| REQ-004 | Salesforce Product Coverage | P0 | DRAFT |
| REQ-005 | CLAUDE.md Generation with 13 Golden Rules | P0 | DRAFT |
| REQ-006 | Linear Auto-Creation | P0 | DRAFT |
| REQ-007 | Context7 Integration for Live Docs | P1 | DRAFT |
| REQ-008 | SFDX Project Scaffolding | P0 | DRAFT |
| REQ-009 | MCP Server Auto-Configuration | P0 | DRAFT |
| REQ-010 | CI/CD Templates (GitHub Actions) | P1 | DRAFT |
| REQ-011 | Interactive HTML Diagrams (8) | P1 | DRAFT |
| REQ-012 | Framework Document (.docx) | P1 | DRAFT |
| REQ-013 | Shared Repo Model / Multi-Consultant | P0 | DRAFT |
| REQ-014 | Well-Architected Reference Material | P0 | DRAFT |
| REQ-015 | Naming Conventions Standard | P1 | DRAFT |
| REQ-016 | Document Templates (BRD, SDD, etc.) | P1 | DRAFT |
| REQ-017 | Entry Point Interview Adaptations | P1 | DRAFT |
| REQ-018 | Org Health Check (Rescue/Takeover) | P1 | DRAFT |
| REQ-019 | Environment Strategy Configuration | P0 | DRAFT |
| REQ-020 | External Tool Integration | P0 | DRAFT |
| NFR-001 | Portability Across Machines | P0 | DRAFT |
| NFR-002 | Install via install.sh | P0 | DRAFT |
| NFR-003 | Toolstack Sync with Diagrams | P1 | DRAFT |
| NFR-004 | Professional Quality for Practice Leader Pitch | P0 | DRAFT |
| NFR-005 | Offline-First with Online Enhancement | P2 | DRAFT |
| REQ-021 | sf-architect-solutioning Skill | P0 | DRAFT |
| REQ-022 | Project Wiki Framework | P1 | DRAFT |
| REQ-023 | Design Standards (Two-Layer) | P1 | DRAFT |
| REQ-024 | Component Registry | P0 | DRAFT |
| REQ-025 | Backlog-to-Linear Sync | P1 | DRAFT |
| REQ-026 | Global Project Instructions (Rules 14-16) | P0 | DRAFT |

---

## Functional Requirements

### REQ-001: sf-project-init Skill

**Priority:** P0
**Status:** DRAFT

The framework provides a standalone Claude Code skill named `sf-project-init`. This is a dedicated skill, not an extension of the existing `project-init` skill. It is purpose-built for Salesforce consulting engagements and invoked via `/sf-project-init`.

**Acceptance Criteria:**
- Skill is defined in `skills/sf-project-init/SKILL.md`
- Skill is invocable via `/sf-project-init` in Claude Code
- Skill orchestrates a complete project initialization flow from interview through scaffolding
- Skill is independent from any existing `project-init` skill

---

### REQ-002: 8-Round Interview Flow

**Priority:** P0
**Status:** DRAFT

The `sf-project-init` skill conducts a structured 8-round interview to gather all information needed for project scaffolding. Each round covers a distinct domain and collects structured answers before proceeding.

**Interview Rounds:**
1. **Engagement Basics** - Client name, project name, entry point type, engagement timeline, team size
2. **Salesforce Products & Clouds** - Which SF products are in scope, existing licenses, new implementations vs. enhancements
3. **Org & Environment Strategy** - Sandbox strategy, source of truth (scratch orgs vs. sandboxes), environment promotion path, existing org details (for rescue/takeover)
4. **Team & Access** - Consultant roster, roles, GitHub usernames, SF credentials approach, permission sets
5. **Architecture & Integration** - Integration patterns, external systems, data migration needs, API strategy, MuleSoft involvement
6. **Development Standards** - Apex style preferences, LWC patterns, naming conventions, code review process, testing requirements
7. **Project Management** - Linear project structure, milestone definitions, sprint/cycle cadence, issue label taxonomy
8. **CI/CD & Deployment** - GitHub Actions workflows, deployment strategy, validation rules, quality gates, rollback procedures

**Acceptance Criteria:**
- Each round presents clear questions with sensible defaults
- Answers from earlier rounds inform later round questions (e.g., entry point type adapts subsequent rounds)
- Interview can be resumed if interrupted
- All collected data is persisted as structured JSON for downstream use

---

### REQ-003: Entry Point Support (4 Types)

**Priority:** P0
**Status:** DRAFT

The framework supports four distinct engagement entry points. Each entry point modifies the interview flow, scaffolding output, and default configurations.

**Entry Points:**
1. **Discovery** - Pre-implementation assessment and roadmap. Outputs: discovery report template, current-state assessment, recommendation deck, roadmap. Lighter scaffolding, heavier documentation templates.
2. **Build (New Implementation)** - Greenfield or major new module. Outputs: full SFDX project, CI/CD, complete documentation suite. Maximum scaffolding.
3. **Managed Services** - Ongoing support and enhancement of existing orgs. Outputs: org health baseline, ticketing integration, SLA tracking, enhancement request workflow. Focus on operational templates.
4. **Rescue / Takeover** - Taking over a troubled or poorly-documented org. Outputs: org health check framework, technical debt assessment, documentation reconstruction, stabilization plan. Includes org analysis tooling.

**Acceptance Criteria:**
- Interview Round 1 captures entry point selection
- Subsequent interview rounds adapt questions based on entry point
- Scaffolding output varies by entry point (see REQ-017)
- All four entry points produce a valid, usable project structure

---

### REQ-004: Salesforce Product Coverage

**Priority:** P0
**Status:** DRAFT

The framework supports all major Salesforce product families. Product selection during the interview drives which reference materials, naming conventions, CI/CD checks, and scaffolding are included.

**Supported Products:**
- Sales Cloud
- Service Cloud
- Experience Cloud (Communities)
- Marketing Cloud (Account Engagement / Pardot, Marketing Cloud Engagement)
- Data Cloud
- Revenue Cloud / CPQ
- Industries / OmniStudio
- MuleSoft
- Tableau / CRM Analytics

**Acceptance Criteria:**
- Interview Round 2 presents all products for selection
- Selected products drive CLAUDE.md golden rules content
- Product-specific naming conventions are included (see REQ-015)
- Product-specific Well-Architected guidance is referenced (see REQ-014)

---

### REQ-005: CLAUDE.md Generation with 13 Golden Rules

**Priority:** P0
**Status:** DRAFT

The skill generates a project-specific `CLAUDE.md` file containing 13 golden rules for Salesforce development. These rules are contextual to the engagement and enforce Well-Architected best practices within Claude Code sessions.

**13 Golden Rules (baseline, adapted per engagement):**
1. Follow Salesforce Well-Architected principles (Trusted, Easy, Adaptable)
2. Use declarative-first approach; code only when configuration falls short
3. Respect the org's governor limits in all Apex and SOQL
4. Bulkify all triggers and batch processes
5. Follow the project's naming conventions (per REQ-015)
6. Write meaningful test classes with 85%+ coverage targeting real scenarios
7. Use Custom Metadata Types and Custom Settings over hardcoded values
8. Implement proper error handling and logging patterns
9. Document all customizations in-code and in the project wiki
10. Follow the environment promotion path (dev -> QA -> UAT -> prod)
11. Use source-tracked development with SFDX project structure
12. Respect security model; never bypass sharing rules or FLS
13. Commit frequently with descriptive messages; reference Linear issues

**Acceptance Criteria:**
- CLAUDE.md is generated during project scaffolding
- Rules are adapted based on interview answers (e.g., product selection, entry point)
- Additional engagement-specific rules can be appended based on interview
- CLAUDE.md includes project context (client name, products, team, environment strategy)

---

### REQ-006: Linear Auto-Creation

**Priority:** P0
**Status:** DRAFT

During project initialization, the skill automatically creates a structured project in Linear, including milestones, cycles, and starter issues. Uses the Linear MCP tools.

**Auto-Created Items:**
- **Project** - Named after the engagement (e.g., "Acme Corp - Sales Cloud Implementation")
- **Milestones** - Based on entry point and engagement timeline (e.g., Discovery: "Current State Assessment", "Recommendations & Roadmap"; Build: "Sprint 0 - Setup", "Sprint 1 - Core Config", etc.)
- **Cycles** - Sprint/cycle structure based on interview Round 7 cadence
- **Starter Issues** - Pre-populated issues for common first-sprint tasks (environment setup, CI/CD configuration, access provisioning, initial data model review)
- **Labels** - Engagement-specific labels for tracking (e.g., by product, by workstream)

**Acceptance Criteria:**
- All Linear items are created using `mcp__claude_ai_Linear__*` tools
- Issues are assigned to Michael Rihm (user ID: `8d75f0a6-f848-41af-9f4b-d06036d6af82`)
- Team is Rihm (team ID: `dfe15bc4-6dd0-4bde-8609-6620efc3140d`)
- Created items reference each other (issues linked to milestones, milestones to project)
- A summary of created items is displayed after initialization

---

### REQ-007: Context7 Integration for Live Docs

**Priority:** P1
**Status:** DRAFT

The framework integrates with Context7 MCP for real-time Salesforce documentation lookups. This supplements the curated Well-Architected reference material (REQ-014) with live, up-to-date API docs.

**Integration Points:**
- CLAUDE.md instructs Claude Code to use Context7 for SF API lookups
- `resolve-library-id` for Salesforce libraries (Apex, LWC, SFDX, etc.)
- `query-docs` for specific API signatures, configuration options, metadata types
- Fallback to curated reference when Context7 is unavailable

**Acceptance Criteria:**
- Generated CLAUDE.md includes Context7 usage instructions
- Key Salesforce library IDs are pre-resolved and documented
- Context7 is preferred over web searches for SF documentation

---

### REQ-008: SFDX Project Scaffolding

**Priority:** P0
**Status:** DRAFT

The skill generates a complete SFDX project directory structure tailored to the engagement. Structure follows Salesforce DX best practices.

**Directory Structure (Build entry point, full):**
```
project-root/
  .claude/
    CLAUDE.md
    settings.local.json
    rules/
  .github/
    workflows/
      validate-pr.yml
      deploy-to-qa.yml
      deploy-to-uat.yml
      deploy-to-prod.yml
  .vscode/
    settings.json
    extensions.json
  config/
    project-scratch-def.json
    environments.json
  docs/
    brd/
    sdd/
    runbook/
    diagrams/
  force-app/
    main/
      default/
        classes/
        triggers/
        lwc/
        aura/
        objects/
        flows/
        permissionsets/
        profiles/
        layouts/
        tabs/
        staticresources/
  scripts/
    apex/
    data/
    shell/
  sfdx-project.json
  package.json
  .gitignore
  .prettierrc
  .eslintrc.json
```

**Acceptance Criteria:**
- Directory structure adapts based on entry point (discovery is lighter, rescue adds analysis tooling)
- Product-specific directories are included only for selected products
- `.gitignore` follows SF DX best practices
- `sfdx-project.json` is pre-configured with correct namespace and paths

---

### REQ-009: MCP Server Auto-Configuration

**Priority:** P0
**Status:** DRAFT

The skill configures three external MCP servers for the engagement's Claude Code environment.

**MCP Servers:**
1. **salesforcecli/mcp** (Official SF DX MCP Server, 309 stars) - Provides SFDX CLI commands directly in Claude Code
2. **Jaganpro/sf-skills** (163 stars, 14 specialized Claude Code skills) - Adds SF-specific Claude Code skills for Apex, LWC, flows, etc.
3. **tsmztech/mcp-server-salesforce** (135 stars) - Community MCP for SOQL queries, CRUD operations, metadata operations

**Acceptance Criteria:**
- MCP server configuration is added to `.claude/settings.local.json`
- Installation commands are included in the project's setup script
- CLAUDE.md documents available MCP tools and when to use each
- Graceful degradation if an MCP server is unavailable

---

### REQ-010: CI/CD Templates (GitHub Actions)

**Priority:** P1
**Status:** DRAFT

The framework includes GitHub Actions workflow templates for Salesforce CI/CD pipelines.

**Workflow Templates:**
- **validate-pr.yml** - Runs on PR to main/develop: Apex tests, PMD static analysis, LWC Jest tests, scratch org validation
- **deploy-to-qa.yml** - Deploys to QA sandbox on merge to develop
- **deploy-to-uat.yml** - Deploys to UAT sandbox on release candidate tag
- **deploy-to-prod.yml** - Deploys to production on release tag, with manual approval gate

**Acceptance Criteria:**
- Workflows use `sf` CLI (not deprecated `sfdx`)
- Auth uses JWT bearer flow with GitHub Secrets
- Workflows include proper quality gates (test coverage thresholds, PMD rules)
- Templates are parameterized for the engagement (org aliases, connected app details)

---

### REQ-011: Interactive HTML Diagrams (8)

**Priority:** P1
**Status:** DRAFT

The framework includes 8 interactive HTML diagrams built with D3.js, following the existing diagram pattern in the claude-toolkit repo.

**Diagrams:**
1. **SF Org Architecture** - Org structure, sandbox hierarchy, environment promotion path
2. **Data Model (ERD)** - Core object relationships for selected products
3. **Integration Architecture** - External systems, APIs, MuleSoft flows, middleware
4. **CI/CD Pipeline** - GitHub Actions workflow visualization
5. **Security Model** - Profiles, permission sets, sharing rules, FLS
6. **Development Workflow** - Branching strategy, PR flow, code review, deployment
7. **Project Timeline** - Gantt-style milestone and sprint visualization
8. **Engagement Framework Overview** - High-level view of all framework components

**Acceptance Criteria:**
- Each diagram is a standalone HTML file with embedded D3.js
- Diagrams are interactive (zoom, pan, click for details)
- Data is externalized in `reference/data/` JS files
- Diagrams adapt to the engagement (products, entry point, team size)
- An `index.html` file links to all diagrams

---

### REQ-012: Framework Document (.docx)

**Priority:** P1
**Status:** DRAFT

A comprehensive framework document in `.docx` format that serves dual audiences: consultants (technical how-to) and practice leaders (business case and methodology overview).

**Document Sections:**
- Executive Summary (practice leader audience)
- Framework Overview and Philosophy
- Getting Started (consultant audience)
- Entry Points and When to Use Each
- The 8-Round Interview
- Project Scaffolding Output
- Salesforce Well-Architected Integration
- Toolchain Overview (Claude Code, VS Code, Linear, GitHub, SFDX)
- CI/CD Pipeline Design
- Diagram Gallery
- Appendices (naming conventions, golden rules, product matrix)

**Acceptance Criteria:**
- Generated as `.docx` using a Python script or equivalent
- Professional formatting with table of contents, headers, page numbers
- Suitable for presentation to firm leadership
- Temporary generation files are cleaned up after creation (per user instructions)

---

### REQ-013: Shared Repo Model / Multi-Consultant

**Priority:** P0
**Status:** DRAFT

Engagements use a shared repository model where multiple consultants work in the same repo. The framework supports this with branching strategy, access controls, and collaboration conventions.

**Requirements:**
- Branch naming convention: `feature/{linear-issue-key}-{short-description}`
- PR template with checklist (tests, documentation, SF deployment validation)
- CODEOWNERS file mapping product areas to consultants
- Consultant onboarding script (clone, auth orgs, install dependencies)
- Environment isolation (each consultant uses their own scratch org or dev sandbox)

**Acceptance Criteria:**
- Interview Round 4 captures consultant roster and GitHub usernames
- CODEOWNERS is generated based on team and product assignments
- PR template is included in `.github/PULL_REQUEST_TEMPLATE.md`
- Onboarding documentation is generated for new team members

---

### REQ-014: Well-Architected Reference Material

**Priority:** P0
**Status:** DRAFT

The framework includes curated Salesforce Well-Architected reference material. This is a local, always-available reference that supplements live Context7 lookups (REQ-007).

**Reference Content:**
- Well-Architected Framework overview (Trusted, Easy, Adaptable pillars)
- Anti-patterns and remediation guidance
- Product-specific architectural guidance (per REQ-004)
- Governor limits quick reference
- Security best practices checklist
- Performance optimization patterns

**Acceptance Criteria:**
- Reference material is stored in `skills/sf-project-init/reference/salesforce-well-architected.md`
- Content is structured for Claude Code consumption (headers, bullet points, code examples)
- Material is referenced in generated CLAUDE.md files
- Covers all products listed in REQ-004

---

### REQ-015: Naming Conventions Standard

**Priority:** P1
**Status:** DRAFT

A comprehensive naming conventions document that covers all Salesforce metadata types and development artifacts.

**Scope:**
- Apex classes, triggers, test classes, batch classes, schedulable classes
- LWC components and events
- Custom objects, fields, record types, page layouts
- Flows and process builders
- Permission sets and profiles
- Custom metadata types and custom settings
- Integration-related naming (named credentials, external services, platform events)
- Git branches, commit messages, PR titles

**Acceptance Criteria:**
- Conventions are documented in `skills/sf-project-init/reference/naming-conventions.md`
- Conventions are product-aware (e.g., CPQ-specific, OmniStudio-specific prefixes)
- Generated CLAUDE.md references the naming conventions
- Examples are provided for each convention

---

### REQ-016: Document Templates (BRD, SDD, etc.)

**Priority:** P1
**Status:** DRAFT

The framework includes document templates for common Salesforce consulting deliverables. Templates are generated into the project's `docs/` directory during scaffolding.

**Templates:**
- Business Requirements Document (BRD)
- Solution Design Document (SDD)
- Technical Design Document (TDD)
- Data Migration Plan
- Test Strategy and Test Plan
- Deployment Runbook
- User Training Guide outline
- Change Management Plan

**Acceptance Criteria:**
- Templates are Markdown files with standard section structure
- Templates are adapted based on entry point (discovery gets assessment templates, build gets full suite)
- Templates include boilerplate text with `[PLACEHOLDER]` markers for engagement-specific content
- Templates reference the naming conventions (REQ-015) and golden rules (REQ-005)

---

### REQ-017: Entry Point Interview Adaptations

**Priority:** P1
**Status:** DRAFT

Each entry point modifies the 8-round interview to ask relevant questions and skip irrelevant ones.

**Adaptations:**
- **Discovery** - Skips detailed CI/CD questions; adds discovery-specific questions (stakeholder mapping, current pain points, success metrics)
- **Build** - Full interview; all 8 rounds at maximum depth
- **Managed Services** - Adds SLA and support tier questions; reduces initial architecture depth; adds knowledge transfer questions
- **Rescue/Takeover** - Adds org health assessment questions; asks about known issues, previous vendor handoff, documentation state; includes technical debt inventory

**Acceptance Criteria:**
- Interview flow adapts dynamically based on Round 1 entry point selection
- Skipped questions use sensible defaults
- Additional entry-point-specific questions are clearly marked
- Documentation captures all adaptations for each entry point

---

### REQ-018: Org Health Check (Rescue/Takeover)

**Priority:** P1
**Status:** DRAFT

For rescue/takeover engagements, the framework includes an org health check capability that assesses the current state of an existing Salesforce org.

**Health Check Areas:**
- Metadata complexity analysis (number of custom objects, fields, flows, Apex classes)
- Technical debt indicators (deprecated API versions, hardcoded IDs, missing test coverage)
- Security posture (profiles vs. permission sets ratio, sharing model assessment)
- Data quality signals (duplicate rules, validation rules coverage)
- Integration inventory (connected apps, named credentials, outbound connections)

**Acceptance Criteria:**
- Health check uses SFDX CLI and/or MCP tools to query org metadata
- Results are formatted as a structured report
- Report feeds into Linear issue creation for remediation items
- Health check can be re-run to track improvement over time

---

### REQ-019: Environment Strategy Configuration

**Priority:** P0
**Status:** DRAFT

The framework captures and enforces the engagement's environment strategy, including sandbox topology, source of truth, and promotion paths.

**Configuration Options:**
- Source of truth: scratch orgs (source-driven) or sandboxes (org-driven)
- Sandbox types and purposes (Developer, Developer Pro, Partial Copy, Full Copy)
- Promotion path (e.g., Dev -> QA -> UAT -> Staging -> Prod)
- Org aliases and authentication approach
- Refresh schedule and data seeding strategy

**Acceptance Criteria:**
- Interview Round 3 captures environment strategy
- Configuration is stored in `config/environments.json`
- CI/CD workflows reference environment configuration
- CLAUDE.md includes environment promotion rules

---

### REQ-020: External Tool Integration

**Priority:** P0
**Status:** DRAFT

The framework integrates with three external open-source tools that extend Claude Code's Salesforce capabilities.

**Tools:**
1. **salesforcecli/mcp** (GitHub, 309 stars)
   - Official Salesforce DX MCP Server
   - Provides: SF CLI commands via MCP protocol
   - Use case: Org operations, deployments, metadata retrieval

2. **Jaganpro/sf-skills** (GitHub, 163 stars)
   - 14 specialized Claude Code skills for Salesforce
   - Provides: Apex generation, LWC scaffolding, flow analysis, test generation
   - Use case: SF-specific development tasks within Claude Code

3. **tsmztech/mcp-server-salesforce** (GitHub, 135 stars)
   - Community MCP for Salesforce
   - Provides: SOQL queries, CRUD operations, metadata operations via MCP
   - Use case: Direct org interaction from Claude Code sessions

**Acceptance Criteria:**
- All three tools are documented in CLAUDE.md with usage guidance
- MCP servers are configured in `.claude/settings.local.json` during scaffolding
- `sf-skills` installation is handled by the project setup script
- Tool availability is validated during initialization with graceful fallback

---

## Non-Functional Requirements

### NFR-001: Portability Across Machines

**Priority:** P0
**Status:** DRAFT

The framework must be portable across consultant machines. Any consultant should be able to install the framework from the `claude-toolkit` repo and have it work without machine-specific configuration.

**Acceptance Criteria:**
- No hardcoded absolute paths in skill files or reference material
- All dependencies are documented and installable via standard package managers
- Framework works on Windows, macOS, and Linux
- Environment-specific values (API keys, org credentials) use environment variables or local config files excluded from version control

---

### NFR-002: Install via install.sh

**Priority:** P0
**Status:** DRAFT

The framework installs via the existing `install.sh` script in the `claude-toolkit` repo. The install script handles copying skills, reference material, and configuration to the correct Claude Code directories.

**Acceptance Criteria:**
- `install.sh` is updated to include `sf-project-init` skill installation
- Installation is idempotent (safe to re-run)
- Install script validates prerequisites (Node.js, SF CLI, Git, Claude Code)
- Post-install verification confirms skill is available

---

### NFR-003: Toolstack Sync with Diagrams

**Priority:** P1
**Status:** DRAFT

Per the existing toolstack sync rule, any tools added by this framework must be reflected in the architecture, lifecycle, and devloop diagram data files.

**Acceptance Criteria:**
- `my-toolstack.md` is updated with all new tools (sf-project-init, MCP servers, sf-skills)
- `reference/data/architecture-data.js` includes new nodes and edges
- `reference/data/lifecycle-data.js` includes SF project initialization steps
- `reference/data/devloop-data.js` includes SF development loop tools
- Diagrams render correctly after updates

---

### NFR-004: Professional Quality for Practice Leader Pitch

**Priority:** P0
**Status:** DRAFT

All deliverables (diagrams, documents, scaffolded projects) must be of professional quality suitable for presentation to firm practice leaders and partners.

**Acceptance Criteria:**
- Diagrams are visually polished with consistent styling
- Framework document (.docx) has professional formatting
- Generated CLAUDE.md files are clear and actionable
- Document templates follow consulting industry standards
- Overall presentation demonstrates the value of Claude Code for SF consulting

---

### NFR-005: Offline-First with Online Enhancement

**Priority:** P2
**Status:** DRAFT

The framework must function fully offline (curated reference material, templates, scaffolding) with optional online enhancement (Context7 live docs, Linear creation, MCP server connectivity).

**Acceptance Criteria:**
- Core scaffolding works without internet access
- Reference material is bundled locally
- Context7 and Linear integrations degrade gracefully when unavailable
- Clear messaging when online features are unavailable

---

### REQ-021: sf-architect-solutioning Skill

**Priority:** P0
**Status:** DRAFT

A standalone Claude Code skill that acts as a Certified Salesforce Technical Architect. Triggers when the user provides requirements to architect and solution. Enforces a pre-implementation documentation gate, builds structured solution plans, and ensures all living documents stay current during implementation.

**Acceptance Criteria:**
- Skill is defined in `skills/sf-architect-solutioning/SKILL.md` and installable to `~/.claude/skills/sf-architect-solutioning/`
- Pushes back on vague requirements and asks 3-5 clarifying questions
- Enforces pre-implementation gate (BRD, technical spec, data model, component registry, design standards must be current)
- Produces structured solution plan with components, patterns, governor limit assessment, security considerations, and trade-offs
- Waits for user approval before implementation
- Updates all living documents during implementation (NON-NEGOTIABLE)
- Includes reference files: solutioning checklist, solution plan template, architectural patterns

---

### REQ-022: Project Wiki Framework

**Priority:** P1
**Status:** DRAFT

A structured wiki generated into scaffolded projects during sf-project-init Phase 3. Provides organized documentation for organization context, ways of working, and per-application-area details.

**Acceptance Criteria:**
- Wiki structure generated under `wiki/` directory during scaffolding
- Includes `organization-overview.md`, `ways-of-working/` (6 pages), and `applications/` (per-product subdirectories)
- Application subdirectories created based on Round 3 product selections (e.g., `sales-cloud/`, `service-cloud/`)
- Each application area has: overview.md, technical-specs.md, requirements.md, process-flows.md
- Wiki pages are automatically updated by the sf-architect-solutioning skill when solutions affect an application area
- Templates defined in `skills/sf-project-init/references/document-templates.md`

---

### REQ-023: Design Standards (Two-Layer)

**Priority:** P1
**Status:** DRAFT

A two-layer design standards document generated at `wiki/ways-of-working/design-standards.md`. Layer 1 contains framework defaults (16 Golden Rules, Well-Architected patterns). Layer 2 contains client-specific standards captured during interview Round 8.

**Acceptance Criteria:**
- Design standards template defined in `skills/sf-project-init/references/document-templates.md`
- Layer 1 (framework defaults) always included with 16 Golden Rules and Well-Architected patterns
- Layer 2 (client-specific) populated from Round 8 interview answers about client design standards
- Workflow rule enforces checking design standards before implementation
- Client standards override framework defaults when conflicting

---

### REQ-024: Component Registry

**Priority:** P0
**Status:** DRAFT

A comprehensive metadata inventory (`docs/COMPONENT_REGISTRY.md`) generated as a NON-OPTIONAL living document. Tracks every component in the Salesforce org across 12 categories.

**Acceptance Criteria:**
- Generated during scaffolding with empty category tables (NON-OPTIONAL — always included)
- Tracks 12 categories: Custom Objects, Custom Fields, Apex Classes, Apex Triggers, Flows, LWC, Permission Sets, Validation Rules, Page Layouts, Custom Metadata Types, Platform Events, Named Credentials
- Summary table with category counts and last-updated dates
- Mandatory update on every component create/modify/delete (Rule 15)
- Cross-references to BL-XXX and REQ-XXX identifiers
- Distinct from CODE_ATLAS.md (code navigation guide vs. metadata inventory)

---

### REQ-025: Backlog-to-Linear Sync

**Priority:** P1
**Status:** DRAFT

An opt-in GitHub Actions workflow that syncs Linear project state to `docs/BACKLOG.md` daily. Linear is the source of truth.

**Acceptance Criteria:**
- Opt-in during Round 5 of the interview
- Generates `.github/workflows/linear-sync.yml` (runs weekdays 8 AM UTC)
- Generates `scripts/linear-sync.js` using `@linear/sdk`
- Linear state overwrites BACKLOG.md sync summary section
- Items in BACKLOG.md not found in Linear flagged with `[NOT IN LINEAR]`
- One-way sync (Linear → BACKLOG.md) to avoid merge conflicts
- Creates PR for review rather than committing directly
- Requires GitHub Secrets: LINEAR_API_KEY, LINEAR_TEAM_ID, LINEAR_PROJECT_ID

---

### REQ-026: Global Project Instructions (Rules 14-16)

**Priority:** P0
**Status:** DRAFT

Three new Golden Rules added to the CLAUDE.md template, expanding from 13 to 16 rules. These rules apply to every scaffolded project.

**Acceptance Criteria:**
- Rule 14 (Living Document Sync): All living documents kept in sync when modifying code
- Rule 15 (Component Registry Updates): Every component change updates COMPONENT_REGISTRY.md immediately (non-negotiable)
- Rule 16 (UI Testing with Playwright): Ask user about screenshot loop before UI work
- New event-to-action rows added to CLAUDE.md Section 4
- Rules documented in `skills/sf-project-init/references/workflow-rules.md` under "Global Project Constraints"
- Rules embedded in the CLAUDE.md template in `skills/sf-project-init/references/document-templates.md`
