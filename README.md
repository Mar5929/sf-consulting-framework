# Salesforce Consulting Framework

A structured methodology and Claude Code skill for scaffolding Salesforce consulting engagement projects. This framework provides a repeatable process for discovery, solution design, and delivery — powered by an interactive AI skill that interviews stakeholders and generates tailored project documentation.

## Repo Structure

```
sf-consulting-framework/
├── skill/              # Claude Code skill (sf-project-init) — installable
├── diagrams/           # 8 interactive HTML diagrams
├── deliverables/       # Polished framework document (docx)
└── .project/           # Internal project tracking
```

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
