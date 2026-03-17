# Salesforce Consulting Framework - Backlog

**Project:** Salesforce Consulting Framework for Claude Code
**Author:** Michael Rihm
**Date:** 2026-03-11
**Last Updated:** 2026-03-12

---

## Backlog Overview

This backlog tracks all work items for the Salesforce Consulting Framework, organized by delivery phase. Each item references the requirement(s) it implements from [REQUIREMENTS.md](REQUIREMENTS.md).

**Statuses:** NOT STARTED | IN PROGRESS | DONE | BLOCKED

---

## Phase 0: Project Setup

Foundation work to establish the project structure, tracking, and planning artifacts.

| ID | Title | Priority | Status | Implements |
|--------|-----------------------------------------------|----------|--------|------------|
| BL-001 | Create Linear project, milestones, and cycles | P0 | DONE | REQ-006 |
| BL-002 | Create requirements document (REQUIREMENTS.md)| P0 | DONE | - |
| BL-003 | Create backlog document (BACKLOG.md) | P0 | DONE | - |

---

## Phase 1: Research & Reference Material

Curate and write the reference material that the sf-project-init skill will use during scaffolding and embed in generated projects.

| ID | Title | Priority | Status | Implements |
|--------|--------------------------------------------------------------|----------|--------|-------------------|
| BL-004 | Write salesforce-well-architected.md reference | P0 | DONE | REQ-014 |
| BL-005 | Write salesforce-products.md reference (all product families)| P0 | DONE | REQ-004, REQ-014 |
| BL-006 | Write entry-points.md reference (4 entry point definitions) | P0 | DONE | REQ-003, REQ-017 |

---

## Phase 2: sf-project-init Skill

Build the core skill, including the interview flow, scaffolding logic, and all supporting configuration files.

| ID | Title | Priority | Status | Implements |
|--------|--------------------------------------------------------------|----------|--------|------------------------------|
| BL-007 | Write SKILL.md (8-round interview definition) | P0 | DONE | REQ-001, REQ-002 |
| BL-008 | Write document-templates.md (BRD, SDD, TDD, etc.) | P1 | DONE | REQ-016 |
| BL-009 | Write workflow-rules.md (CLAUDE.md golden rules, scaffolding)| P0 | DONE | REQ-005, REQ-008, REQ-013 |
| BL-010 | Write cicd-templates.md (GitHub Actions workflows) | P1 | DONE | REQ-010 |
| BL-011 | Write naming-conventions.md | P1 | DONE | REQ-015 |
| BL-012 | Write interview-adaptations.md (per entry point) | P1 | DONE | REQ-017, REQ-018 |

---

## Phase 3: Diagrams

Create the 8 interactive HTML diagrams with D3.js, following the existing diagram pattern in the claude-toolkit repo.

| ID | Title | Priority | Status | Implements |
|--------|--------------------------------------------------------------|----------|--------|------------|
| BL-013 | Create SF Org Architecture diagram (HTML + data file) | P1 | DONE | REQ-011 |
| BL-014 | Create Data Model (ERD) diagram (HTML + data file) | P1 | DONE | REQ-011 |
| BL-015 | Create Integration Architecture diagram (HTML + data file) | P1 | DONE | REQ-011 |
| BL-016 | Create CI/CD Pipeline diagram (HTML + data file) | P1 | DONE | REQ-011 |
| BL-017 | Create Security Model diagram (HTML + data file) | P1 | DONE | REQ-011 |
| BL-018 | Create Development Workflow diagram (HTML + data file) | P1 | DONE | REQ-011 |
| BL-019 | Create Project Timeline diagram (HTML + data file) | P1 | DONE | REQ-011 |
| BL-020 | Create Engagement Framework Overview diagram (HTML + data) | P1 | DONE | REQ-011 |
| BL-021 | Update reference/index.html with SF diagram links | P1 | DONE | REQ-011 |

---

## Phase 4: Framework Document

Produce the comprehensive framework document for dual audiences (consultants and practice leaders).

| ID | Title | Priority | Status | Implements |
|--------|--------------------------------------------------------------|----------|--------|------------|
| BL-022 | Generate salesforce-consulting-framework.docx | P1 | DONE | REQ-012 |

---

## Phase 5: Integration & Updates

