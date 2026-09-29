import { lazy, Suspense } from "react";
import { useDesignConfig } from "../../config/designConfigContext";
import type { PatternId } from "../patternRegistry";
import { AuthExample, DashboardExample, HomeLauncherExample, OnboardingExample } from "./EntryExamples";
import { ComparisonExample, DataTableExample, DetailExample, MasterDetailExample, SearchListExample } from "./DataExamples";
import { FormExample, ImportMappingExample, SettingsExample, WorkflowExample } from "./ConfigureExamples";
import { CalendarTimelineExample, InboxQueueExample, KanbanExample, ReportsAnalyticsExample, ReviewApprovalExample, TaskProgressExample } from "./OperateExamples";
import { AIWorkspaceExample, ContentEditorExample, ConversationExample, FileLibraryExample } from "./CommunicateExamples";
import { BillingPlanExample, HelpDocsExample, MarketingLandingExample } from "./SupportExamples";
import { FullScreenWorkspaceExample, StateExample } from "./SpecialExamples";
import type { GoldenExampleComponent } from "./exampleTypes";

const AdminDataTableExample = lazy(() => import("../../profiles/admin/AdminExamples").then((module) => ({ default: module.AdminDataTableExample })));
const AdminFormExample = lazy(() => import("../../profiles/admin/AdminExamples").then((module) => ({ default: module.AdminFormExample })));

const examples: Record<PatternId, GoldenExampleComponent> = {
  "home-launcher": HomeLauncherExample,
  dashboard: DashboardExample,
  auth: AuthExample,
  onboarding: OnboardingExample,
  "search-list": SearchListExample,
  "data-table": DataTableExample,
  detail: DetailExample,
  "master-detail": MasterDetailExample,
  comparison: ComparisonExample,
  form: FormExample,
  settings: SettingsExample,
  workflow: WorkflowExample,
  "import-mapping": ImportMappingExample,
  "task-progress": TaskProgressExample,
  "inbox-queue": InboxQueueExample,
  "review-approval": ReviewApprovalExample,
  "reports-analytics": ReportsAnalyticsExample,
  "calendar-timeline": CalendarTimelineExample,
  kanban: KanbanExample,
  "content-editor": ContentEditorExample,
  conversation: ConversationExample,
  "ai-workspace": AIWorkspaceExample,
  "file-library": FileLibraryExample,
  "help-docs": HelpDocsExample,
  "billing-plan": BillingPlanExample,
  "marketing-landing": MarketingLandingExample,
  state: StateExample,
  "full-screen-workspace": FullScreenWorkspaceExample,
};

export function PatternExample({ patternId }: { patternId: PatternId }) {
  const { config } = useDesignConfig();

  if (config.profile === "admin-ant") {
    if (patternId === "data-table") return <Suspense fallback={<div className="demo-state">Loading Admin profile…</div>}><AdminDataTableExample state={config.state} /></Suspense>;
    if (patternId === "form") return <Suspense fallback={<div className="demo-state">Loading Admin profile…</div>}><AdminFormExample state={config.state} /></Suspense>;
  }

  const Example = examples[patternId];
  return <Example state={config.state} />;
}
