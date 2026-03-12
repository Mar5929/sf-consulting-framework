/* ============================================================
   SF CI/CD Pipeline — Environment & Gate Data
   ============================================================ */

const SfCicdPipelineData = (() => {

  const environments = [
    { id: 'scratch', name: 'Scratch Org', color: '#7C3AED', description: 'Developer workspace — isolated, disposable', deploymentMethod: 'sf source push', approver: 'Developer', testRequirements: 'Apex unit tests pass locally', rollbackStrategy: 'Delete and recreate scratch org' },
    { id: 'feature', name: 'Feature Branch', color: '#2563EB', description: 'Git branch with changes — triggers CI on PR', deploymentMethod: 'git push + PR', approver: 'Peer review', testRequirements: 'PR review + CI check pass', rollbackStrategy: 'Revert commit' },
    { id: 'ci', name: 'CI Validation', color: '#0D9488', description: 'GitHub Actions — validates against target org', deploymentMethod: 'sf project deploy validate', approver: 'Automated', testRequirements: 'All Apex tests pass, 85%+ coverage', rollbackStrategy: 'Block merge' },
    { id: 'dev', name: 'Dev Sandbox', color: '#D97706', description: 'Shared development environment', deploymentMethod: 'sf project deploy', approver: 'Tech Lead', testRequirements: 'Integration tests pass', rollbackStrategy: 'sf project deploy rollback' },
    { id: 'qa', name: 'QA Sandbox', color: '#EA580C', description: 'QA testing environment', deploymentMethod: 'sf project deploy', approver: 'QA Lead', testRequirements: 'Full regression suite', rollbackStrategy: 'sf project deploy rollback' },
    { id: 'uat', name: 'UAT', color: '#E11D48', description: 'User acceptance testing — client validates', deploymentMethod: 'sf project deploy', approver: 'Client / Product Owner', testRequirements: 'UAT scripts pass, client sign-off', rollbackStrategy: 'sf project deploy rollback' },
    { id: 'prod', name: 'Production', color: '#059669', description: 'Live production org', deploymentMethod: 'sf project deploy (quick deploy after validation)', approver: 'Release Manager', testRequirements: 'All previous gates passed, deployment plan approved', rollbackStrategy: 'sf project deploy rollback or hotfix branch' },
  ];

  const gates = [
    { source: 'scratch', target: 'feature', label: 'Commit & Push' },
    { source: 'feature', target: 'ci', label: 'Pull Request' },
    { source: 'ci', target: 'dev', label: 'Merge to develop' },
    { source: 'dev', target: 'qa', label: 'Promote' },
    { source: 'qa', target: 'uat', label: 'QA Sign-off' },
    { source: 'uat', target: 'prod', label: 'Client Approval' },
  ];

  return { environments, gates };
})();
