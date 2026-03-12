/* ============================================================
   SF Scenario Flows — Multi-path Phase Data
   ============================================================ */

const SfScenarioFlowsData = (() => {

  const phases = ['Discovery', 'Design', 'Build', 'Test', 'Deploy', 'Managed Services'];

  const scenarios = [
    {
      id: 'greenfield', name: 'Greenfield', color: '#A78BFA',
      path: [0, 1, 2, 3, 4, 5],
      description: 'Full engagement — Discovery through Go-Live and Hypercare',
      steps: ['Full Interview', 'Solution Design', 'Sprint Development', 'Full Testing', 'Go-Live', 'Hypercare']
    },
    {
      id: 'build', name: 'Build Phase', color: '#60A5FA',
      path: [1, 2, 3, 4, 5],
      description: 'Requirements exist — start at Design with existing BRD',
      steps: ['Review Design', 'Sprint Development', 'Full Testing', 'Go-Live', 'Hypercare']
    },
    {
      id: 'managed', name: 'Managed Services', color: '#34D399',
      path: [5],
      description: 'Ongoing support — ticket-based, continuous loop',
      steps: ['Ticket \u2192 Fix \u2192 Deploy \u2192 Repeat']
    },
    {
      id: 'rescue', name: 'Rescue / Takeover', color: '#F87171',
      path: [0, 1, 2, 3, 4],
      description: 'Audit existing org \u2192 Remediation plan \u2192 Resume normal path',
      steps: ['Audit & Assess', 'Remediation Plan', 'Critical Fixes', 'Regression Test', 'Stabilize Deploy']
    },
  ];

  return { phases, scenarios };
})();
