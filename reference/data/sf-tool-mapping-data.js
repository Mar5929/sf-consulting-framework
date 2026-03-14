/* ============================================================
   SF Tool x Phase Mapping — Matrix Grid Data
   ============================================================ */

const SfToolMappingData = (() => {

  const phases = ['Discovery', 'Design', 'Build', 'Test', 'Deploy', 'Managed Services'];

  const tools = [
    { id: 'sf-init', name: 'sf-project-init', category: 'global-skill' },
    { id: 'sfdx-mcp', name: 'SF DX MCP', category: 'mcp' },
    { id: 'context7', name: 'Context7', category: 'mcp' },
    { id: 'linear', name: 'Linear MCP', category: 'mcp' },
    { id: 'playwright', name: 'Playwright', category: 'plugin' },
    { id: 'gh-actions', name: 'GitHub Actions', category: 'external' },
    { id: 'docx', name: 'docx skill', category: 'project-skill' },
    { id: 'pptx', name: 'pptx skill', category: 'project-skill' },
    { id: 'drawio', name: 'Draw.io', category: 'mcp' },
    { id: 'superpowers', name: 'Superpowers', category: 'plugin' },
    { id: 'sfdx-cli', name: 'SFDX CLI', category: 'external' },
    { id: 'code-review', name: 'Code Review', category: 'plugin' },
    { id: 'sf-arch', name: 'sf-architect-solutioning', category: 'global-skill' },
    { id: 'manifest', name: 'Component Manifest', category: 'project-skill' },
  ];

  const matrix = {
    'sf-init':      { 'Discovery': 'Run structured interview, generate scaffolding', 'Design': null, 'Build': null, 'Test': null, 'Deploy': null, 'Managed Services': 'Re-run for new engagement intake' },
    'sfdx-mcp':     { 'Discovery': null, 'Design': 'Explore org metadata', 'Build': 'Deploy, retrieve, run tests', 'Test': 'Run Apex tests', 'Deploy': 'Deploy to target org', 'Managed Services': 'Quick deploys' },
    'context7':     { 'Discovery': null, 'Design': 'Look up API docs', 'Build': 'Live Apex/LWC/SFDX docs', 'Test': 'Test framework docs', 'Deploy': null, 'Managed Services': 'Reference docs' },
    'linear':       { 'Discovery': 'Create project & milestones', 'Design': 'Track design tasks', 'Build': 'Sprint management', 'Test': 'Bug tracking', 'Deploy': 'Release tracking', 'Managed Services': 'Ticket management' },
    'playwright':   { 'Discovery': null, 'Design': null, 'Build': 'UI screenshot verification', 'Test': 'E2E testing', 'Deploy': 'Smoke tests', 'Managed Services': 'Regression testing' },
    'gh-actions':   { 'Discovery': null, 'Design': null, 'Build': 'CI validation on PR', 'Test': 'Automated test runs', 'Deploy': 'Automated deployment', 'Managed Services': 'Automated deployment' },
    'docx':         { 'Discovery': 'Generate BRD', 'Design': 'Generate SDD', 'Build': null, 'Test': 'Generate test plans', 'Deploy': 'Release notes', 'Managed Services': 'Org assessments' },
    'pptx':         { 'Discovery': 'Kickoff deck', 'Design': 'Design review', 'Build': 'Sprint demos', 'Test': null, 'Deploy': 'Go-live readiness', 'Managed Services': 'Status reports' },
    'drawio':       { 'Discovery': null, 'Design': 'Architecture diagrams', 'Build': null, 'Test': null, 'Deploy': null, 'Managed Services': null },
    'superpowers':  { 'Discovery': 'Brainstorming', 'Design': 'Planning', 'Build': 'TDD, debugging, plans', 'Test': 'Systematic debugging', 'Deploy': 'Verification', 'Managed Services': 'Debugging' },
    'sfdx-cli':     { 'Discovery': null, 'Design': 'Org describe', 'Build': 'Source push/pull', 'Test': 'Run tests', 'Deploy': 'Deploy commands', 'Managed Services': 'Deploy commands' },
    'code-review':  { 'Discovery': null, 'Design': null, 'Build': 'PR code review', 'Test': null, 'Deploy': 'Final review', 'Managed Services': 'Change review' },
    'sf-arch':      { 'Discovery': null, 'Design': 'Declarative design, solution planning', 'Build': 'Pre-implementation gate, metadata XML generation', 'Test': null, 'Deploy': null, 'Managed Services': 'Change impact analysis' },
    'manifest':     { 'Discovery': null, 'Design': 'Domain scoping', 'Build': 'Lazy-load retrieval, dependency tracking', 'Test': null, 'Deploy': null, 'Managed Services': 'Impact analysis' },
  };

  const categories = [
    { key: 'global-skill', label: 'Global Skill' },
    { key: 'mcp', label: 'MCP Server' },
    { key: 'plugin', label: 'Plugin' },
    { key: 'project-skill', label: 'Project Skill' },
    { key: 'external', label: 'External' },
  ];

  return { phases, tools, matrix, categories };
})();
