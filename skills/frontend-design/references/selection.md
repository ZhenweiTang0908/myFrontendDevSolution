# Selection rules

## Choose application scale

- `small-toolbox`: several independent tools sharing one shell; individual tools may use approved accent themes.
- `medium-product`: related workflows around one product or object model.
- `large-platform`: one domain served by several modules with stable global navigation and identity.

## Choose UI profile

- `product-custom`: default for lightweight tools, user-facing products, content, AI, help, and special workspaces.
- `data-workbench`: search, filtering, data inspection, reporting, queues, and sustained operational work.
- `admin-ant`: dense internal administration, complex forms, permissions, configuration, and enterprise CRUD.

## Default presets

- Lightweight tool: small-toolbox / product-custom / violet / comfortable / expressive / launcher.
- Coherent product: medium-product / product-custom / blue / comfortable / calm / sidebar.
- Data product: medium-product / data-workbench / graphite / compact / calm / sidebar.
- Internal operations: large-platform / admin-ant / blue / dense / calm / topbar.
- Help experience: product-custom / green / comfortable / expressive.

## Choose Page Pattern

Use the full catalog in the source repository at `docs/design-language/page-pattern-selection.md`. Common mappings:

- Query and filters → SearchListPage.
- Bulk records → DataTablePage.
- One object → DetailPage.
- Queue plus persistent inspection → MasterDetailPage.
- Multi-step task → WorkflowPage.
- External structured data → ImportMappingPage.
- Long-running work → TaskProgressPage.
- AI prompt, sources, progress, and result → AIWorkspacePage.
- Viewport-owning editor/canvas → FullScreenWorkspacePage.

Do not select by visual resemblance alone. Select by the user's task and state transitions.
