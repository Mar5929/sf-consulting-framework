/* ============================================================
   SF Project Lifecycle — Node & Edge Data
   Salesforce project lifecycle horizontal flowchart
   ============================================================ */

const SFLifecycleData = (() => {

  const phases = [
    { id: 'phase-discovery', label: 'Discovery',         color: '#7C3AED' },
    { id: 'phase-design',    label: 'Design',            color: '#2563EB' },
    { id: 'phase-build',     label: 'Build',             color: '#0D9488' },
    { id: 'phase-test',      label: 'Test',              color: '#D97706' },
    { id: 'phase-deploy',    label: 'Deploy',            color: '#059669' },
    { id: 'phase-managed',   label: 'Managed Services',  color: '#E11D48' },
  ];

  const nodes = [
    // Discovery phase
    { id: 'kickoff',           name: 'Kickoff Meeting',        phase: 'phase-discovery', category: 'process',  description: 'Project kickoff with stakeholders, set scope and timeline.',       x: 0, shape: 'rect' },
    { id: 'interviews',        name: 'Stakeholder\nInterviews', phase: 'phase-discovery', category: 'process',  description: 'Conduct interviews with business users, admins, and executives.',  x: 1, shape: 'rect' },
    { id: 'current-state',     name: 'Current State\nAnalysis', phase: 'phase-discovery', category: 'process',  description: 'Audit existing org, data model, integrations, and tech debt.',     x: 2, shape: 'rect' },
    { id: 'req-validation',    name: 'Requirements\nValidation', phase: 'phase-discovery', category: 'process',  description: 'Validate and prioritize gathered requirements with stakeholders.', x: 3, shape: 'rect' },
    { id: 'entry-point',       name: 'Entry Point?',           phase: 'phase-discovery', category: 'decision', description: 'Which engagement entry point? Greenfield, Build, Rescue, or Managed.', x: 4, shape: 'diamond' },

    // Design phase
    { id: 'solution-arch',     name: 'Solution\nArchitecture',  phase: 'phase-design', category: 'process',  description: 'High-level solution architecture, technology choices, integration patterns.', x: 5, shape: 'rect' },
    { id: 'data-model',        name: 'Data Model\nDesign',      phase: 'phase-design', category: 'process',  description: 'Object model, field definitions, relationships, record types.',               x: 6, shape: 'rect' },
    { id: 'declarative-design',name: 'Declarative\nDesign',     phase: 'phase-design', category: 'process',  description: 'Layer 1→2→3: decision criteria, design templates, then XML after approval.', x: 7, shape: 'rect' },
    { id: 'integration-design',name: 'Integration\nDesign',     phase: 'phase-design', category: 'process',  description: 'API design, MuleSoft flows, event-driven architecture.',                     x: 8, shape: 'rect' },
    { id: 'design-review',     name: 'Design Review',           phase: 'phase-design', category: 'process',  description: 'Review solution design with technical leads and stakeholders.',               x: 9, shape: 'rect' },
    { id: 'approved',          name: 'Approved?',               phase: 'phase-design', category: 'decision', description: 'Is the design approved by stakeholders and technical review board?',          x: 10, shape: 'diamond' },

    // Build phase
    { id: 'sprint-plan',       name: 'Sprint Planning',         phase: 'phase-build', category: 'process',  description: 'Plan sprint backlog, assign stories, estimate effort.',                       x: 11, shape: 'rect' },
    { id: 'develop',           name: 'Develop\n(Apex/LWC/Config)', phase: 'phase-build', category: 'process',  description: 'Write Apex classes, LWC components, declarative configuration.',         x: 12, shape: 'rect' },
    { id: 'code-review',       name: 'Code Review',             phase: 'phase-build', category: 'process',  description: 'Peer review of Apex, LWC, and configuration changes.',                      x: 13, shape: 'rect' },
    { id: 'sprint-demo',       name: 'Sprint Demo',             phase: 'phase-build', category: 'process',  description: 'Demo completed work to stakeholders for feedback.',                          x: 14, shape: 'rect' },
    { id: 'sprint-complete',   name: 'Sprint\nComplete?',       phase: 'phase-build', category: 'decision', description: 'Is the sprint scope complete and accepted?',                                 x: 15, shape: 'diamond' },

    // Test phase
    { id: 'unit-tests',        name: 'Unit Tests',              phase: 'phase-test', category: 'process',  description: 'Apex unit tests with 75%+ code coverage requirement.',                       x: 16, shape: 'rect' },
    { id: 'integration-tests', name: 'Integration\nTests',      phase: 'phase-test', category: 'process',  description: 'End-to-end integration testing across systems.',                              x: 17, shape: 'rect' },
    { id: 'uat',               name: 'UAT',                     phase: 'phase-test', category: 'process',  description: 'User Acceptance Testing with business users in sandbox.',                     x: 18, shape: 'rect' },
    { id: 'defect-resolution', name: 'Defect\nResolution',      phase: 'phase-test', category: 'process',  description: 'Fix defects found during testing, re-validate.',                              x: 19, shape: 'rect' },
    { id: 'tests-pass',        name: 'All Tests\nPass?',        phase: 'phase-test', category: 'decision', description: 'Do all unit, integration, and UAT tests pass?',                               x: 20, shape: 'diamond' },

    // Deploy phase
    { id: 'pre-deploy',        name: 'Pre-Deploy\nChecklist',   phase: 'phase-deploy', category: 'process',  description: 'Run pre-deployment checklist: metadata, data, permissions.',               x: 21, shape: 'rect' },
    { id: 'deploy-staging',    name: 'Deploy to\nStaging',      phase: 'phase-deploy', category: 'process',  description: 'Deploy validated package to staging/UAT sandbox.',                          x: 22, shape: 'rect' },
    { id: 'smoke-test',        name: 'Smoke Test',              phase: 'phase-deploy', category: 'process',  description: 'Quick validation of critical paths in staging environment.',                x: 23, shape: 'rect' },
    { id: 'prod-deploy',       name: 'Production\nDeploy',      phase: 'phase-deploy', category: 'process',  description: 'Deploy to production with change management approval.',                     x: 24, shape: 'rect' },
    { id: 'go-live',           name: 'Go-Live',                 phase: 'phase-deploy', category: 'process',  description: 'Production go-live, user cutover, hypercare period begins.',                x: 25, shape: 'rect' },

    // Managed Services phase
    { id: 'receive-ticket',    name: 'Receive Ticket',          phase: 'phase-managed', category: 'process',  description: 'Inbound support ticket from client via Linear or email.',                 x: 26, shape: 'rect' },
    { id: 'triage',            name: 'Triage &\nAssign',        phase: 'phase-managed', category: 'process',  description: 'Assess priority, assign to team member, set SLA timer.',                  x: 27, shape: 'rect' },
    { id: 'fix-test',          name: 'Fix & Test',              phase: 'phase-managed', category: 'process',  description: 'Implement fix, test in sandbox, validate resolution.',                    x: 28, shape: 'rect' },
    { id: 'deploy-fix',        name: 'Deploy Fix',              phase: 'phase-managed', category: 'process',  description: 'Deploy fix to production through CI/CD pipeline.',                       x: 29, shape: 'rect' },
    { id: 'close-ticket',      name: 'Close Ticket',            phase: 'phase-managed', category: 'process',  description: 'Confirm resolution with client, close ticket, update SLA metrics.',      x: 30, shape: 'rect' },
  ];

  const edges = [
    // Discovery flow
    { source: 'kickoff',         target: 'interviews' },
    { source: 'interviews',      target: 'current-state' },
    { source: 'current-state',   target: 'req-validation' },
    { source: 'req-validation',  target: 'entry-point' },
    { source: 'entry-point',     target: 'solution-arch',  label: 'Proceed' },

    // Design flow
    { source: 'solution-arch',      target: 'data-model' },
    { source: 'data-model',          target: 'declarative-design' },
    { source: 'declarative-design', target: 'integration-design' },
    { source: 'integration-design', target: 'design-review' },
    { source: 'design-review',      target: 'approved' },
    { source: 'approved',           target: 'sprint-plan',    label: 'Yes' },
    { source: 'approved',           target: 'solution-arch',  label: 'No' },

    // Build flow
    { source: 'sprint-plan',     target: 'develop' },
    { source: 'develop',         target: 'code-review' },
    { source: 'code-review',     target: 'sprint-demo' },
    { source: 'sprint-demo',     target: 'sprint-complete' },
    { source: 'sprint-complete', target: 'unit-tests',     label: 'Yes' },
    { source: 'sprint-complete', target: 'sprint-plan',    label: 'No' },

    // Test flow
    { source: 'unit-tests',        target: 'integration-tests' },
    { source: 'integration-tests', target: 'uat' },
    { source: 'uat',               target: 'defect-resolution' },
    { source: 'defect-resolution', target: 'tests-pass' },
    { source: 'tests-pass',        target: 'pre-deploy',        label: 'Yes' },
    { source: 'tests-pass',        target: 'defect-resolution', label: 'No' },

    // Deploy flow
    { source: 'pre-deploy',     target: 'deploy-staging' },
    { source: 'deploy-staging', target: 'smoke-test' },
    { source: 'smoke-test',     target: 'prod-deploy' },
    { source: 'prod-deploy',    target: 'go-live' },
    { source: 'go-live',        target: 'receive-ticket' },

    // Managed Services loop
    { source: 'receive-ticket', target: 'triage' },
    { source: 'triage',         target: 'fix-test' },
    { source: 'fix-test',       target: 'deploy-fix' },
    { source: 'deploy-fix',     target: 'close-ticket' },
    { source: 'close-ticket',   target: 'receive-ticket', label: 'Next ticket' },
  ];

  // Tools active at each step
  const toolMap = {
    'kickoff':             ['sf-project-init', 'Linear MCP'],
    'interviews':          ['sf-project-init', 'Notion MCP'],
    'current-state':       ['SF DX MCP', 'SFDX CLI', 'Context7'],
    'req-validation':      ['docx skill (BRD)', 'Linear MCP'],
    'solution-arch':       ['Context7 MCP', 'drawio skill', 'Well-Architected guidance', 'sf-architect-solutioning'],
    'data-model':          ['SF DX MCP', 'drawio skill', 'Context7'],
    'declarative-design':  ['sf-architect-solutioning', 'Metadata Reference Templates', 'Context7'],
    'integration-design':  ['drawio skill', 'Context7 MCP'],
    'design-review':       ['docx skill (SDD)', 'pptx skill'],
    'sprint-plan':         ['Linear MCP', 'sf-project-init'],
    'develop':             ['SFDX CLI', 'SF DX MCP', 'Context7', 'VS Code', 'COMPONENT_MANIFEST.yaml', 'Metadata Reference Templates'],
    'code-review':         ['Code Review Plugin', 'Superpowers'],
    'sprint-demo':         ['Playwright MCP', 'pptx skill'],
    'unit-tests':          ['SFDX CLI', 'Apex test runner'],
    'integration-tests':   ['Playwright MCP', 'SF DX MCP'],
    'uat':                 ['Playwright MCP', 'docx skill (UAT scripts)'],
    'defect-resolution':   ['Linear MCP', 'Superpowers: Debugging'],
    'pre-deploy':          ['SFDX CLI', 'GitHub Actions'],
    'deploy-staging':      ['SFDX CLI', 'GitHub Actions', 'SF DX MCP'],
    'smoke-test':          ['Playwright MCP'],
    'prod-deploy':         ['GitHub Actions', 'SFDX CLI'],
    'go-live':             ['docx skill (Release Notes)', 'pptx skill (Training)'],
    'receive-ticket':      ['Linear MCP', 'Gmail MCP'],
    'triage':              ['Linear MCP'],
    'fix-test':            ['SFDX CLI', 'SF DX MCP', 'Playwright MCP'],
    'deploy-fix':          ['GitHub Actions', 'SFDX CLI'],
    'close-ticket':        ['Linear MCP'],
  };

  return { phases, nodes, edges, toolMap };
})();
