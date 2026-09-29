import {
  Archive,
  ArrowDownAZ,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  ChartColumn,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Copy,
  Ellipsis,
  ExternalLink,
  Eye,
  File,
  FileInput,
  FileText,
  Filter,
  FolderOpen,
  Home,
  Info,
  Inbox,
  Link,
  ListFilter,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TableProperties,
  Trash2,
  Upload,
  User,
  Users,
  WandSparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";

export const iconCategories = [
  "Navigation",
  "Actions",
  "Discovery",
  "Status & feedback",
  "People & content",
  "Data & workflow",
  "AI",
] as const;

export type IconCategory = (typeof iconCategories)[number];

export interface IconDefinition {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly category: IconCategory;
  readonly use: string;
  readonly avoid: string;
  readonly aliases: readonly string[];
}

export const iconRegistry = {
  home: { icon: Home, label: "Home", category: "Navigation", use: "Return to the product or workspace root.", avoid: "A generic dashboard when the destination is not home.", aliases: ["root", "overview"] },
  back: { icon: ArrowLeft, label: "Back", category: "Navigation", use: "Return to the previous level or step.", avoid: "Collapsing a panel or undoing a data change.", aliases: ["previous", "return"] },
  forward: { icon: ArrowRight, label: "Forward", category: "Navigation", use: "Continue to the next step or destination.", avoid: "Opening an external site.", aliases: ["next", "continue"] },
  expand: { icon: ChevronDown, label: "Expand", category: "Navigation", use: "Reveal content directly below the current control.", avoid: "Moving to another page.", aliases: ["open", "disclosure"] },
  "drill-in": { icon: ChevronRight, label: "Drill in", category: "Navigation", use: "Open a nested level or child detail.", avoid: "A primary continue action with a text label.", aliases: ["child", "details"] },
  "external-link": { icon: ExternalLink, label: "External link", category: "Navigation", use: "Open a destination outside the current product context.", avoid: "Ordinary internal navigation.", aliases: ["new tab", "outside"] },

  add: { icon: Plus, label: "Add", category: "Actions", use: "Create or append an item when the noun is visible in the label.", avoid: "Expanding hidden content.", aliases: ["create", "new"] },
  edit: { icon: Pencil, label: "Edit", category: "Actions", use: "Modify an existing object or field.", avoid: "Creating a new object.", aliases: ["modify", "rename"] },
  save: { icon: Save, label: "Save", category: "Actions", use: "Persist an editable draft when saving is an explicit action.", avoid: "Indicating that an async save succeeded.", aliases: ["persist", "store"] },
  delete: { icon: Trash2, label: "Delete", category: "Actions", use: "Permanently remove an object after scope is clear.", avoid: "Closing, dismissing, or removing a temporary chip.", aliases: ["trash", "destroy"] },
  close: { icon: X, label: "Close", category: "Actions", use: "Dismiss a layer or remove a transient item.", avoid: "A destructive record deletion.", aliases: ["dismiss", "remove"] },
  copy: { icon: Copy, label: "Copy", category: "Actions", use: "Copy a value, link, or object reference.", avoid: "Duplicating a full business record unless the label says Duplicate.", aliases: ["clipboard", "duplicate"] },
  upload: { icon: Upload, label: "Upload", category: "Actions", use: "Send a local file into the product.", avoid: "Importing structured records with mapping.", aliases: ["attach", "send file"] },
  import: { icon: FileInput, label: "Import", category: "Actions", use: "Bring structured external data into a workflow.", avoid: "A simple single-file attachment.", aliases: ["ingest", "mapping"] },
  download: { icon: ArrowDownToLine, label: "Download", category: "Actions", use: "Save an existing file to the device.", avoid: "Generating a new report export.", aliases: ["save file", "retrieve"] },
  refresh: { icon: RefreshCw, label: "Refresh", category: "Actions", use: "Fetch the latest view without changing intent.", avoid: "Retrying a failed mutation with uncertain outcome.", aliases: ["reload", "sync"] },
  retry: { icon: RotateCcw, label: "Retry", category: "Actions", use: "Repeat a confirmed failed, idempotent operation.", avoid: "Unknown-outcome or potentially duplicated operations.", aliases: ["try again", "rerun"] },
  more: { icon: Ellipsis, label: "More actions", category: "Actions", use: "Open secondary actions that do not deserve permanent space.", avoid: "Hiding the primary action or the only recovery action.", aliases: ["overflow", "menu"] },

  search: { icon: Search, label: "Search", category: "Discovery", use: "Find records or content by a query.", avoid: "Filtering by a known structured value.", aliases: ["find", "query"] },
  filter: { icon: Filter, label: "Filter", category: "Discovery", use: "Limit results by structured criteria.", avoid: "Representing sort order.", aliases: ["funnel", "refine"] },
  "active-filters": { icon: ListFilter, label: "Active filters", category: "Discovery", use: "Open or summarize a multi-filter control.", avoid: "A single binary filter toggle.", aliases: ["filter list", "criteria"] },
  sort: { icon: ArrowDownAZ, label: "Sort", category: "Discovery", use: "Change record ordering.", avoid: "Filtering or moving a record.", aliases: ["order", "alphabetical"] },
  tune: { icon: SlidersHorizontal, label: "Tune", category: "Discovery", use: "Adjust several view or generation parameters.", avoid: "A single continuous numeric value, which uses a Slider control.", aliases: ["adjust", "preferences"] },
  view: { icon: Eye, label: "View", category: "Discovery", use: "Preview or inspect without entering edit mode.", avoid: "Showing that something is publicly visible.", aliases: ["preview", "inspect"] },

  success: { icon: CircleCheck, label: "Success", category: "Status & feedback", use: "Confirm a completed operation or healthy state.", avoid: "A selectable checkbox or a Save action.", aliases: ["complete", "healthy"] },
  warning: { icon: CircleAlert, label: "Warning", category: "Status & feedback", use: "Show a recoverable risk that needs attention.", avoid: "A blocking error or destructive action.", aliases: ["caution", "attention"] },
  error: { icon: CircleX, label: "Error", category: "Status & feedback", use: "Show a failed or invalid state that blocks progress.", avoid: "Closing a dialog.", aliases: ["failed", "invalid"] },
  info: { icon: Info, label: "Information", category: "Status & feedback", use: "Add neutral context that changes understanding.", avoid: "Generic decoration beside every note.", aliases: ["details", "notice"] },
  help: { icon: CircleHelp, label: "Help", category: "Status & feedback", use: "Open guidance or explain an unfamiliar concept.", avoid: "Neutral system information.", aliases: ["support", "question"] },
  loading: { icon: LoaderCircle, label: "Loading", category: "Status & feedback", use: "Show short indeterminate work in progress; animate only this icon.", avoid: "Long-running jobs that need progress and status text.", aliases: ["busy", "working"] },
  pending: { icon: Clock, label: "Pending", category: "Status & feedback", use: "Show queued or time-dependent work that has not completed.", avoid: "Indeterminate active loading.", aliases: ["queued", "waiting"] },
  restricted: { icon: LockKeyhole, label: "Restricted", category: "Status & feedback", use: "Explain unavailable content or actions caused by permission.", avoid: "A merely disabled control with another reason.", aliases: ["locked", "permission"] },
  notification: { icon: Bell, label: "Notification", category: "Status & feedback", use: "Open user-relevant alerts and updates.", avoid: "Inline validation or local operation feedback.", aliases: ["alert center", "updates"] },

  person: { icon: User, label: "Person", category: "People & content", use: "Represent one user, owner, or assignee.", avoid: "A team or audience.", aliases: ["user", "owner"] },
  team: { icon: Users, label: "Team", category: "People & content", use: "Represent a group, audience, or collaborators.", avoid: "One account.", aliases: ["group", "people"] },
  company: { icon: Building2, label: "Company", category: "People & content", use: "Represent an organization or account company.", avoid: "A physical home or generic app root.", aliases: ["organization", "business"] },
  file: { icon: File, label: "File", category: "People & content", use: "Represent a generic file when type is unknown.", avoid: "Known documents or folders.", aliases: ["attachment", "asset"] },
  document: { icon: FileText, label: "Document", category: "People & content", use: "Represent readable text content or a document.", avoid: "A generic binary file.", aliases: ["page", "text file"] },
  folder: { icon: FolderOpen, label: "Folder", category: "People & content", use: "Represent a collection of files or nested content.", avoid: "A workflow stage.", aliases: ["directory", "collection"] },
  calendar: { icon: CalendarDays, label: "Calendar", category: "People & content", use: "Represent dates, schedules, or calendar views.", avoid: "Pending state or duration.", aliases: ["date", "schedule"] },
  message: { icon: MessageSquare, label: "Message", category: "People & content", use: "Represent a conversation or direct message.", avoid: "Email delivery.", aliases: ["chat", "comment"] },
  mail: { icon: Mail, label: "Mail", category: "People & content", use: "Represent email content or delivery.", avoid: "An in-product notification.", aliases: ["email", "send mail"] },
  inbox: { icon: Inbox, label: "Inbox", category: "People & content", use: "Represent a queue of received work or messages.", avoid: "A general file collection.", aliases: ["queue", "received"] },
  link: { icon: Link, label: "Link", category: "People & content", use: "Represent a URL or relationship between objects.", avoid: "An external navigation action without a label.", aliases: ["url", "relationship"] },

  table: { icon: TableProperties, label: "Table", category: "Data & workflow", use: "Represent structured rows and columns.", avoid: "A dashboard or chart.", aliases: ["grid", "records"] },
  chart: { icon: ChartColumn, label: "Chart", category: "Data & workflow", use: "Represent metrics, trends, or visualization.", avoid: "A report document without charts.", aliases: ["analytics", "visualization"] },
  report: { icon: ClipboardList, label: "Report", category: "Data & workflow", use: "Represent a compiled business report or summary.", avoid: "An actionable checklist.", aliases: ["summary", "results"] },
  task: { icon: ClipboardCheck, label: "Task", category: "Data & workflow", use: "Represent assigned work or a checklist outcome.", avoid: "A passive report.", aliases: ["todo", "assignment"] },
  workflow: { icon: Workflow, label: "Workflow", category: "Data & workflow", use: "Represent connected stages or automation flow.", avoid: "A simple next step.", aliases: ["process", "pipeline"] },
  archive: { icon: Archive, label: "Archive", category: "Data & workflow", use: "Remove an item from active work while preserving it.", avoid: "Permanent deletion.", aliases: ["store", "inactive"] },
  settings: { icon: Settings, label: "Settings", category: "Data & workflow", use: "Open durable product or account configuration.", avoid: "Temporary view controls.", aliases: ["configuration", "preferences"] },
  verified: { icon: ShieldCheck, label: "Verified", category: "Data & workflow", use: "Represent a trusted, validated, or policy-compliant state.", avoid: "Generic success.", aliases: ["secure", "approved"] },
  check: { icon: Check, label: "Check", category: "Data & workflow", use: "Confirm a compact selection or completed checklist item.", avoid: "A standalone success message.", aliases: ["selected", "done"] },

  ai: { icon: Sparkles, label: "AI", category: "AI", use: "Identify an AI-assisted feature or result.", avoid: "Every primary action in an AI product.", aliases: ["assistant", "intelligence"] },
  generate: { icon: WandSparkles, label: "Generate", category: "AI", use: "Trigger creation or transformation by AI.", avoid: "A generic AI section label.", aliases: ["magic", "transform"] },
  agent: { icon: Bot, label: "Agent", category: "AI", use: "Represent an autonomous or conversational agent.", avoid: "A one-shot generation action.", aliases: ["bot", "automation"] },
} as const satisfies Record<string, IconDefinition>;

export type IconKey = keyof typeof iconRegistry;

export const iconEntries = Object.entries(iconRegistry) as [IconKey, IconDefinition][];

export function getIconDefinition(key: IconKey): IconDefinition {
  return iconRegistry[key];
}