Update the claude-toolkit repo to integrate the new framework into the existing toolstack, diagrams, and installation flow. These items were completed, then superseded by the repo reorganization that moved SF files to their own repo.

| ID | Title | Priority | Status | Implements |
|--------|--------------------------------------------------------------|----------|--------|------------------------------|
| BL-023 | Update my-toolstack.md with SF tools and MCP servers | P0 | DONE | REQ-009, REQ-020, NFR-003 |
| BL-024 | Update reference/data/architecture-data.js | P1 | DONE | NFR-003 |
| BL-025 | Update reference/data/lifecycle-data.js | P1 | DONE | NFR-003 |
| BL-026 | Update install.sh for sf-project-init skill | P0 | DONE | NFR-002 |
| BL-027 | Update reference/index.html (main toolkit index) | P1 | DONE | NFR-003 |

---

## Phase 6: Framework Enhancements

Expand the framework from a project scaffolding tool into a full consulting lifecycle platform.

| ID | Title | Priority | Status | Implements |
|--------|--------------------------------------------------------------|----------|-------------|------------------------------|
| BL-029 | Create sf-architect-solutioning skill (SKILL.md + references)| P0 | DONE | REQ-021 |
| BL-030 | Add wiki templates to document-templates.md | P1 | DONE | REQ-022 |
| BL-031 | Add design standards template (two-layer) | P1 | DONE | REQ-023 |
| BL-032 | Add component registry template | P0 | DONE | REQ-024 |
| BL-033 | Add Linear sync workflow + script template | P1 | DONE | REQ-025 |
| BL-034 | Add Golden Rules 14-16 + event-to-action rows | P0 | DONE | REQ-026 |
| BL-035 | Update workflow-rules.md (wiki, registry, standards, global) | P0 | DONE | REQ-022, REQ-023, REQ-024, REQ-026 |
| BL-036 | Wire wiki, registry, sync into sf-project-init/SKILL.md | P0 | DONE | REQ-022, REQ-024, REQ-025 |
| BL-037 | Update README.md with new capabilities | P1 | DONE | All |
| BL-038 | Update REQUIREMENTS.md with REQ-021 through REQ-026 | P0 | DONE | All |
| BL-039 | Update BACKLOG.md with Phase 6 items | P0 | DONE | All |

---

## Phase 7: Polish & Quality

Visual and UX improvements across all diagrams and deliverables.

| ID | Title | Priority | Status | Linear | Implements |
|--------|-----------------------------------------------|----------|-------------|--------|------------|
| BL-028 | Fix diagram edge/line rendering across all 8 SF diagrams | P1 | NOT STARTED | RIH-34 | REQ-011 |

**BL-028 Description:** Lines/edges in the diagrams look messy and clunky. Review and improve edge routing, curvature, arrow placement, and visual clarity across all 8 interactive HTML diagrams.

## Phase 8: Multi-User Concurrency

Guardrails, workflows, and skill updates to make the framework safe for multi-user teams (developers, PMs, BAs, QAs working simultaneously).

| ID | Title | Priority | Status | Layer | Implements |
|--------|--------------------------------------------------------------|----------|--------|-------|------------|
| BL-040 | Create CODEOWNERS template in sf-project-init scaffolding | P0 | DONE | Layer 1 | REQ-027 |
| BL-041 | Add branch protection documentation to scaffolding output | P0 | DONE | Layer 1 | REQ-027 |
| BL-042 | Create docs-validate.yml CI workflow template | P0 | DONE | Layer 2 | REQ-029 |
| BL-043 | Enhance sf-validate.yml with doc-update checks and commit format validation | P1 | DONE | Layer 2 | REQ-033 |
| BL-044 | Add YAML manifest validation to CI pipeline | P2 | DONE | Layer 2 | REQ-030 |
| BL-045 | Split component registry into per-domain files | P1 | DONE | Layer 3 | REQ-030 |
| BL-046 | Make BACKLOG.md fully auto-generated from Linear | P1 | DONE | Layer 3 | REQ-031 |
| BL-047 | Split changelog into per-sprint files | P2 | DONE | Layer 3 | REQ-030 |
| BL-048 | Add pre-development git branch setup to sf-develop | P1 | DONE | Layer 4 | REQ-028 |
| BL-049 | Add post-implementation commit and PR protocol to sf-develop | P1 | DONE | Layer 4 | REQ-028, REQ-033 |
| BL-050 | Add conflict pre-check to sf-develop | P2 | DONE | Layer 4 | REQ-032 |
| BL-051 | Create active work lock file system | P2 | DONE | Layer 5 | REQ-032 |
| BL-052 | Add multi-user concurrency requirements to REQUIREMENTS.md | P1 | DONE | - | REQ-027–REQ-033 |
| BL-053 | Update BACKLOG.md with Phase 8 items | P1 | DONE | - | - |
| BL-054 | Add team role and concurrency questions to sf-project-init interview | P1 | DONE | Layer 7 | REQ-027, REQ-029 |

