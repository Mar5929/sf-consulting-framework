/* ============================================================
   SF Dev Loop — Node & Edge Data
   Salesforce iterative development cycle with screenshot sub-loop
   ============================================================ */

const SFDevLoopData = (() => {

  const steps = [
    { id: 'work-item',    name: 'Work Item',          category: 'process',  description: 'Pick work item from Linear backlog or receive new assignment.',              order: 0 },
    { id: 'pull',         name: 'Pull Latest',         category: 'process',  description: 'git pull and sf source pull — sync local with org and remote.',               order: 1 },
    { id: 'build',        name: 'Build',               category: 'process',  description: 'Develop Apex classes, LWC components, declarative configuration.',            order: 2 },
    { id: 'local-test',   name: 'Local Test',          category: 'process',  description: 'Run Apex tests in scratch org, validate code coverage.',                      order: 3 },
    { id: 'screenshot',   name: 'Screenshot',          category: 'process',  description: 'Capture UI with Playwright MCP for visual verification.',                     order: 4, subloop: true },
    { id: 'review',       name: 'Visual Review',       category: 'decision', description: 'Read the PNG — inspect LWC components, styling, layout, responsiveness.',     order: 5, subloop: true },
    { id: 'iterate',      name: 'Fix & Iterate',       category: 'process',  description: 'Fix issues found in screenshot review. Repeat until passing.',               order: 6, subloop: true },
    { id: 'push',         name: 'Push',                category: 'process',  description: 'git push, create PR via gh CLI for code review.',                             order: 7 },
    { id: 'ci-validate',  name: 'CI Validate',         category: 'process',  description: 'GitHub Actions runs sf project deploy validate against target org.',          order: 8 },
    { id: 'deploy',       name: 'Deploy',              category: 'process',  description: 'sf project deploy to sandbox or production via CI/CD.',                       order: 9 },
    { id: 'verify',       name: 'Verify',              category: 'process',  description: 'Post-deploy smoke test — manual or Playwright verification.',                order: 10 },
  ];

  const edges = [
    { source: 'work-item',   target: 'pull' },
    { source: 'pull',        target: 'build' },
    { source: 'build',       target: 'local-test' },
    { source: 'local-test',  target: 'screenshot' },
    { source: 'screenshot',  target: 'review' },
    { source: 'review',      target: 'iterate',     label: 'Issues found' },
    { source: 'iterate',     target: 'screenshot',  label: 'Re-check' },
    { source: 'review',      target: 'push',        label: 'Looks good' },
    { source: 'push',        target: 'ci-validate' },
    { source: 'ci-validate', target: 'deploy',      label: 'Pass' },
    { source: 'ci-validate', target: 'build',       label: 'Fail' },
    { source: 'deploy',      target: 'verify' },
    { source: 'verify',      target: 'work-item',   label: 'Next item' },
  ];

  // Tools used at each step
  const toolMap = {
    'work-item':   ['Linear MCP'],
    'pull':        ['git', 'SFDX CLI'],
    'build':       ['SFDX CLI', 'SF DX MCP', 'Context7', 'VS Code'],
    'local-test':  ['Apex test runner', 'Scratch org'],
    'screenshot':  ['Playwright MCP', 'screenshot.mjs'],
    'review':      ['Read PNG (multimodal)'],
    'iterate':     ['Code edits'],
    'push':        ['git', 'GitHub'],
    'ci-validate': ['GitHub Actions', 'sf project deploy validate'],
    'deploy':      ['SFDX CLI', 'SF DX MCP'],
    'verify':      ['Playwright MCP', 'Manual testing'],
  };

  return { steps, edges, toolMap };
})();
