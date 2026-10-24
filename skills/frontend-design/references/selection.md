# Selection rules

Bundled summary of the source repository's `configuration.md`, `page-pattern-selection.md`, and `patternRegistry.ts`. When the source repository is available, it wins over this file.

## Configuration dimensions

| Dimension | Options | Decides |
|---|---|---|
| scale | `small-toolbox`, `medium-product`, `large-platform` | Shell and navigation complexity, not brand |
| profile | `product-custom`, `data-workbench`, `admin-ant` | Component anatomy and page conventions |
| theme | `violet`, `blue`, `graphite`, `green` | Semantic color and limited expressive treatment |
| density | `comfortable`, `compact`, `dense` | Spacing, control and row height (never below accessible touch targets) |
| motion | `calm`, `expressive` | Timing, easing, expressive allowance |
| navigation | `launcher`, `sidebar`, `topbar` | Global orientation pattern |

Scale:

- `small-toolbox`: several independent tools in one shell. Tools may use different approved themes but share shell geometry, type roles, controls, focus, and state semantics.
- `medium-product`: related workflows around one product or object model.
- `large-platform`: one domain, several modules, one global configuration. Modules may vary only documented density or accent.

Profile:

- `product-custom`: default for lightweight tools, user-facing products, content, AI, help, and special workspaces.
- `data-workbench`: search, filtering, data inspection, reporting, queues, and sustained operational work.
- `admin-ant`: dense internal administration, complex forms, permissions, configuration, and enterprise CRUD.

## Named presets

| Preset ID | Use | scale / profile / theme / density / motion / navigation |
|---|---|---|
| `vivid-toolbox` | Lightweight tool | small-toolbox / product-custom / violet / comfortable / expressive / launcher |
| `focused-product` | Coherent product | medium-product / product-custom / blue / comfortable / calm / sidebar |
| `graphite-workbench` | Data product | medium-product / data-workbench / graphite / compact / calm / sidebar |
| `enterprise-operations` | Internal operations | large-platform / admin-ant / blue / dense / calm / topbar |
| `guided-help` | Help experience | small-toolbox / product-custom / green / comfortable / expressive / launcher |

`scripts/recommend-config.mjs` returns these preset IDs. Presets are starting points; change a dimension only because product context requires it, and say why.

## Page Patterns

Select by the user's task and state transitions. The profiles column lists where the pattern is registered.

| Pattern ID | User task | Profiles |
|---|---|---|
| `home-launcher` | Start one of several independent tools | product-custom, data-workbench, admin-ant |
| `dashboard` | Understand current operational priorities | product-custom, data-workbench, admin-ant |
| `auth` | Enter a secured product or recover access | product-custom, admin-ant |
| `onboarding` | Make consequential first-run choices | product-custom |
| `search-list` | Find entities using query and filters | product-custom, data-workbench, admin-ant |
| `data-table` | Operate on many records and bulk selections | data-workbench, admin-ant |
| `detail` | Understand and act on one durable object | product-custom, data-workbench, admin-ant |
| `master-detail` | Scan a queue while inspecting one item | data-workbench, admin-ant |
| `comparison` | Decide between aligned alternatives | product-custom, data-workbench, admin-ant |
| `form` | Create or edit one object | product-custom, data-workbench, admin-ant |
| `settings` | Change durable product configuration | product-custom, data-workbench, admin-ant |
| `workflow` | Complete a guided multi-stage task | product-custom, data-workbench, admin-ant |
| `import-mapping` | Bring external structured data into the product | product-custom, data-workbench, admin-ant |
| `task-progress` | Monitor long-running asynchronous work | product-custom, data-workbench, admin-ant |
| `inbox-queue` | Triage incoming work by priority | data-workbench, admin-ant |
| `review-approval` | Make an auditable decision using evidence | data-workbench, admin-ant |
| `reports-analytics` | Understand trends and drill into causes | product-custom, data-workbench, admin-ant |
| `calendar-timeline` | Plan or inspect time-based work | product-custom, data-workbench, admin-ant |
| `kanban` | Move work through a small status flow | product-custom, data-workbench, admin-ant |
| `content-editor` | Author and revise substantial content | product-custom |
| `conversation` | Communicate in a durable thread | product-custom, data-workbench |
| `ai-workspace` | Direct, inspect, and reuse AI work | product-custom, data-workbench |
| `file-library` | Organize and preview files | product-custom, data-workbench, admin-ant |
| `help-docs` | Read product guidance and recover context | product-custom |
| `billing-plan` | Understand usage, price, and plan changes | product-custom, admin-ant |
| `marketing-landing` | Introduce a product through a narrative | product-custom |
| `state` | Recover from empty, error, forbidden, offline, or not-found | product-custom, data-workbench, admin-ant |
| `full-screen-workspace` | Work in a viewport-owning canvas, map, or split editor | product-custom, data-workbench |

Common confusions:

- `search-list` vs `data-table`: scanning entity results vs comparing columns and bulk-operating rows.
- `form` vs `workflow`: one coherent object vs stages with real dependencies and a review step.
- `form` vs `settings`: one submission vs durable configuration with local save and danger boundaries.
- `detail` vs `master-detail`: a full page per object vs keeping the queue visible while inspecting.
- `kanban` vs `data-table`: a few statuses and small items vs large datasets or many statuses.
- `state` replaces a whole region only; a field or row owns its own local error.

## Behavioral contracts by family

Profile and theme may change anatomy, density, color, and motion. They may not reorder these obligations.

| Family | Hierarchy | Actions | Failure behavior |
|---|---|---|---|
| Entry & orientation | Identity → next decision → recent context | One obvious start or resume action | Keep a route to sign-in, retry, or skip optional setup |
| Find & manage data | Query/selection → results → inspection | Search and filter first; bulk actions appear only after selection | Keep filters and safe selection when retrieval fails |
| Create & configure | Purpose → grouped inputs → consequence | Save or continue near the form; destructive work isolated | Validate beside the field and preserve entered data |
| Operate & monitor | Current health → attention → evidence | Resolve, retry, or inspect beside the affected task | Distinguish failed, delayed, partial, and unknown outcomes |
| Create & communicate | Working artifact or thread → context → tools | Primary creation action stays near the canvas or composer | Preserve recoverable drafts; show source and progress failures locally |
| Support & commercial | User question or value → explanation → next step | Search, contact, or change plan with the consequence shown | Keep escape paths to support; explain unavailable actions |
| Special states & spaces | State or workspace first, chrome second | Recovery or tool action stays reachable | Never replace actionable recovery with decorative emptiness |
