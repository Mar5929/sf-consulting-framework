# Salesforce Consulting Framework

A structured methodology and Claude Code skill for scaffolding Salesforce consulting engagement projects. Conduct an expert-led interview, generate tailored project documentation, spin up SFDX source structure, CI/CD pipelines, and Linear project tracking — all from a single `/sf-project-init` command.

## What Is This?

Starting a new Salesforce engagement means hours of boilerplate: creating project folders, writing a CLAUDE.md, setting up CI/CD, scaffolding deliverables, configuring dev standards, and creating Linear issues. This framework automates all of it behind a conversational interview.

The `sf-project-init` skill acts as an **engagement architect and onboarding interviewer**. It asks smart, context-aware questions across 8 rounds — adapting to your engagement type (greenfield, build phase, managed services, or rescue) — then generates a complete, opinionated project scaffold tailored to your answers.

The framework encodes best practices from real Salesforce consulting engagements: the 13 Golden Rules for Apex development, GitFlow branching strategies, Well-Architected patterns, naming conventions, and deliverable templates. You get a production-ready project structure in minutes instead of days.

## How It Works

The skill follows 5 phases from first invocation to a fully scaffolded project:

```
  Interview          Summary           Scaffolding        Linear            Post-Creation
 ┌──────────┐     ┌──────────┐      ┌──────────┐     ┌──────────┐      ┌──────────┐
 │ 8-round  │ ──► │ Present  │ ──►  │ Generate │ ──► │ Create   │ ──►  │ Next     │
 │ expert   │     │ creation │      │ SFDX,    │     │ project, │      │ steps &  │
 │ interview│     │ plan for │      │ docs,    │     │ issues,  │      │ backlog  │
 │          │     │ approval │      │ CI/CD    │     │ cycles   │      │ review   │
 └──────────┘     └──────────┘      └──────────┘     └──────────┘      └──────────┘
```

**Nothing is created until you approve.** The skill gathers context first, shows you exactly what it will generate, and waits for your go-ahead.

## The 8-Round Interview

The interview is conversational — 3-5 questions at a time, with follow-ups that adapt based on your answers. Topics are skipped or expanded depending on your engagement type.

| Round | Topic | What It Covers |
|-------|-------|----------------|
| 1 | Engagement Context | Client name, your role, team size, entry point (greenfield/build/managed/rescue) |
| 2 | Org & Environment | Org type, environment promotion path, scratch org strategy, multi-org setup |
| 3 | Products & Scope | Salesforce clouds, AppExchange packages, integrations, data migration needs |
| 4 | Entry-Point Deep Dive | Adaptive questions based on entry point — discovery needs, sprint setup, SLAs, or audit priorities |
| 5 | Deliverables & Docs | Client deliverables, Linear project setup, living documents (BACKLOG, REQUIREMENTS, etc.) |
| 6 | Dev Standards & CI/CD | Branching strategy, GitHub Actions pipelines, code review policy, test coverage, the 13 Golden Rules |
| 7 | Security & Compliance | Data classification, HIPAA/SOX/GDPR, sharing model, Shield encryption, field-level security |
| 8 | Conventions & Preferences | Naming conventions, communication style, MCP server settings, engagement-specific rules |

## What Gets Generated

After approval, the skill creates a complete SFDX project structure:

```
acme-sales-cloud/
├── CLAUDE.md                          # Full engagement context + 13 Golden Rules
├── README.md                          # Project overview + getting started
├── GETTING_STARTED.md                 # Onboarding guide for new team members
├── sfdx-project.json                  # SFDX project definition
├── .forceignore                       # Source tracking exclusions
├── .gitignore                         # Git ignore rules
│
├── docs/                              # Living documentation
│   ├── BACKLOG.md                     # Prioritized work items
│   ├── REQUIREMENTS.md                # Business requirements
│   ├── TECHNICAL_SPEC.md              # Technical specifications
│   ├── DECISIONS.md                   # Architecture decision records
│   ├── CHANGELOG.md                   # Change history
│   ├── DATA_MODEL.md                  # Object model & relationships
│   └── CODE_ATLAS.md                  # Codebase navigation guide
│
├── deliverables/                      # Client-facing documents
│   ├── brd/                           # Business Requirements Document
│   ├── sdd/                           # Solution Design Document
│   ├── data-migration/                # Migration plans + field mappings
│   ├── test-plans/                    # Test plans & UAT scripts
│   ├── architecture/                  # Architecture diagrams
│   ├── presentations/                 # Client presentations
│   └── training/                      # Training materials
│
├── force-app/main/default/            # SFDX source
│   ├── classes/                       # Apex classes
│   ├── triggers/                      # Apex triggers
│   ├── lwc/                           # Lightning Web Components
│   ├── aura/                          # Aura components
│   ├── flows/                         # Flow definitions
│   ├── objects/                       # Custom objects & fields
│   ├── permissionsets/                # Permission sets
│   ├── profiles/                      # Profiles
│   ├── layouts/                       # Page layouts
│   ├── tabs/                          # Custom tabs
│   └── staticresources/              # Static resources
│
├── config/
│   └── project-scratch-def.json       # Scratch org definition
│
├── scripts/deploy/                    # Deployment helper scripts
│
└── .github/workflows/
    ├── sf-validate.yml                # PR validation pipeline
    └── sf-deploy.yml                  # Deployment pipeline
```

