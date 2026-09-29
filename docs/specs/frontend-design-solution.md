# Feature: Personal Frontend Design Solution

## Status

Approved by the user on 2026-09-29. Implementation may proceed without additional milestone approvals while preserving this specification.

## Goal and Scope

Build one reusable personal frontend production system that lets a developer describe a new product or page, invoke a Skill, and receive a mature, consistent implementation without repeatedly deciding layout, typography, color, component behavior, interaction feedback, or page composition.

The repository must contain the design foundations, UI profiles, theme configurations, reusable page patterns, one runnable Golden Example for every page pattern, pure-frontend mock data, a control/showcase application, deterministic verification, and the Skills that consume and evolve the system.

The target user is an individual developer using AI to build:

- small applications containing several independent tools;
- medium-sized products with multiple related workflows;
- large systems serving one coherent domain;
- data workbenches and dense administrative systems;
- special-purpose pages such as editors, conversations, imports, reports, help centers, and full-screen workspaces.

The system succeeds when a future project can select a validated configuration and page pattern, implement the business-specific behavior, and preserve a coherent visual and interaction language without ad hoc design decisions.

## Behavior / Requirements

### Product principles

- **R1 — Concise by default, not by dogma:** A piece of information should normally have one primary presentation in a page region. Repetition is allowed when the second presentation has an independent purpose such as orientation across distant regions, confirmation before a consequential action, persistent context while scrolling, accessibility, or recovery from an error. Decorative or accidental repetition is prohibited.
- **R2 — Rich feedback:** Every interactive element must define relevant default, hover, pressed, focus-visible, loading, disabled, success, and error behavior. Feedback should appear near the affected object and should not rely only on transient toast messages.
- **R3 — Restrained but not visually flat:** Interfaces must remain readable and task-focused while using controlled color, layered surfaces, purposeful motion, typography contrast, icon treatment, data visualization, and state transitions to avoid a static or inexpensive appearance.
- **R4 — Usability precedes expression:** Color, movement, depth, and decoration may increase visual interest only when they preserve legibility, discoverability, keyboard use, responsive behavior, and task completion.

### Configuration model

- **R5 — Orthogonal configuration:** The system must model application scale, UI profile, visual theme, density, motion, and navigation shell as separate configuration dimensions. Changing color must not silently change page information architecture, and changing density must not invent a new brand language.
- **R6 — Application scale presets:** The initial scale presets must be `small-toolbox`, `medium-product`, and `large-platform`.
  - `small-toolbox` presents multiple independent tools in one shared shell. Individual tools may use different approved accents while retaining shared typography, spacing, component behavior, navigation, and surface treatment.
  - `medium-product` groups related capabilities into domain navigation and uses one primary profile and theme with limited local accents.
  - `large-platform` uses one coherent product identity, stable global navigation, domain-level subnavigation, controlled density, and consistent cross-module behavior. Local modules may not independently redefine foundations.
- **R7 — UI profiles:** The initial profiles must be:
  - `product-custom`: the default for user-facing tools and product experiences, implemented with project-owned open-code components and mature accessible primitives;
  - `data-workbench`: an AI Find-inspired data product language for search, filters, tables, inspection, reporting, and sustained operational work;
  - `admin-ant`: an Ant Design-based profile for highly dense internal administration, complex forms, and rapid enterprise CRUD delivery.
- **R8 — Visual themes:** The initial themes must include `violet`, `blue`, `graphite`, and `green`. Themes change semantic token values rather than feature CSS. Green must be suitable for Help and guidance experiences without becoming a success-status color everywhere. A page may use supporting colors and tonal variation; themes are not monochrome filters.
- **R9 — Density and motion:** Density must support at least `comfortable`, `compact`, and `dense`. Motion must support `calm`, `expressive`, and operating-system reduced-motion behavior. Only validated combinations may be exposed as recommended presets.
- **R10 — Runtime Control:** The showcase home page must provide a Control interface that switches application scale, profile, theme, density, motion, navigation shell, and Page Pattern. The selected configuration must remain visible, be reflected in the URL so examples are linkable, and apply without a backend. Invalid combinations must fall back to a documented valid preset rather than render a broken page.

