/* ============================================================
   SF Framework Overview — Node & Edge Data
   Salesforce consulting methodology swim-lane flow
   ============================================================ */

const SFFrameworkOverviewData = (() => {

  const phases = [
    { id: 'methodology', label: 'Methodology', color: '#7C3AED' },
    { id: 'tools', label: 'Tools & Skills', color: '#0D9488' },
    { id: 'deliverables', label: 'Deliverables', color: '#D97706' },
  ];

  const nodes = [
    // Methodology lane - 6 phase boxes
    { id: 'discovery', name: 'Discovery', phase: 'methodology', category: 'process', description: 'Requirements gathering, stakeholder interviews, current state analysis', x: 0 },
    { id: 'design', name: 'Design', phase: 'methodology', category: 'process', description: 'Solution architecture, data model, integration design', x: 1 },
    { id: 'build', name: 'Build', phase: 'methodology', category: 'process', description: 'Development sprints, configuration, customization', x: 2 },
    { id: 'test', name: 'Test', phase: 'methodology', category: 'process', description: 'Unit testing, integration testing, UAT', x: 3 },
    { id: 'deploy', name: 'Deploy', phase: 'methodology', category: 'process', description: 'Environment promotion, go-live, cutover', x: 4 },
    { id: 'managed', name: 'Managed\nServices', phase: 'methodology', category: 'process', description: 'Ongoing support, enhancements, monitoring', x: 5 },

    // Tools lane
    { id: 'tool-init', name: 'sf-project-init', phase: 'tools', category: 'global-skill', description: 'Structured interview, scaffolding, Linear setup', x: 0 },
    { id: 'tool-design', name: 'Context7 +\nWell-Architected', phase: 'tools', category: 'mcp', description: 'Live docs + curated architectural guidance', x: 1 },
    { id: 'tool-build', name: 'SFDX CLI +\nSF DX MCP', phase: 'tools', category: 'mcp', description: 'Source push/pull, scratch orgs, deployments', x: 2 },
    { id: 'tool-test', name: 'Playwright +\nApex Tests', phase: 'tools', category: 'plugin', description: 'UI testing, unit testing, code coverage', x: 3 },
    { id: 'tool-deploy', name: 'GitHub Actions\nCI/CD', phase: 'tools', category: 'external', description: 'Automated validation, deployment pipelines', x: 4 },
    { id: 'tool-support', name: 'Linear +\nTicket Process', phase: 'tools', category: 'mcp', description: 'Issue tracking, SLA monitoring', x: 5 },

    // Deliverables lane
    { id: 'del-brd', name: 'BRD', phase: 'deliverables', category: 'template', description: 'Business Requirements Document', x: 0 },
    { id: 'del-sdd', name: 'SDD +\nArch Diagrams', phase: 'deliverables', category: 'template', description: 'Solution Design Document + Architecture Diagrams', x: 1 },
    { id: 'del-code', name: 'CLAUDE.md +\nDocs + Code', phase: 'deliverables', category: 'template', description: 'Project config, living docs, source code', x: 2 },
    { id: 'del-test', name: 'Test Plans +\nUAT Scripts', phase: 'deliverables', category: 'template', description: 'Test plans, UAT scripts, coverage reports', x: 3 },
    { id: 'del-release', name: 'Release Notes +\nTraining', phase: 'deliverables', category: 'template', description: 'Deployment docs, training materials', x: 4 },
    { id: 'del-support', name: 'Org Assessment\n+ SLA Docs', phase: 'deliverables', category: 'template', description: 'Health checks, support documentation', x: 5 },
  ];

  // Entry points (rendered as labeled arrows pointing into the methodology lane)
  const entryPoints = [
    { id: 'ep-greenfield', name: 'Greenfield', targetPhase: 0, color: '#A78BFA', description: 'Full path from Discovery through Managed Services' },
    { id: 'ep-build', name: 'Build Phase', targetPhase: 2, color: '#60A5FA', description: 'Skip Discovery, start at Build with existing requirements' },
    { id: 'ep-managed', name: 'Managed Services', targetPhase: 5, color: '#34D399', description: 'Direct to ongoing support and enhancements' },
    { id: 'ep-rescue', name: 'Rescue / Takeover', targetPhase: 0, color: '#F87171', description: 'Audit-first approach, Assessment → Remediation → Build' },
  ];

  const edges = [
    // Methodology flow
    { source: 'discovery', target: 'design' },
    { source: 'design', target: 'build' },
    { source: 'build', target: 'test' },
    { source: 'test', target: 'deploy' },
    { source: 'deploy', target: 'managed' },
    // Vertical connections (methodology to tools)
    { source: 'discovery', target: 'tool-init' },
    { source: 'design', target: 'tool-design' },
    { source: 'build', target: 'tool-build' },
    { source: 'test', target: 'tool-test' },
    { source: 'deploy', target: 'tool-deploy' },
    { source: 'managed', target: 'tool-support' },
    // Vertical connections (tools to deliverables)
    { source: 'tool-init', target: 'del-brd' },
    { source: 'tool-design', target: 'del-sdd' },
    { source: 'tool-build', target: 'del-code' },
    { source: 'tool-test', target: 'del-test' },
    { source: 'tool-deploy', target: 'del-release' },
    { source: 'tool-support', target: 'del-support' },
  ];

  return { phases, nodes, edges, entryPoints };
})();
