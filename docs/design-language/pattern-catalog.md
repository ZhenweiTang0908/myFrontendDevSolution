# Golden Example catalog

Every pattern is runnable at `/patterns/<id>` with mock data. All examples support populated, loading, empty, error, partial, disabled, and restricted demonstration states through the global Control. Pattern-specific interactions remain visible in populated and partial states.

| Pattern | Use when | Avoid when | Narrow-screen behavior |
|---|---|---|---|
| Home launcher | Users choose among several independent tools | One product has one dominant workflow | Tools become one column; global identity remains fixed |
| Dashboard | A user needs priorities and trends at entry | The page would only repeat navigation counts | Metrics stack; attention order stays ahead of charts |
| Authentication | Entry requires identity and recovery | The product can use an existing trusted identity screen | Brand story collapses above the focused form |
| Onboarding | Initial choices materially improve defaults | Setup can be inferred or delayed until needed | Steps become a compact horizontal summary |
| Search list | Query and filters produce scannable entity results | Users primarily edit a fixed dataset | Secondary scores collapse before identity/actions |
| Data table | Users compare columns, select rows, or bulk-operate | Records have little comparable structure | Preserve meaning with horizontal scrolling |
| Entity detail | One durable object owns activity and next actions | The object is transient or has no identity | Summary facts form two columns; sections stack |
| Master detail | Users scan a queue while inspecting one item | Items are opened rarely or require full-page work | Master pane compresses to recognizable identities |
| Comparison | A decision depends on aligned criteria | Alternatives use unrelated criteria | Keep column alignment and scroll horizontally |
| Form | Users create or edit one coherent object | The task has several consequential stages | Section introductions stack above fields |
| Settings | Values are durable configuration | The values belong to one ordinary form submission | Navigation becomes a compact horizontal rail |
| Workflow | A staged task needs progress, review, and recovery | Stages have no meaningful dependency | Step labels compress; current stage remains explicit |
| Import mapping | External structured data must be mapped and validated | A simple file upload completes the task | Mapping table scrolls; commit actions stay reachable |
| Task progress | Work continues asynchronously | Completion is immediate | Progress summary leads; per-step bars may simplify |
| Inbox queue | Incoming items require priority triage | Items have no urgency or assignment model | Priority, identity, and subject remain; metadata hides |
| Review approval | A decision requires evidence and audit context | A normal edit/save is sufficient | Evidence and decision panel stack |
| Reports analytics | Trends need explanation and drill-down | A single metric answers the question | Insight and metrics lead; charts stack |
| Calendar timeline | Time is the primary organizing dimension | Status or ownership matters more than time | Preserve time grid with horizontal scrolling |
| Kanban | Small work items move through a stable flow | Large datasets or many statuses require tables | Columns scroll horizontally; cards keep fixed width |
| Content editor | Substantial content needs outline, authoring, and assistance | Input is short or highly structured | Outline and assistant collapse; canvas owns width |
| Conversation | A durable message thread needs context | Communication is a one-off form submission | Thread takes the full page; lists/context hide |
| AI workspace | Users prompt, inspect sources, and reuse AI output | AI is a hidden implementation detail | Prompt and result stack; sources remain visible |
| File library | Users upload, preview, and organize assets | Files are only attachments to another object | Grid becomes two columns; upload remains explicit |
| Help docs | Users browse and search product guidance | One contextual hint solves the problem | Categories and guides become a reading flow |
| Billing plan | Users must understand usage, price, and consequences | Billing is managed entirely by an external portal | Plan, usage, and payment stack in that order |
| Marketing landing | A product needs a focused narrative and conversion path | Users already entered the operational product | Visual mockup yields to message and proof |
| System state | A whole region cannot show normal content | A local field or row owns the problem | Recovery action stays close and full-width if useful |
| Full-screen workspace | Canvas/editor/map owns viewport and internal scroll | A conventional document page is sufficient | Peripheral palettes collapse before the canvas |

## Canonical implementation locations

