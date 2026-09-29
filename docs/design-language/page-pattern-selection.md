# Page Pattern selection

Select by the user's task, not by the visual layout desired.

| User task | Page Pattern |
|---|---|
| Start one of several independent tools | HomeLauncherPage |
| Understand current operational priorities | DashboardPage |
| Enter a secured product or recover access | AuthPage |
| Make consequential first-run choices | OnboardingPage |
| Find entities using query and filters | SearchListPage |
| Operate on many records and bulk selections | DataTablePage |
| Understand and act on one durable object | DetailPage |
| Scan a queue while inspecting one item | MasterDetailPage |
| Decide between aligned alternatives | ComparisonPage |
| Create or edit one object | FormPage |
| Change durable product configuration | SettingsPage |
| Complete a guided multi-stage task | WorkflowPage |
| Bring external structured data into the product | ImportMappingPage |
| Monitor long-running asynchronous work | TaskProgressPage |
| Triage incoming work by priority | InboxQueuePage |
| Make an auditable decision using evidence | ReviewApprovalPage |
| Understand trends and drill into causes | ReportsAnalyticsPage |
| Plan or inspect time-based work | CalendarTimelinePage |
| Move work through a small status flow | KanbanPage |
| Author and revise substantial content | ContentEditorPage |
| Communicate in a durable thread | ConversationPage |
| Direct, inspect, and reuse AI work | AIWorkspacePage |
| Organize and preview files | FileLibraryPage |
| Read product guidance and recover context | HelpDocsPage |
| Understand usage, price, and plan changes | BillingPlanPage |
| Introduce a product through a narrative | MarketingLandingPage |
| Recover from empty/error/forbidden/offline/not-found | StatePage |
| Work in a viewport-owning canvas, map, or split editor | FullScreenWorkspacePage |

Every canonical example lives under `src/patterns/examples/` and is registered in `PatternExample.tsx`. Start from behavior and information hierarchy, then apply profile and theme.

## Behavioral contracts before styling

| Family | Information hierarchy | Actions | State/data boundary | Failure behavior |
|---|---|---|---|---|
| Entry & orientation | Identity → next decision → recent context | One obvious start/resume action | Show summaries, not full domain records | Preserve a route to sign-in, retry, or skip optional setup |
| Find & manage data | Query/selection → results → inspection | Search/filter first; bulk actions appear only after selection | Results are summaries; detail owns sensitive or long-form fields | Keep filters and safe selection when retrieval fails |
| Create & configure | Purpose → grouped inputs → consequence | Save/continue near the affected form; destructive work isolated | Draft state stays local until explicit commit | Validate beside the field and preserve entered data |
| Operate & monitor | Current health → attention → evidence | Resolve, retry, or inspect beside the affected task | Poll summaries; fetch detail only when inspected | Distinguish failed, delayed, partial, and unknown outcomes |
| Create & communicate | Working artifact/thread → context → tools | Primary creation action remains close to the canvas/composer | Drafts and sources are separate from published output | Preserve recoverable drafts and show source/progress failures locally |
| Support & commercial | User question/value → explanation → next step | Search, contact, or change plan with consequence shown | Guidance and billing facts are read models, not hidden mutations | Keep escape paths to support and explain unavailable actions |
| Special states & spaces | State or workspace first; chrome second | Recovery or tool action remains reachable | The region owns its state and internal scrolling | Never replace actionable recovery with decorative emptiness |

Profile and theme may change anatomy, density, color, and motion. They may not reorder these behavioral obligations.
