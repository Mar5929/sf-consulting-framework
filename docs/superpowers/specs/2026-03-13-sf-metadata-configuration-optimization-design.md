# Design Spec: Salesforce Metadata Configuration Optimization

**Date:** 2026-03-13
**Status:** APPROVED
**Scope:** Optimize `sf-architect-solutioning` skill for Salesforce metadata configuration; add client convention capture to `sf-project-init`

---

## 1. Problem Statement

The `sf-architect-solutioning` skill is strong on process governance (requirement intake, documentation gates, solution planning) and Apex code patterns (trigger handler, service layer, selectors), but contains zero guidance on how to generate Salesforce metadata XML. When Claude needs to create a Flow, custom object, permission set, or validation rule, it works from general training knowledge rather than precise, structured templates. This leads to inconsistent metadata, incorrect XML structures, and missed best practices for declarative configuration.

## 2. Goals

1. Claude generates correct, deployable SFDX source metadata XML for all major declarative types
2. Claude designs declarative components in a human-readable format and gets approval before generating XML
3. Well-Architected defaults are always applied, with client-specific conventions layered on top
4. Metadata reference material is modular — Claude loads only what's needed per solution
5. API version is always verified via Context7 before generation

## 3. Non-Goals

- Reports & Dashboards metadata (excluded per user decision)
- Replacing the Salesforce Setup UI for metadata creation — this is for SFDX source-tracked development
- Auto-deploying generated metadata — generation only, deployment is a separate step

## 4. Approach

**Option A: Metadata Reference Library** (selected)

Add a `references/metadata/` directory to the solutioning skill with one file per metadata type. Each file contains three layers: design guidance, declarative design templates, and SFDX source XML templates. A new Section 2.5 in the skill workflow handles the design-then-generate process. The sf-project-init skill captures client-specific conventions during Round 8.

### Alternatives Considered

- **Option B: Inline Skill Expansion** — Rejected. Would bloat SKILL.md to 1,500+ lines, force Claude to load all metadata guidance even for simple Apex tasks, and make individual metadata types harder to maintain.
- **Option C: Context7-First with Minimal References** — Rejected. Context7 may not return complete XML templates, adds latency via MCP round-trips, and is non-deterministic. Better as a verification layer than a primary source.

## 5. Architecture

### 5.1 File Structure Changes

#### sf-architect-solutioning/

```
skills/sf-architect-solutioning/
├── SKILL.md                              # Updated — new Section 2.5 + metadata workflow
├── references/
│   ├── architectural-patterns.md         # Existing (unchanged)
│   ├── solutioning-checklist.md          # Existing (updated — add declarative design check)
│   ├── solution-plan-template.md         # Existing (updated — add declarative design section)
│   └── metadata/                         # NEW — metadata configuration reference library
│       ├── flows.md                      # Record-Triggered, Screen, Scheduled, Autolaunched, Subflows
│       ├── objects-fields.md             # Custom Objects, Fields, Relationships, Indexes
│       ├── validation-rules.md           # Cross-field validation, error conditions
│       ├── permission-sets.md            # Permission Sets, Permission Set Groups, Profiles
│       ├── page-layouts-record-types.md  # Layouts, Record Types, assignments
│       ├── custom-metadata-types.md      # Custom Metadata Types, Custom Settings, Custom Labels
│       ├── approval-processes.md         # Multi-step approvals, entry criteria, actions
│       └── platform-events-other.md      # Platform Events, Named Credentials
```

#### sf-project-init/

- `SKILL.md` — Round 8 updated with client metadata convention questions

### 5.2 Metadata Reference File Template

Every file in `references/metadata/` follows this 3-layer structure:

```markdown
# {Metadata Type} Configuration Reference

## Layer 1: When to Use
- Decision criteria (when this type vs alternatives)
- Anti-patterns (common misuses)
- Governor limit considerations
- Well-Architected alignment

## Layer 2: Declarative Design Template
- Human-readable spec format Claude presents for user approval
- Structured as a table/checklist the user can review
- Covers: purpose, elements, logic, security, error handling

## Layer 3: SFDX Source XML Templates
- Annotated XML with {PLACEHOLDER} tokens
- One template per subtype (e.g., Record-Triggered vs Screen Flow)
- Comments explaining each XML element
- Context7 verification step before generation
```

### 5.3 Content Depth Per File

