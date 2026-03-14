/* ============================================================
   Sprint Workflow Data — Persona-Based Application Flows
   ============================================================ */

const SfSprintWorkflowData = (() => {

  const personas = [
    { id: 'pm',   name: 'PM / Business Analyst', color: '#A78BFA' },
    { id: 'dev',  name: 'Developer',             color: '#60A5FA' },
    { id: 'qa',   name: 'QA',                    color: '#34D399' },
    { id: 'arch', name: 'Architect',              color: '#FB923C' },
  ];

  const containers = [
    {
      id: 'linear', name: 'Linear', color: '#7C3AED',
      description: 'Project management, work items, sprint tracking',
      gridCol: 0, gridRow: 0,
    },
    {
      id: 'claude-code', name: 'Claude Code', color: '#0D9488',
      description: 'AI assistant for code generation, docs, architecture',
      gridCol: 1, gridRow: 0,
    },
    {
      id: 'vscode', name: 'VS Code', color: '#2563EB',
      description: 'IDE for Apex, LWC, and configuration development',
      gridCol: 2, gridRow: 0,
    },
    {
      id: 'salesforce', name: 'Salesforce Platform', color: '#D97706',
      description: 'Scratch Orgs, Sandboxes, Production — SFDX CLI',
      gridCol: 0, gridRow: 1,
    },
    {
      id: 'github', name: 'GitHub', color: '#475569',
      description: 'Source control, pull requests, CI/CD pipelines',
      gridCol: 1, gridRow: 1,
    },
    {
      id: 'docs', name: 'Documentation', color: '#059669',
      description: 'DOCX, PPTX, diagrams — project deliverables',
      gridCol: 2, gridRow: 1,
    },
  ];

  const flows = [
    {
      personaId: 'pm',
      steps: [
        { container: 'linear',      label: 'Create stories & manage sprint' },
        { container: 'claude-code', label: 'Generate BRDs & requirements' },
        { container: 'docs',        label: 'Write specs & acceptance criteria' },
        { container: 'salesforce',  label: 'Validate business rules in sandbox' },
        { container: 'linear',      label: 'Track progress & update status' },
      ]
    },
    {
      personaId: 'dev',
      steps: [
        { container: 'linear',      label: 'Pick up work item' },
        { container: 'vscode',      label: 'Write Apex / LWC / config' },
        { container: 'claude-code', label: 'AI-assisted code generation' },
        { container: 'salesforce',  label: 'Build in Scratch Org' },
        { container: 'github',      label: 'Branch, push, create PR' },
        { container: 'github',      label: 'CI validation' },
        { container: 'salesforce',  label: 'Deploy to Dev sandbox' },
        { container: 'linear',      label: 'Update status' },
      ]
    },
    {
      personaId: 'qa',
      steps: [
        { container: 'linear',      label: 'Pick up QA task' },
        { container: 'salesforce',  label: 'Test in QA sandbox' },
        { container: 'linear',      label: 'Log bugs' },
        { container: 'github',      label: 'Review test results' },
        { container: 'salesforce',  label: 'Regression test' },
        { container: 'linear',      label: 'Approve & close' },
      ]
    },
    {
      personaId: 'arch',
      steps: [
        { container: 'linear',      label: 'Review tech requirements' },
        { container: 'claude-code', label: 'Solution design & diagrams' },
        { container: 'docs',        label: 'Architecture docs' },
        { container: 'github',      label: 'Review PRs & approve' },
        { container: 'salesforce',  label: 'Review org governance' },
        { container: 'linear',      label: 'Sign off' },
      ]
    },
  ];

  return { personas, containers, flows };
})();
