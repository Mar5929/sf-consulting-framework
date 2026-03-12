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
| BL-021 | Update diagrams/index.html with SF diagram links | P1 | DONE | REQ-011 |

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
| BL-024 | Update diagrams/data/architecture-data.js | P1 | DONE | NFR-003 |
| BL-025 | Update diagrams/data/lifecycle-data.js | P1 | DONE | NFR-003 |
| BL-026 | Update install.sh for sf-project-init skill | P0 | DONE | NFR-002 |
| BL-027 | Update diagrams/index.html (main toolkit index) | P1 | DONE | NFR-003 |

---

## Phase 6: Polish & Quality

Visual and UX improvements across all diagrams and deliverables.

| ID | Title | Priority | Status | Linear | Implements |
|--------|-----------------------------------------------|----------|-------------|--------|------------|
| BL-028 | Fix diagram edge/line rendering across all 8 SF diagrams | P1 | NOT STARTED | RIH-34 | REQ-011 |

**BL-028 Description:** Lines/edges in the diagrams look messy and clunky. Review and improve edge routing, curvature, arrow placement, and visual clarity across all 8 interactive HTML diagrams.

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
```

---

## Completed

| ID | Completed | Notes |
|-------------|-----------|-------|
| BL-001–BL-027 | 2026-03-12 | All Phase 0–5 items completed. Phase 5 integration was done then superseded by repo reorganization. |

---

## Notes

- All items were created as Linear issues (RIH-12 through RIH-33).
- Priority levels: P0 = must-have for initial delivery, P1 = important but can follow, P2 = nice-to-have.
- This backlog is the working document; Linear is the system of record once issues are created.