| File | Subtypes Covered | Estimated Lines |
|---|---|---|
| `flows.md` | Record-Triggered (Before/After), Screen, Scheduled, Autolaunched, Subflow | ~400 |
| `objects-fields.md` | Object definition, 10+ field types, relationships, indexes | ~300 |
| `validation-rules.md` | Formula-based validation, cross-field, cross-object | ~150 |
| `permission-sets.md` | Permission Sets, Permission Set Groups, Profile references | ~200 |
| `page-layouts-record-types.md` | Layouts, Record Types, layout assignments | ~200 |
| `custom-metadata-types.md` | Custom Metadata Types, Custom Settings, Custom Labels | ~250 |
| `approval-processes.md` | Single/multi-step approvals, entry criteria, actions | ~200 |
| `platform-events-other.md` | Platform Events, Named Credentials | ~150 |

## 6. SKILL.md Changes

### 6.1 New Section 2.5: Declarative Design

Inserted between Section 2 (Pre-Implementation Gate) and Section 3 (Solution Planning).

**Workflow:**

1. **Verify API version** — Use Context7 MCP (`resolve-library-id` → `query-docs`) to confirm the latest GA Salesforce API version. Use this version for all generated metadata.
2. **Load relevant metadata references** — Read only the `references/metadata/{type}.md` files needed for the current solution. Do not load all files.
3. **Check for client conventions** — Read the project's CLAUDE.md for a `## Client Metadata Conventions` section. If present, these conventions override Well-Architected defaults where they conflict.
4. **Design each declarative component** — For every declarative component identified in the requirement, present a human-readable design spec using the Layer 2 (Declarative Design Template) from the relevant reference file. This includes:
   - Component purpose and trigger conditions
   - Element-by-element walkthrough (for Flows: entry criteria, variables, gets, decisions, assignments, DML, fault paths)
   - Field definitions with types, defaults, validation (for Objects/Fields)
   - Security implications (FLS, CRUD, sharing)
5. **Get user approval** — Wait for explicit approval of the declarative design before proceeding to XML generation.
6. **Generate metadata XML** — After approval, generate the SFDX source XML using the Layer 3 templates from the reference file. Verify the API version matches `sfdx-project.json` or the latest GA version confirmed in step 1.

### 6.2 Updates to Section 3 (Solution Planning)

The components table in the solution plan gains a new column:

| # | Type | Name | Purpose | Pattern | New/Modify | Declarative Design Status |
|---|---|---|---|---|---|---|
| 1 | Flow | Account_AfterSave_AssignTerritory | Auto-assign territory | Record-Triggered | New | Designed |
| 2 | Apex Class | AccountService | Business logic | Service Layer | New | N/A |

Declarative components must show "Designed" before implementation begins.

### 6.3 Updates to Section 4 (Implementation)

Add step: "For each declarative component with status 'Designed', generate SFDX source XML from the approved design using `references/metadata/{type}.md` Layer 3 templates. Verify API version matches `sfdx-project.json` or latest GA."

### 6.4 Updates to solutioning-checklist.md

Add under Architectural Assessment:

```markdown
- [ ] **Declarative components designed and approved** — All Flows, validation rules,
  permission sets, and other metadata have been designed using the declarative design
  template and approved before XML generation
```

### 6.5 Updates to solution-plan-template.md

Add new Section 3.5 "Declarative Component Designs" between Section 3 (Components) and Section 4 (Data Model Changes):

```markdown
### 3.5 Declarative Component Designs

For each declarative component listed in Section 3, provide the design spec below.
Use the Layer 2 template from `references/metadata/{type}.md`.

#### {Component Name}

| Attribute | Value |
|---|---|
| Type | [Flow type / Validation Rule / Permission Set / etc.] |
| Object | [Target object] |
| [Type-specific attributes] | [Values] |

**Element Walkthrough:** (for Flows and Approval Processes)
1. [Element 1]
2. [Element 2]
...

**Security Notes:**
- [CRUD/FLS / sharing / run mode considerations]
```

## 7. Declarative Design Template Exemplar: Flows

When Claude designs a Flow, it presents this format for approval:

```markdown
### Flow Design: Account_AfterSave_AssignTerritory

| Attribute | Value |
|---|---|
| Type | Record-Triggered Flow |
| Object | Account |
| Trigger | After Save — Create and Update |
| Entry Conditions | Industry != null AND BillingState != null |
| Run Mode | System Context — Without Sharing |
| API Version | v63.0 (verified via Context7) |

**Element Walkthrough:**

1. GET → Territory_Assignment__mdt (Custom Metadata) — filter by Industry + State
2. DECISION → "Territory Found?"
   - Yes → proceed to Assignment
   - No → proceed to Fault Path
3. ASSIGNMENT → Set Account.Territory__c = matched territory value
4. UPDATE → Account record
5. FAULT → Create Error_Log__c record with flow name, error message, record ID

**Variables:**
- varAccountRecord (Record) — trigger record
- varTerritoryMatch (Record) — CMT query result
- varErrorMessage (Text) — fault capture

**Security Notes:**
- Runs in system context because territory assignment requires cross-object access
- FLS on Territory__c enforced via Permission Set, not flow context
```

## 8. sf-project-init Changes

### 8.1 Round 8 Addition

Add after the existing "Client design standards" question:

**New question: Client Metadata Conventions**

> "Does the client have any specific conventions for declarative metadata that differ from Salesforce Well-Architected defaults? For example:"
> - **Flow conventions** — Required fault handling patterns, naming beyond `{Object}_{Trigger}_{Purpose}`, required flow description templates, mandatory subflow patterns
> - **Object/Field conventions** — Specific field prefixes by application area, required fields on all custom objects (e.g., `External_Id__c`), custom relationship naming
> - **Permission model** — Permission Set structure (by feature vs. by role), required Permission Set Groups, profile lockdown approach
> - **Approval conventions** — Standard approval routing (role hierarchy vs. queue vs. specific users), required notification templates
> - **Error handling** — Standard error logging object, required fault path patterns, notification channels for errors

### 8.2 CLAUDE.md Output

If the user provides client conventions, they are written into the project's CLAUDE.md:

```markdown
## Client Metadata Conventions

These conventions layer on top of Salesforce Well-Architected defaults. When a client
convention conflicts with a default, the client convention wins.

### Flows
- [Client-specific flow conventions captured from interview]

### Objects & Fields
- [Client-specific naming/structure conventions]

### Permission Model
- [Client-specific permission approach]

### Error Handling
- [Client-specific error patterns]
```

If the user has no client-specific conventions, this section is omitted and Well-Architected defaults apply exclusively.

## 9. End-to-End Workflow

```
sf-project-init (Round 8)
    └── Captures client metadata conventions
    └── Writes to project CLAUDE.md → "## Client Metadata Conventions"

sf-architect-solutioning (triggered by a requirement)
    └── Section 1: Requirement Intake (existing)
    └── Section 2: Pre-Implementation Gate (existing + new checklist item)
    └── Section 2.5: Declarative Design (NEW)
        ├── Verify API version via Context7
        ├── Load references/metadata/{type}.md for relevant types only
        ├── Read project CLAUDE.md for client convention overrides
        ├── Design each declarative component (Layer 2 template)
        ├── Present design for user approval
        └── After approval → generate SFDX XML (Layer 3 template)
    └── Section 3: Solution Planning (existing + "Declarative Design Status" column)
    └── Section 4: Implementation (existing + XML generation step)
```

### Key Principles

1. **Well-Architected defaults always apply** — encoded in metadata reference files
2. **Client conventions override defaults** — captured in project CLAUDE.md, checked at design time
3. **Design before generate** — no XML without an approved declarative design
4. **Context7 verifies currency** — API version and element types confirmed before generation
5. **Modular loading** — only relevant metadata reference files read per solution
6. **Naming conventions respected** — existing `naming-conventions.md` applies to all generated metadata, with client overrides from CLAUDE.md

## 10. Implementation Sequence

1. Create `references/metadata/` directory and all 8 metadata reference files
2. Update `SKILL.md` — add Section 2.5, update Sections 3 and 4
3. Update `solutioning-checklist.md` — add declarative design checkbox
4. Update `solution-plan-template.md` — add Section 3.5
5. Update `sf-project-init/SKILL.md` — add Round 8 client convention questions
6. Update `sf-project-init/SKILL.md` — add CLAUDE.md output template for conventions

## 11. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Salesforce XML schema changes between releases | Medium | Medium | Context7 verification step catches schema drift; update reference files quarterly |
| Context7 returns outdated API version | Low | Low | Reference files include known-good XML as fallback; user can override version |
| Client conventions conflict with each other | Low | Medium | CLAUDE.md section is structured by category; conflicts surfaced during design approval step |
| Reference files grow stale over time | Medium | Medium | Each file has an API version annotation; Context7 comparison flags drift |