---

## Dependency Map

```
Phase 0 (Setup)
  BL-001 ──> Phase 2 (Linear IDs needed for skill)
  BL-002 ──> Phase 1, 2 (requirements drive all work)
  BL-003 ──> Phase 1, 2 (backlog tracks all work)

Phase 1 (Reference)
  BL-004 ──> BL-007, BL-009 (well-architected feeds skill and golden rules)
  BL-005 ──> BL-007 (product catalog feeds interview)
  BL-006 ──> BL-007, BL-012 (entry points feed interview and adaptations)

Phase 2 (Skill)
  BL-007 ──> Phase 3 (skill must exist before diagrams reference it)
  BL-009 ──> BL-022 (workflow rules feed framework document)

Phase 3 (Diagrams)
  BL-013..BL-020 ──> BL-021 (all diagrams before index update)

Phase 4 (Document)
  BL-022 depends on Phase 1 + Phase 2 content

Phase 5 (Integration)
  BL-023..BL-027 depend on Phase 2 + Phase 3 completion

Phase 6 (Enhancements)
  BL-029 independent (new skill)
  BL-030..BL-035 depend on Phase 2 (modify existing reference files)
  BL-036 depends on BL-029..BL-035 (wires everything into SKILL.md)
  BL-037..BL-039 depend on BL-029..BL-036 (documentation updates)

Phase 8 (Multi-User Concurrency)
  BL-052 independent (documentation)
  BL-053 depends on BL-052 (references REQ-027 through REQ-033)
  BL-040 depends on BL-054 (interview provides team data for CODEOWNERS)
  BL-041 depends on BL-040 (branch protection docs reference CODEOWNERS)
  BL-042 independent (new CI workflow template)
  BL-043 depends on BL-042 (extends same cicd-templates.md section)
  BL-044 depends on BL-043 (extends same sf-validate.yml template)
  BL-048 independent (new sf-develop section)
  BL-049 depends on BL-048 (Section 7 follows Section 0)
  BL-050 depends on BL-048 (Section 0.5 inserted after Section 0)
  BL-045 depends on BL-048, BL-049 (modifies sf-develop Section 6)
  BL-047 depends on BL-045 (sf-develop Section 6 changes aligned)
  BL-046 depends on BL-040, BL-045 (CODEOWNERS + registry split must exist)
  BL-051 depends on BL-048, BL-049, BL-050 (adds to Sections 0 and 7)
  BL-054 depends on BL-040, BL-042 (Round 6 recommends what's already built)
```

---

## Completed

| ID | Completed | Notes |
|-------------|-----------|-------|
| BL-001–BL-027 | 2026-03-12 | All Phase 0–5 items completed. Phase 5 integration was done then superseded by repo reorganization. |
| BL-029–BL-039 | 2026-03-12 | Phase 6 framework enhancements: architect skill, wiki, component registry, design standards, Linear sync, global rules. |
| BL-040–BL-054 | 2026-03-16 | Phase 8 multi-user concurrency: CODEOWNERS, CI checks, structured living docs, git workflow, session awareness, auto-generated BACKLOG, skill updates. |

---

## Notes

- All items were created as Linear issues (RIH-12 through RIH-33).
- Phase 8 items (BL-040 through BL-054) were created as Linear issues (RIH-129 through RIH-143) under the "Phase 8: Multi-User Concurrency" milestone.
- Priority levels: P0 = must-have for initial delivery, P1 = important but can follow, P2 = nice-to-have.
- This backlog is the working document; Linear is the system of record once issues are created.