The exact deliverables and docs folders are tailored to your engagement type. A rescue engagement gets an Org Assessment and Rescue Assessment; a greenfield gets a BRD and Training Materials.

## Sample Scenario

Here's what it looks like to scaffold a project for a fictional **Acme Corp** Sales Cloud + Service Cloud greenfield engagement.

### Step 1: Install the skill

```bash
git clone https://github.com/mrihmrihm/sf-consulting-framework.git
cp -r sf-consulting-framework/skill/ ~/.claude/skills/sf-project-init/
```

### Step 2: Create a project directory and invoke the skill

```bash
mkdir acme-sales-service && cd acme-sales-service
git init
```

Then in Claude Code:

```
/sf-project-init
```

### Step 3: The interview begins

The skill starts with Round 1 — Engagement Context:

> **Claude:** Let's set up your Salesforce engagement. A few questions to get started:
>
> 1. What is the **client name** and **project name**?
> 2. What is your **role** on this engagement?
> 3. How large is the **consulting team**?
> 4. What is the **entry point** for this engagement?
>    - Discovery / Greenfield
>    - Build Phase
>    - Managed Services
>    - Rescue / Takeover

> **You:** Client is Acme Corp, project name "Acme CRM Transformation". I'm the lead architect. Team of 3 — me plus two developers. This is a greenfield engagement.

Round 2 — Org & Environment:

> **Claude:** Great, greenfield engagement. Let me ask about the environment setup:
>
> 1. Will you be starting with a **fresh org** or is there existing data/config?
> 2. What is the **environment promotion path** you'd like?
> 3. Will you use **scratch orgs** for development?

> **You:** Fresh org, no existing data. Standard path: Scratch -> Dev Sandbox -> QA -> UAT -> Prod. Yes to scratch orgs.

Round 3 — Products & Scope:

> **Claude:** Which Salesforce clouds are in scope?

> **You:** Sales Cloud and Service Cloud. We'll need integration with their NetSuite ERP for account/opportunity sync. Data migration from a legacy CRM — about 500K accounts, 2M contacts.

Round 4 — Entry-Point Deep Dive (adapted for greenfield):

> **Claude:** Since this is a greenfield engagement, let's map out the business context:
>
> 1. What are the **primary business processes** to be supported?
> 2. What are the current **pain points** with existing tools?
> 3. Who are the **key stakeholders** and their success criteria?
> 4. Any **compliance requirements**? (HIPAA, SOX, GDPR)
> 5. What is the **expected timeline**?

> **You:** Lead-to-cash and case management. Current CRM is outdated with no reporting. VP of Sales and VP of Customer Success are sponsors — they want pipeline visibility and faster case resolution. SOX compliance required. Timeline is 6 months to go-live.

Round 5 — Deliverables:

> **Claude:** Based on a greenfield engagement, I'd recommend these deliverables:
>
> | Deliverable | Status |
> |---|---|
> | Business Requirements Document | Required |
> | Solution Design Document | Required |
> | Data Migration Plan | Required (500K accounts, 2M contacts) |
> | Test Plan & UAT Scripts | Required |
> | Architecture Diagrams | Required |
> | Training Materials | Required |
>
> Should I auto-create a **Linear project** for this engagement? I'd set up milestones: Discovery -> Design -> Build -> Test -> Deploy -> Go-Live -> Hypercare.

> **You:** Yes to all deliverables and Linear. Add a DECISIONS.md and DATA_MODEL.md to the living docs.

