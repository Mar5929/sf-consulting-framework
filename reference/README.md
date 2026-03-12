# Reference Materials

Visual and document references for the Salesforce Consulting Framework.

## Interactive Diagrams

Open `index.html` for the full set, or jump to individual diagrams:

| Diagram | File | Description |
|---------|------|-------------|
| Framework Overview | `sf-framework-overview.html` | Three-lane swim-lane flow across 6 engagement phases |
| Project Lifecycle | `sf-lifecycle.html` | Phases from discovery through hypercare |
| Dev Loop | `sf-devloop.html` | Iterative development cycle within a sprint |
| CI/CD Pipeline | `sf-cicd-pipeline.html` | Deployment pipeline across environments |
| Integration Flow | `sf-integration-flow.html` | System integration architecture patterns |
| Scenario Flows | `sf-scenario-flows.html` | Entry-point scenario walkthroughs |
| Tech Stack | `sf-tech-stack.html` | Technology components and relationships |
| Tool Mapping | `sf-tool-mapping.html` | Tools mapped to framework phases |

## Framework Documents

| File | Description |
|------|-------------|
| `salesforce-consulting-framework.docx` | Detailed methodology guide — engagement types, delivery phases, governance, best practices |
| `salesforce-consulting-framework.pptx` | Executive presentation deck |

## Technical Notes

- `data/` contains D3.js data files (one per diagram) that define nodes, edges, and layout
- `shared.css` and `shared.js` are the shared rendering engine used by all diagrams
- All diagram HTML files use relative paths — they work from any location as long as the folder structure is preserved