### Design foundations

- **R11 — Three-layer tokens:** Design values must be represented as primitive, semantic, and component/pattern tokens. Feature and example code must use semantic or approved component tokens; raw palette values must not be used directly outside token definitions.
- **R12 — Stable semantics across themes:** Every theme and profile must provide the same required semantic roles for canvas, layered surfaces, text hierarchy, borders, actions, focus, selection, data visualization, and feedback states. Contrast and focus visibility must remain valid after configuration changes.
- **R13 — Controlled visual expression:** The foundation must define surface layering, accent allocation, type hierarchy, icon containers, border and shadow roles, gradient constraints, data color palettes, and motion roles. It must distinguish productive motion used for frequent interactions from expressive motion reserved for orientation, progress, completion, onboarding, or important transitions.
- **R14 — Content rules:** Content guidance must define title hierarchy, labels, helper text, validation, empty states, destructive actions, status wording, and when repeated information is justified. The system must prefer progressive disclosure over permanently visible explanatory text.

### Page Pattern catalog

- **R15 — Golden Example per pattern:** Every supported Page Pattern must have exactly one canonical runnable Golden Example per applicable UI profile. Variants and state galleries may supplement the canonical example but may not replace it.
- **R16 — Initial broad catalog:** The solution must cover the following pattern families:
  - **Entry and orientation:** `HomeLauncherPage`, `DashboardPage`, `AuthPage`, `OnboardingPage`;
  - **Find and manage data:** `SearchListPage`, `DataTablePage`, `DetailPage`, `MasterDetailPage`, `ComparisonPage`;
  - **Create and configure:** `FormPage`, `SettingsPage`, `WorkflowPage`, `ImportMappingPage`;
  - **Operate and monitor:** `TaskProgressPage`, `InboxQueuePage`, `ReviewApprovalPage`, `ReportsAnalyticsPage`, `CalendarTimelinePage`, `KanbanPage`;
  - **Create content and communicate:** `ContentEditorPage`, `ConversationPage`, `AIWorkspacePage`, `FileLibraryPage`;
  - **Support and commercial:** `HelpDocsPage`, `BillingPlanPage`, `MarketingLandingPage`;
  - **Special states and spaces:** `StatePage` for empty/error/forbidden/not-found/offline states and `FullScreenWorkspacePage` for editor, canvas, or split-pane experiences.
- **R17 — Golden Example completeness:** Each Golden Example must include realistic frontend mock data; desktop and narrow layouts; loading, empty, error, populated, partial, disabled, and permission-limited states where relevant; keyboard behavior; interaction tests; a visual baseline; intended and unintended use; content rationale; and known constraints.
- **R18 — Pattern behavior before styling:** A pattern definition must specify information hierarchy, primary and secondary actions, responsive adaptation, state transitions, data boundaries, and failure behavior before profile-specific styling is applied.

### High-risk interaction components

- **R19 — Slider contract:** Slider may be used only for continuous or perceptual choices. Precise values require visible value output and, where appropriate, a paired numeric input. The component must define minimum, maximum, step, keyboard controls, touch target, active/inactive track contrast, range-thumb collision behavior, disabled/error states, deferred expensive updates, and protection from asynchronous thumb rollback. Slider Golden Examples must include single-value, paired-input, range, disabled, error, and narrow-screen cases.
- **R20 — Async and destructive safety:** Submissions must prevent accidental duplicate execution; asynchronous controls must expose progress and outcome; destructive actions must communicate scope; reversible operations should prefer undo where safe; disabled actions that are not self-explanatory must expose the reason.

### Reference library