Rounds 6-8 cover dev standards (GitFlow, 85% test coverage, the 13 Golden Rules), security (SOX compliance, sharing model), and naming conventions. The skill presents its recommendations and you confirm or customize.

### Step 4: Creation summary

After 8 rounds, the skill presents everything it will create:

> **Claude:** Here's what I'll generate for the **Acme Corp — Acme CRM Transformation** engagement:
>
> **Project Configuration** (6 files)
> - `CLAUDE.md` — 13-section engagement context with Golden Rules, SOX compliance notes
> - `sfdx-project.json`, `.forceignore`, `.gitignore`, `README.md`, `GETTING_STARTED.md`
>
> **Living Docs** (7 files) — BACKLOG, REQUIREMENTS, TECHNICAL_SPEC, DECISIONS, CHANGELOG, DATA_MODEL, CODE_ATLAS
>
> **Deliverables** (6 folders) — BRD, SDD, data migration + field mappings, test plans, architecture, training
>
> **SFDX Source** — Full `force-app/` structure with classes, triggers, LWC, flows, objects, etc.
>
> **CI/CD** — `sf-validate.yml` + `sf-deploy.yml` GitHub Actions workflows
>
> **Linear Project** — "Acme Corp — Acme CRM Transformation" with 7 milestones, initial issues, 2-week sprint cycles
>
> **MCP Servers** — salesforcecli/mcp, Linear, Context7, Playwright
>
> Ready to generate? (y/n)

> **You:** y

### Step 5: Scaffolding complete

The skill creates all files, sets up the Linear project with milestones and issues, and presents next steps:

> **Claude:** Everything is set up. Here's what was created:
>
> - 30+ files across SFDX, docs, deliverables, and CI/CD
> - Linear project with 7 milestones and 12 initial issues
> - CLAUDE.md configured with full engagement context
>
> **Recommended next steps for a greenfield engagement:**
> 1. Configure MCP servers (`salesforcecli/mcp` for Salesforce DX commands)
> 2. Begin Discovery — start requirements gathering with stakeholders
> 3. Review open backlog items in Linear
>
> What would you like to work on first?

From here, the CLAUDE.md persists all engagement context across sessions — every future conversation knows the client, products, compliance requirements, and dev standards.

## Installation

Install the `sf-project-init` skill into your Claude Code setup:

1. **Clone this repo:**
   ```bash
   git clone https://github.com/mrihmrihm/sf-consulting-framework.git
   ```

2. **Copy the skill to your Claude Code skills directory:**
   ```bash
   cp -r sf-consulting-framework/skill/ ~/.claude/skills/sf-project-init/
   ```

3. **Invoke the skill in Claude Code:**
   ```
   /sf-project-init
   ```

   The skill will walk you through a structured interview, then scaffold project documentation, naming conventions, CI/CD templates, and more — all tailored to the engagement.

## Diagrams

Interactive HTML diagrams that visualize the framework. Open any file in a browser, or start with `index.html` for the full set.

| Diagram | Description |
|---------|-------------|
| [Framework Overview](diagrams/sf-framework-overview.html) | High-level view of the consulting methodology |
| [Project Lifecycle](diagrams/sf-lifecycle.html) | Phases from discovery through hypercare |
| [Dev Loop](diagrams/sf-devloop.html) | Iterative development cycle within a sprint |
| [CI/CD Pipeline](diagrams/sf-cicd-pipeline.html) | Deployment pipeline across environments |
| [Integration Flow](diagrams/sf-integration-flow.html) | System integration architecture patterns |
| [Scenario Flows](diagrams/sf-scenario-flows.html) | Common engagement scenario walkthroughs |
| [Tech Stack](diagrams/sf-tech-stack.html) | Technology components and their relationships |
| [Tool Mapping](diagrams/sf-tool-mapping.html) | Tools mapped to framework phases |

## Framework Document

The complete methodology is documented in [salesforce-consulting-framework.docx](deliverables/salesforce-consulting-framework.docx) — a polished reference covering engagement types, delivery phases, governance, and best practices.

## Repo Structure

```
sf-consulting-framework/
├── skill/              # Claude Code skill (sf-project-init) — installable
│   ├── SKILL.md        # Skill definition + interview logic
│   └── references/     # Supporting docs (products, naming, CI/CD templates, etc.)
├── diagrams/           # 8 interactive HTML diagrams
├── deliverables/       # Polished framework document (docx)
└── .project/           # Internal project tracking
```
