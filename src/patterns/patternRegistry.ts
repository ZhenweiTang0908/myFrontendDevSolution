import { demoStates, type DemoState, type UIProfile } from "../config/designConfig";

export const patternIds = [
  "home-launcher",
  "dashboard",
  "auth",
  "onboarding",
  "search-list",
  "data-table",
  "detail",
  "master-detail",
  "comparison",
  "form",
  "settings",
  "workflow",
  "import-mapping",
  "task-progress",
  "inbox-queue",
  "review-approval",
  "reports-analytics",
  "calendar-timeline",
  "kanban",
  "content-editor",
  "conversation",
  "ai-workspace",
  "file-library",
  "help-docs",
  "billing-plan",
  "marketing-landing",
  "state",
  "full-screen-workspace",
] as const;

export type PatternId = (typeof patternIds)[number];
export type PatternCategory =
  | "Entry & orientation"
  | "Find & manage data"
  | "Create & configure"
  | "Operate & monitor"
  | "Create & communicate"
  | "Support & commercial"
  | "Special states & spaces";

export interface PatternDefinition {
  id: PatternId;
  name: string;
  category: PatternCategory;
  summary: string;
  suitedFor: string;
  profiles: readonly UIProfile[];
  states: readonly DemoState[];
}

const allProfiles: readonly UIProfile[] = ["product-custom", "data-workbench", "admin-ant"];

const patternDefinitions = [
  { id: "home-launcher", name: "Home launcher", category: "Entry & orientation", summary: "A clear starting point for a suite of tools.", suitedFor: "Small multi-tool products", profiles: allProfiles },
  { id: "dashboard", name: "Dashboard", category: "Entry & orientation", summary: "Metrics, priorities, and recent activity without card overload.", suitedFor: "Operational overview", profiles: allProfiles },
  { id: "auth", name: "Authentication", category: "Entry & orientation", summary: "Focused sign-in with recovery and error feedback.", suitedFor: "Secure product entry", profiles: ["product-custom", "admin-ant"] },
  { id: "onboarding", name: "Onboarding", category: "Entry & orientation", summary: "Progressive setup that earns each question.", suitedFor: "First-run configuration", profiles: ["product-custom"] },
  { id: "search-list", name: "Search list", category: "Find & manage data", summary: "Search, filters, result scanning, and contextual detail.", suitedFor: "People, content, or asset discovery", profiles: allProfiles },
  { id: "data-table", name: "Data table", category: "Find & manage data", summary: "Dense, selectable records with accountable bulk actions.", suitedFor: "Operational datasets", profiles: ["data-workbench", "admin-ant"] },
  { id: "detail", name: "Entity detail", category: "Find & manage data", summary: "One object, its status, activity, and next actions.", suitedFor: "Customer or project records", profiles: allProfiles },
  { id: "master-detail", name: "Master detail", category: "Find & manage data", summary: "Fast scanning with persistent inspection context.", suitedFor: "Inboxes and review queues", profiles: ["data-workbench", "admin-ant"] },
  { id: "comparison", name: "Comparison", category: "Find & manage data", summary: "Side-by-side decisions with aligned criteria.", suitedFor: "Plans, candidates, or versions", profiles: allProfiles },
  { id: "form", name: "Form", category: "Create & configure", summary: "Grouped data entry with local validation and stable actions.", suitedFor: "Create and edit flows", profiles: allProfiles },
  { id: "settings", name: "Settings", category: "Create & configure", summary: "Durable configuration with save and danger boundaries.", suitedFor: "Account and integration settings", profiles: allProfiles },
  { id: "workflow", name: "Workflow", category: "Create & configure", summary: "A multi-stage task with visible progress and review.", suitedFor: "Campaigns and guided creation", profiles: allProfiles },
  { id: "import-mapping", name: "Import mapping", category: "Create & configure", summary: "Upload, map, validate, preview, and commit.", suitedFor: "CSV and external data intake", profiles: allProfiles },
  { id: "task-progress", name: "Task progress", category: "Operate & monitor", summary: "Long-running work with useful progress and recovery.", suitedFor: "AI and batch jobs", profiles: allProfiles },
  { id: "inbox-queue", name: "Inbox queue", category: "Operate & monitor", summary: "Triage prioritized work without losing context.", suitedFor: "Support and operations", profiles: ["data-workbench", "admin-ant"] },
  { id: "review-approval", name: "Review approval", category: "Operate & monitor", summary: "Evidence, decision, comment, and audit context.", suitedFor: "Quality and compliance", profiles: ["data-workbench", "admin-ant"] },
  { id: "reports-analytics", name: "Reports & analytics", category: "Operate & monitor", summary: "Trends, explanations, and drill-down paths.", suitedFor: "Performance reporting", profiles: allProfiles },
  { id: "calendar-timeline", name: "Calendar & timeline", category: "Operate & monitor", summary: "Time-based planning with density-aware detail.", suitedFor: "Scheduling and history", profiles: allProfiles },
  { id: "kanban", name: "Kanban", category: "Operate & monitor", summary: "Status flow with clear limits and lightweight movement.", suitedFor: "Work tracking", profiles: allProfiles },
  { id: "content-editor", name: "Content editor", category: "Create & communicate", summary: "Focused authoring with preview, generation, and versions.", suitedFor: "Marketing and knowledge work", profiles: ["product-custom"] },
  { id: "conversation", name: "Conversation", category: "Create & communicate", summary: "Thread context, composer feedback, and side information.", suitedFor: "Messaging and support", profiles: ["product-custom", "data-workbench"] },
  { id: "ai-workspace", name: "AI workspace", category: "Create & communicate", summary: "Prompt, artifacts, progress, and controllable AI results.", suitedFor: "Generative tools", profiles: ["product-custom", "data-workbench"] },
  { id: "file-library", name: "File library", category: "Create & communicate", summary: "Upload, preview, organize, and inspect assets.", suitedFor: "Documents and media", profiles: allProfiles },
  { id: "help-docs", name: "Help & docs", category: "Support & commercial", summary: "Readable guidance with green-toned wayfinding.", suitedFor: "Product help centers", profiles: ["product-custom"] },
  { id: "billing-plan", name: "Billing & plan", category: "Support & commercial", summary: "Usage, plan boundaries, payment, and change consequences.", suitedFor: "Subscription products", profiles: ["product-custom", "admin-ant"] },
  { id: "marketing-landing", name: "Marketing landing", category: "Support & commercial", summary: "A focused narrative with controlled expressive moments.", suitedFor: "Product introduction", profiles: ["product-custom"] },
  { id: "state", name: "System state", category: "Special states & spaces", summary: "Empty, error, forbidden, offline, and not-found recovery.", suitedFor: "Every product", profiles: allProfiles },
  { id: "full-screen-workspace", name: "Full-screen workspace", category: "Special states & spaces", summary: "A canvas or split pane that owns viewport and scroll.", suitedFor: "Editors, maps, and complex tools", profiles: ["product-custom", "data-workbench"] },
] as const;

export const patterns: readonly PatternDefinition[] = patternDefinitions.map((pattern) => ({
  ...pattern,
  states: demoStates,
}));

export function getPattern(patternId: string | undefined): PatternDefinition | undefined {
  return patterns.find((pattern) => pattern.id === patternId);
}