- **R21 — Curated primary references:** The repository must contain locally maintained analysis packs for Ant Design, Material Design 3 Expressive, IBM Carbon, Atlassian Design System, and Microsoft Fluent 2. Each pack must record official sources, license/source metadata, transferable principles, useful patterns, risks, and explicit decisions about what this solution adopts or rejects.
- **R22 — Product references:** AI Find, Fonio, Codex, and the existing TollMarketingContentCreator project may inform page composition and visual judgment, but they are secondary references and must not be copied wholesale or treated as the source of truth.
- **R23 — Reference traceability:** Important local design decisions must identify the reference principle or product need that motivated them. External source material must be summarized or linked rather than indiscriminately mirrored.

### Skills and AI workflow

- **R24 — `frontend-design` Skill:** The repository must provide an installable Skill with display name “Frontend Design” and invocation name `$frontend-design`. Given a business brief and target repository, it must:
  1. classify application scale and page pattern;
  2. select or honor a valid profile/theme preset;
  3. read only the relevant design rules and Golden Examples;
  4. reuse or install existing components and patterns before creating new ones;
  5. implement all relevant states and responsive behavior;
  6. check information duplication, hierarchy, feedback, motion, accessibility, and visual consistency;
  7. run the target repository’s real verification commands and report evidence.
- **R25 — Predictable Skill decisions:** When the user does not specify a configuration, `$frontend-design` must select from documented defaults based on application scale and task type and state the choice. It must not invent an unregistered visual language or silently mix `admin-ant` with open-code profile components in one product region.
- **R26 — Repository-only promotion Skill:** The repository must provide a second explicitly invoked Skill named `$promote-ui-pattern`. It must only be discoverable as a project/repository Skill. It generalizes a successful project change into this library by identifying the reusable problem, rejecting business-specific details, choosing the correct foundation/component/pattern/example layer, checking for duplication, updating the canonical Golden Example and tests, and recording the evolution. It must be allowed to conclude that a local change should not be promoted.

### Consistency, verification, and delivery

- **R27 — Pure frontend showcase:** The Control interface, catalog, examples, and state switching must run entirely with frontend mock data. No backend, external account, or production data may be required.
- **R28 — Shared identity for multi-tool products:** Different tools may use different approved themes or accents, but global shell geometry, typography roles, interaction semantics, focus treatment, component anatomy, and navigation behavior must remain consistent. A tool-level variation must be selected from registered configuration rather than custom CSS.
- **R29 — Large-system coherence:** A large system must establish one global product configuration. Domain modules can select documented density or accent variants only within that configuration. The system must demonstrate this rule with at least one large-platform Golden Example containing multiple modules.
- **R30 — Accessibility and responsiveness:** All examples must provide a visible accessible page heading, logical focus order, keyboard operation, semantic labels, reduced-motion support, sufficient contrast, and usable behavior from 320 px upward. Dense tables may scroll rather than collapse when collapsing would destroy meaning, but essential actions must remain reachable.
- **R31 — Automated quality gate:** One repository command must run formatting/linting, TypeScript checks, component and interaction tests, production build, structural design-rule checks, and visual regression checks for canonical examples. A Skill may not claim success without fresh results from this command or a documented narrower command when the target project has its own verified gate.
- **R32 — No ungoverned duplication:** The quality system must detect or review raw color/spacing values outside token files, duplicate shared components, missing interaction states, missing Page Pattern states, inaccessible icon-only actions, and direct vendor imports where a project wrapper is required.

## Model and Boundaries

### Core concepts

- **DesignConfig:** A validated combination of application scale, UI profile, visual theme, density, motion, and navigation shell.
- **Preset:** A named, recommended DesignConfig that has visual and behavior verification.
- **PagePattern:** A reusable behavioral and information-architecture contract for one page family.
- **GoldenExample:** The canonical runnable implementation demonstrating a PagePattern under an applicable profile.
- **ReferencePack:** A maintained local analysis of an external design system or product reference.
- **PromotionCandidate:** A project change being evaluated by `$promote-ui-pattern` for generalization.

### Configuration boundaries

