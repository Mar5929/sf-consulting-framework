/* ============================================================
   SF Tech Stack Architecture — Node & Edge Data
   Force-directed hub-and-spoke for Salesforce consulting stack
   ============================================================ */

const SFTechStackData = (() => {

  const nodes = [
    // ── Hub ──
    { id: 'claude-code', name: 'Claude Code', category: 'hub', description: 'Primary orchestrator — routes actions to all Salesforce tools, MCP servers, plugins, and services.' },

    // ── MCP Servers ──
    { id: 'mcp-linear', name: 'Linear MCP', category: 'mcp', description: 'Issue tracking and project management for Salesforce projects.' },
    { id: 'mcp-context7', name: 'Context7 MCP', category: 'mcp', description: 'Up-to-date Salesforce platform and library documentation lookup.' },
    { id: 'mcp-playwright', name: 'Playwright MCP', category: 'mcp', description: 'Browser automation for Salesforce UI testing and screenshot verification.' },
    { id: 'mcp-sfdx', name: 'SF DX MCP', category: 'mcp', description: 'Official Salesforce DX MCP server — metadata operations, org management, deployments.' },
    { id: 'mcp-sf-community', name: 'tsmztech SF MCP', category: 'mcp', description: 'Community Salesforce MCP server — additional SF tooling and automation.' },

    // ── Skills ──
    { id: 'skill-sf-init', name: 'sf-project-init', category: 'skill', description: 'Structured interview, SFDX project scaffolding, Linear workspace setup for SF projects.' },
    { id: 'skill-docx', name: 'docx', category: 'skill', description: 'Create and edit BRD, SDD, and other .docx deliverables.' },
    { id: 'skill-pptx', name: 'pptx', category: 'skill', description: 'Generate executive presentations, design review decks, training materials.' },
    { id: 'skill-drawio', name: 'drawio', category: 'skill', description: 'Architecture diagrams, ERDs, integration flow diagrams.' },
    { id: 'skill-frontend', name: 'Frontend Design', category: 'skill', description: 'LWC component design and UI prototyping.' },
    { id: 'skill-sf-arch', name: 'sf-architect-\nsolutioning', category: 'skill', description: 'Solution planning, declarative design, metadata XML generation.' },
    { id: 'component-manifest', name: 'Component\nManifest', category: 'skill', description: 'YAML manifest + domain files for lazy-load context retrieval.' },
    { id: 'metadata-refs', name: 'Metadata\nReferences', category: 'skill', description: '8 declarative metadata templates: Flows, objects, permissions, layouts.' },

    // ── Plugins ──
    { id: 'plug-superpowers', name: 'Superpowers', category: 'plugin', description: 'Enhanced workflow — brainstorming, TDD, debugging, planning, git worktrees, verification.' },
    { id: 'plug-doc-skills', name: 'Document Skills', category: 'plugin', description: '~17 sub-skills for document generation: docx, xlsx, pptx, pdf, canvas-design.' },
    { id: 'plug-code-review', name: 'Code Review', category: 'plugin', description: 'Apex, LWC, and configuration code review plugin.' },

    // ── SF Platform ──
    { id: 'sf-cli', name: 'SFDX CLI', category: 'sf-platform', description: 'Salesforce CLI — source push/pull, org management, metadata retrieval.' },
    { id: 'sf-scratch-org', name: 'Scratch Orgs', category: 'sf-platform', description: 'Ephemeral development environments for source-driven development.' },
    { id: 'sf-sandbox', name: 'Sandboxes', category: 'sf-platform', description: 'Partial/Full sandboxes for integration testing and UAT.' },
    { id: 'sf-prod-org', name: 'Production Org', category: 'sf-platform', description: 'Live Salesforce production environment.' },
    { id: 'gh-actions', name: 'GitHub Actions', category: 'sf-platform', description: 'CI/CD pipelines — sf validate, deploy, run tests on PR.' },
    { id: 'vscode', name: 'VS Code', category: 'sf-platform', description: 'Primary IDE with Salesforce Extension Pack.' },

    // ── External ──
    { id: 'client-org', name: 'Client Org', category: 'external', description: 'Client Salesforce org — target for deployments and configuration.' },
    { id: 'appexchange', name: 'AppExchange', category: 'external', description: 'Salesforce marketplace for managed and unmanaged packages.' },
    { id: 'mulesoft', name: 'MuleSoft', category: 'external', description: 'Integration platform for API-led connectivity with external systems.' },
    { id: 'ext-systems', name: 'External Systems', category: 'external', description: 'ERPs, data warehouses, third-party APIs integrated with Salesforce.' },
    { id: 'data-sources', name: 'Data Sources', category: 'external', description: 'Legacy databases, CSVs, and migration sources for data loading.' },
  ];

  const edges = [
    // Hub → MCP
    { source: 'claude-code', target: 'mcp-linear' },
    { source: 'claude-code', target: 'mcp-context7' },
    { source: 'claude-code', target: 'mcp-playwright' },
    { source: 'claude-code', target: 'mcp-sfdx' },
    { source: 'claude-code', target: 'mcp-sf-community' },

    // Hub → Skills
    { source: 'claude-code', target: 'skill-sf-init' },
    { source: 'claude-code', target: 'skill-docx' },
    { source: 'claude-code', target: 'skill-pptx' },
    { source: 'claude-code', target: 'skill-drawio' },
    { source: 'claude-code', target: 'skill-frontend' },
    { source: 'claude-code', target: 'skill-sf-arch' },
    { source: 'claude-code', target: 'component-manifest' },
    { source: 'skill-sf-arch', target: 'metadata-refs' },
    { source: 'skill-sf-arch', target: 'component-manifest' },
    { source: 'skill-sf-arch', target: 'mcp-context7' },

    // Hub → Plugins
    { source: 'claude-code', target: 'plug-superpowers' },
    { source: 'claude-code', target: 'plug-doc-skills' },
    { source: 'claude-code', target: 'plug-code-review' },

    // Hub → SF Platform
    { source: 'claude-code', target: 'sf-cli' },
    { source: 'claude-code', target: 'vscode' },
    { source: 'claude-code', target: 'gh-actions' },

    // Cross-connections
    { source: 'sf-cli', target: 'mcp-sfdx' },
    { source: 'sf-cli', target: 'sf-scratch-org' },
    { source: 'sf-cli', target: 'sf-sandbox' },
    { source: 'sf-cli', target: 'sf-prod-org' },
    { source: 'mcp-sfdx', target: 'sf-scratch-org' },
    { source: 'mcp-sfdx', target: 'sf-sandbox' },
    { source: 'mcp-sf-community', target: 'sf-cli' },
    { source: 'gh-actions', target: 'sf-sandbox' },
    { source: 'gh-actions', target: 'sf-prod-org' },
    { source: 'sf-prod-org', target: 'client-org' },
    { source: 'client-org', target: 'appexchange' },
    { source: 'client-org', target: 'mulesoft' },
    { source: 'mulesoft', target: 'ext-systems' },
    { source: 'client-org', target: 'data-sources' },
    { source: 'skill-sf-init', target: 'mcp-linear' },
    { source: 'skill-docx', target: 'plug-doc-skills' },
    { source: 'skill-pptx', target: 'plug-doc-skills' },
    { source: 'plug-code-review', target: 'gh-actions' },
    { source: 'mcp-context7', target: 'sf-cli' },
  ];

  const categories = [
    { key: 'hub', label: 'Claude Code', layer: 2 },
    { key: 'mcp', label: 'MCP Servers', layer: 1 },
    { key: 'skill', label: 'Skills', layer: 3 },
    { key: 'plugin', label: 'Plugins', layer: 3 },
    { key: 'sf-platform', label: 'SF Platform', layer: 4 },
    { key: 'external', label: 'External', layer: 0 },
  ];

  return { nodes, edges, categories };
})();
