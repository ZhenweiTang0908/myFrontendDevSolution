import { fileURLToPath } from "node:url";

export const defaultPreset = "vivid-toolbox";

export const presetProfiles = {
  "vivid-toolbox": "product-custom",
  "focused-product": "product-custom",
  "graphite-workbench": "data-workbench",
  "enterprise-operations": "admin-ant",
  "guided-help": "product-custom",
};

const all = ["product-custom", "data-workbench", "admin-ant"];

export const patternProfiles = {
  "home-launcher": all,
  dashboard: all,
  auth: ["product-custom", "admin-ant"],
  onboarding: ["product-custom"],
  "search-list": all,
  "data-table": ["data-workbench", "admin-ant"],
  detail: all,
  "master-detail": ["data-workbench", "admin-ant"],
  comparison: all,
  form: all,
  settings: all,
  workflow: all,
  "import-mapping": all,
  "task-progress": all,
  "inbox-queue": ["data-workbench", "admin-ant"],
  "review-approval": ["data-workbench", "admin-ant"],
  "reports-analytics": all,
  "calendar-timeline": all,
  kanban: all,
  "content-editor": ["product-custom"],
  conversation: ["product-custom", "data-workbench"],
  "ai-workspace": ["product-custom", "data-workbench"],
  "file-library": all,
  "help-docs": ["product-custom"],
  "billing-plan": ["product-custom", "admin-ant"],
  "marketing-landing": ["product-custom"],
  state: all,
  "full-screen-workspace": ["product-custom", "data-workbench"],
};

// Product context decides the preset; order breaks score ties.
const presetSignals = {
  "enterprise-operations": ["admin", "back office", "backoffice", "internal", "permission", "crud", "enterprise", "管理后台", "后台", "权限", "运营", "内部系统"],
  "guided-help": ["help", "docs", "documentation", "knowledge base", "帮助", "文档", "知识库"],
  "graphite-workbench": ["data", "dataset", "search", "analytics", "report", "enrichment", "workbench", "数据", "检索", "工作台", "搜索", "报表", "分析"],
  "focused-product": ["product", "saas", "app", "产品", "应用"],
  "vivid-toolbox": ["tool", "toolbox", "utility", "generator", "ai", "工具", "小工具", "生成"],
};

// The user's task decides the Page Pattern; order breaks score ties.
const patternSignals = {
  "import-mapping": ["import", "csv", "mapping", "导入", "字段映射"],
  "ai-workspace": ["ai", "generate", "prompt", "assistant", "llm", "生成", "提示词", "智能助手"],
  "review-approval": ["review", "approval", "approve", "审核", "审批"],
  "inbox-queue": ["inbox", "queue", "triage", "ticket", "收件箱", "队列", "工单"],
  "master-detail": ["master-detail", "master detail", "split view", "主从", "左列表右详情", "左边列表", "左侧列表"],
  "data-table": ["table", "bulk", "batch", "records", "crud", "表格", "批量"],
  "search-list": ["search", "filter", "find", "discovery", "搜索", "筛选", "查找"],
  "reports-analytics": ["report", "analytics", "metrics", "trend", "报表", "分析", "指标", "趋势"],
  dashboard: ["dashboard", "overview", "仪表盘", "概览", "总览"],
  "task-progress": ["progress", "long-running", "job status", "进度", "任务进度"],
  workflow: ["workflow", "wizard", "multi-step", "campaign", "流程", "向导", "步骤"],
  onboarding: ["onboarding", "first-run", "新手引导", "首次设置"],
  auth: ["login", "sign in", "sign-in", "sign up", "signup", "register", "password", "登录", "注册", "找回密码"],
  settings: ["settings", "preferences", "configuration", "设置", "配置"],
  form: ["form", "create", "edit", "表单", "新建", "编辑"],
  detail: ["detail", "profile page", "详情"],
  comparison: ["compare", "comparison", "versus", "对比", "比较"],
  "calendar-timeline": ["calendar", "timeline", "schedule", "日历", "时间线", "排期"],
  kanban: ["kanban", "board", "看板"],
  "content-editor": ["editor", "authoring", "article", "编辑器", "写作", "文章"],
  conversation: ["chat", "conversation", "message", "thread", "聊天", "对话", "消息"],
  "file-library": ["file", "upload", "asset", "media", "文件", "上传", "素材"],
  "help-docs": ["help", "docs", "documentation", "faq", "帮助", "文档", "指南"],
  "billing-plan": ["billing", "pricing", "subscription", "invoice", "计费", "订阅", "套餐", "账单"],
  "marketing-landing": ["landing", "marketing", "落地页", "官网", "营销"],
  state: ["404", "empty state", "error page", "offline", "空状态", "错误页"],
  "full-screen-workspace": ["canvas", "whiteboard", "full screen", "fullscreen", "画布", "白板", "全屏"],
  "home-launcher": ["launcher", "tool suite", "工具箱", "工具集"],
};

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ASCII keywords match whole words (with an optional plural); CJK keywords match as substrings.
function keywordPattern(keyword) {
  const escaped = escapeRegExp(keyword);
  return /^[\x20-\x7e]+$/.test(keyword) ? new RegExp(`\\b${escaped}(?:s|es)?\\b`, "i") : new RegExp(escaped);
}

// Longer keyword matches weigh more, so "编辑器" beats "编辑".
function rank(signals, brief) {
  return Object.entries(signals)
    .map(([id, keywords], order) => {
      const matched = keywords.filter((keyword) => keywordPattern(keyword).test(brief));
      return { id, order, matched, score: matched.reduce((sum, keyword) => sum + keyword.length, 0) };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order);
}

export function recommendConfig(brief) {
  const presets = rank(presetSignals, brief);
  const pagePatterns = rank(patternSignals, brief);
  const pagePattern = pagePatterns[0]?.id ?? null;
  const supports = (id) => !pagePattern || patternProfiles[pagePattern].includes(presetProfiles[id]);
  // Without product context, fall back to the first preset (default first) that the pattern supports.
  const fallback = [defaultPreset, ...Object.keys(presetProfiles)].find(supports);
  const preset = presets[0]?.id ?? fallback;
  const profile = presetProfiles[preset];
  const compatible = pagePattern ? supports(preset) : null;
  const notes = [];

  if (!presets.length) notes.push(`No product context matched; using ${preset}${preset === defaultPreset ? " (default)" : ` because ${pagePattern} is not registered for ${presetProfiles[defaultPreset]}`}.`);
  if (!pagePattern) notes.push("No task matched; classify the Page Pattern from the selection rules.");
  if (compatible === false) {
    const options = Object.keys(presetProfiles).filter((id) => patternProfiles[pagePattern].includes(presetProfiles[id]));
    notes.push(`${pagePattern} is not registered for ${profile}; change the pattern or use one of: ${options.join(", ")}.`);
  }

  return {
    preset,
    pagePattern,
    compatible,
    evidence: { preset: presets[0]?.matched ?? [], pagePattern: pagePatterns[0]?.matched ?? [] },
    alternatives: {
      presets: presets.slice(1).map((candidate) => candidate.id),
      pagePatterns: pagePatterns.slice(1).map((candidate) => candidate.id),
    },
    notes,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const brief = process.argv.slice(2).join(" ").trim();
  if (!brief) {
    console.error("Usage: node recommend-config.mjs <business brief>");
    process.exit(1);
  }
  console.log(JSON.stringify(recommendConfig(brief), null, 2));
}