- Entry and orientation: `src/patterns/examples/EntryExamples.tsx`
- Find and manage data: `src/patterns/examples/DataExamples.tsx`
- Create and configure: `src/patterns/examples/ConfigureExamples.tsx`
- Operate and monitor: `src/patterns/examples/OperateExamples.tsx`
- Create and communicate: `src/patterns/examples/CommunicateExamples.tsx`
- Support and commercial: `src/patterns/examples/SupportExamples.tsx`
- Special states and spaces: `src/patterns/examples/SpecialExamples.tsx`
- Admin profile adapters: `src/profiles/admin/AdminExamples.tsx`

The listed file is the single canonical behavioral example for the pattern. Applicable profiles render that contract through profile tokens or a local adapter; they do not create competing behavioral examples.

## Content rationale and known constraints

| Pattern | Content rationale | Known constraints |
|---|---|---|
| Home launcher | Tool name and one-line outcome make choice faster than feature lists | More than roughly eight tools needs grouping or search |
| Dashboard | Only metrics that alter today’s priorities lead the page | It is not a dumping ground for every available chart |
| Authentication | Recovery and legal context stay visible without competing with sign-in | Identity-provider requirements may replace the local form |
| Onboarding | Each question must materially improve the starting state | Optional questions need a skip path and later edit route |
| Search list | Entity identity, fit, and next action carry scanning decisions | Complex cross-row comparison belongs in a table |
| Data table | Columns exist only when users compare, sort, or act on them | Narrow screens scroll; hiding essential columns is prohibited |
| Entity detail | Durable identity and current status orient all secondary sections | Very deep workflows should branch into their own pattern |
| Master detail | The selected item remains visible while users scan adjacent work | On very narrow screens the panes may require staged navigation |
| Comparison | Shared criteria appear once and align alternatives | Unaligned alternatives cannot be made comparable by styling |
| Form | Section copy explains consequence, not obvious field names | Long consequential sequences should use Workflow |
| Settings | Stable navigation and local save feedback reduce uncertainty | Danger actions stay isolated and require scope confirmation |
| Workflow | Current stage and review facts prevent accidental progression | Steps must reflect real dependencies, not decorative progress |
| Import mapping | File identity, mappings, sample values, and validation precede commit | Large previews require virtualization in production |
| Task progress | Outcome, progress, and safe leave/retry behavior reduce polling anxiety | Unknown external outcomes must not be presented as simple failure |
| Inbox queue | Priority, identity, subject, and ownership support triage | High-volume queues need server-backed paging in real products |
| Review approval | Evidence, decision, comment, and audit context stay together | Permission and separation-of-duty rules may restrict actions |
| Reports analytics | Insight leads, metrics support it, and charts expose drill-down paths | Decorative charts without decisions are rejected |
| Calendar timeline | Time position communicates sequence better than repeated timestamps | Dense schedules preserve a scrollable time grid |
| Kanban | Column state and work-in-progress limits make flow visible | Large datasets or many statuses require table/report patterns |
| Content editor | The artifact owns attention; outline and assistance remain secondary | Production editors need durable drafts and conflict handling |
| Conversation | Thread continuity and composer state matter more than account metadata | Very long threads require pagination and anchored context |
| AI workspace | Prompt, source set, progress, result, and review warning establish trust | Generated output remains untrusted until reviewed |
| File library | Previewable identity, type, recency, and organization support retrieval | Upload limits and unsafe files require explicit validation |
| Help docs | Search and task-oriented guides reduce visible explanatory clutter elsewhere | Guidance must track product versions and permissions |
| Billing plan | Current plan, usage, renewal, and consequences support an informed change | Payment mutations usually require a secure external boundary |
| Marketing landing | One promise, proof, and conversion path preserve narrative focus | It must not inherit dense product navigation or admin controls |
| System state | Cause, impact, and one recovery path make absence actionable | Local errors should stay local instead of replacing the whole page |
| Full-screen workspace | Tools, canvas, selection, and inspector preserve spatial context | Internal scrolling, persistence, and keyboard shortcuts need product-specific work |