- Profile controls component anatomy, layout conventions, and information density defaults.
- Theme controls semantic color and selected expressive treatments.
- Density controls spacing, control height, row height, and information packing without reducing required touch targets below accessible minimums.
- Motion controls duration, easing, sequencing, and expressive allowance without altering business state.
- Application scale controls shell and navigation complexity, not visual brand.
- Page Patterns own workflow and hierarchy; themes may not rearrange the workflow.

### Source-of-truth boundaries

- The repository’s tokens, pattern contracts, Golden Examples, and validation rules are authoritative.
- Skills orchestrate the authoritative artifacts but do not duplicate them.
- External design systems are references or underlying implementations, not the source of local product decisions.
- Mock data demonstrates behavior and is not a persistence model.

## Acceptance Criteria / Examples

- **AC1 / R5–R10:** Given the showcase home page, when a user selects `medium-product`, `data-workbench`, `violet`, `compact`, and `expressive`, then navigation to any compatible Golden Example preserves the selection in the URL and renders without a backend.
- **AC2 / R1:** Given the same status appears in a page header and a nearby card, when both instances have no distinct action or orientation purpose, then the canonical example removes or demotes one instance; a repeated destructive-action summary is accepted when it confirms scope before execution.
- **AC3 / R2–R4:** Given an interactive result row, when it is hovered, keyboard-focused, selected, loading an action, and completed, then each state is perceivable, motion preserves context, and the page remains readable with reduced motion enabled.
- **AC4 / R6, R28:** Given a `small-toolbox` example with a violet AI writer and green Help tool, then both tools retain the same shell, type scale, control anatomy, focus treatment, and navigation behavior while their registered accent treatments differ.
- **AC5 / R7, R15–R18:** Given `DataTablePage`, then the catalog provides separate canonical `data-workbench` and `admin-ant` examples with the same behavioral obligations but profile-appropriate component implementations.
- **AC6 / R8, R11–R13:** Given any canonical example, when switching among violet, blue, graphite, and green, then all required semantic roles remain defined, text and focus remain legible, and no feature-level raw palette value is needed.
- **AC7 / R16–R17:** Given the Page Pattern catalog, every named pattern has a reachable canonical example and documentation, and automated checks fail when a pattern lacks its example or required state declaration.
- **AC8 / R19:** Given the Slider examples, keyboard arrows update the value, a precise value can be entered when required, range thumbs remain distinguishable, and delayed mock persistence does not snap the thumb back.
- **AC9 / R24–R25:** Given a request to build a customer search tool without a specified profile, when `$frontend-design` is invoked, then it selects a documented default, states the choice, uses the relevant SearchList Golden Example, and runs verification.
- **AC10 / R26:** Given a business-specific improvement to bulk selection, when `$promote-ui-pattern` is explicitly invoked, then it either produces a generalized tested pattern update with business terms removed or records why the change remains local.
- **AC11 / R27:** Given a fresh clone and installed frontend dependencies, when the showcase starts, then every catalog page and state can be explored without environment secrets, network APIs, or a backend process.
- **AC12 / R29:** Given the large-platform example, when moving between at least three domain modules, then global identity and navigation remain stable while only documented module variants change.
- **AC13 / R30–R32:** Given the repository quality command, when a canonical example introduces an inaccessible icon-only button, unregistered raw color, or missing empty state, then verification fails with an actionable message.

## Out of Scope

- A production backend, authentication service, database, CMS, analytics pipeline, or real business API.
- A general-purpose replacement for every component in Ant Design, Radix, or other mature interaction libraries.
- Pixel-for-pixel cloning of AI Find, Fonio, Codex, or any external design system.
- Publishing public npm packages, a hosted registry, or a public documentation site in the first implementation milestone.
- Automatic promotion of project changes without explicit invocation and review.
- Unlimited user-authored themes or arbitrary combinations that have not passed verification.

## Open Questions

No product decision is currently blocking implementation planning. Technical package selection, repository layout, and milestone order may be proposed in the implementation plan, but they must preserve every behavior and boundary above.
