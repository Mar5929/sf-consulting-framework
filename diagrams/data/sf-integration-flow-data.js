/* ============================================================
   SF Integration & Data Flow — Hub & Radial Data
   ============================================================ */

const SfIntegrationFlowData = (() => {

  const nodes = [
    // Center hub
    { id: 'salesforce', name: 'Salesforce Platform', category: 'hub', description: 'Core CRM — Sales, Service, Experience, Marketing' },

    // Integration targets (radial)
    { id: 'erp', name: 'ERP System', category: 'external', description: 'SAP, Oracle, NetSuite — financial data, orders, inventory' },
    { id: 'mulesoft', name: 'MuleSoft', category: 'mcp', description: 'Enterprise integration layer — API-led connectivity' },
    { id: 'data-cloud', name: 'Data Cloud', category: 'mcp', description: 'Customer data platform — unified profiles, segmentation' },
    { id: 'marketing', name: 'Marketing Cloud', category: 'external', description: 'Email, journeys, audience segmentation, MC Connect' },
    { id: 'legacy', name: 'Legacy Systems', category: 'external', description: 'Mainframe, custom databases, file-based integrations' },
    { id: 'data-lake', name: 'Data Warehouse / Lake', category: 'external', description: 'Snowflake, BigQuery, Redshift — analytics, reporting' },
    { id: 'ext-api', name: 'External APIs', category: 'external', description: 'Third-party REST/SOAP services — payment, shipping, etc.' },
    { id: 'mobile', name: 'Mobile Apps', category: 'external', description: 'Custom mobile apps consuming Salesforce APIs' },
  ];

  const edges = [
    { source: 'salesforce', target: 'erp', label: 'REST / Bulk API', bidirectional: true },
    { source: 'salesforce', target: 'mulesoft', label: 'API-Led', bidirectional: true },
    { source: 'salesforce', target: 'data-cloud', label: 'Data Streams / CDC', bidirectional: true },
    { source: 'salesforce', target: 'marketing', label: 'MC Connect', bidirectional: true },
    { source: 'salesforce', target: 'legacy', label: 'MuleSoft / Files', bidirectional: false },
    { source: 'salesforce', target: 'data-lake', label: 'Bulk API / CDC', bidirectional: false },
    { source: 'salesforce', target: 'ext-api', label: 'REST Callouts', bidirectional: true },
    { source: 'salesforce', target: 'mobile', label: 'REST API / LWC', bidirectional: false },
    { source: 'mulesoft', target: 'erp', label: 'System API', bidirectional: true },
    { source: 'mulesoft', target: 'legacy', label: 'System API', bidirectional: true },
    { source: 'mulesoft', target: 'ext-api', label: 'Process API', bidirectional: true },
  ];

  const patterns = [
    { name: 'Platform Events', description: 'Pub/sub messaging — async, near-real-time, event-driven', useCase: 'Internal notifications, cross-cloud communication' },
    { name: 'Change Data Capture (CDC)', description: 'Stream record changes to subscribers', useCase: 'Data sync to external systems, audit trails' },
    { name: 'REST API', description: 'Synchronous request/response', useCase: 'External system \u2192 Salesforce CRUD, real-time queries' },
    { name: 'Bulk API', description: 'Async batch processing for large datasets', useCase: 'Data migration, nightly syncs, large imports' },
    { name: 'Streaming API', description: 'Push notifications via CometD', useCase: 'Real-time dashboards, monitoring' },
    { name: 'MuleSoft', description: 'Enterprise integration platform', useCase: 'Complex multi-system orchestration, API management' },
  ];

  const categories = [
    { key: 'hub', label: 'Salesforce Platform' },
    { key: 'mcp', label: 'Integration Layer' },
    { key: 'external', label: 'External System' },
  ];

  return { nodes, edges, patterns, categories };
})();
