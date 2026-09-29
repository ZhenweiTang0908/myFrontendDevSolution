import { fileURLToPath } from "node:url";

const recommendations = [
  { pattern: /(?:help|docs|documentation|guide|帮助|文档|指南)/i, preset: "guided-help", pagePattern: "help-docs" },
  { pattern: /(?:admin|crud|permission|operations console|管理后台|权限|运营后台)/i, preset: "enterprise-operations", pagePattern: "data-table" },
  { pattern: /(?:search|filter|find|discovery|搜索|筛选|查找)/i, preset: "graphite-workbench", pagePattern: "search-list" },
  { pattern: /(?:import|mapping|csv|导入|字段映射)/i, preset: "graphite-workbench", pagePattern: "import-mapping" },
  { pattern: /(?:workflow|wizard|campaign|step|流程|向导|活动)/i, preset: "focused-product", pagePattern: "workflow" },
  { pattern: /(?:report|analytics|metrics|报表|分析|指标)/i, preset: "graphite-workbench", pagePattern: "reports-analytics" },
  { pattern: /(?:canvas|whiteboard|full.?screen|画布|全屏工作区)/i, preset: "focused-product", pagePattern: "full-screen-workspace" },
  { pattern: /(?:ai|generate|prompt|assistant|生成|提示词|智能助手)/i, preset: "vivid-toolbox", pagePattern: "ai-workspace" },
];

export function recommendConfig(brief) {
  const match = recommendations.find((candidate) => candidate.pattern.test(brief));
  return match
    ? { preset: match.preset, pagePattern: match.pagePattern }
    : { preset: "vivid-toolbox", pagePattern: "home-launcher" };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const brief = process.argv.slice(2).join(" ").trim();
  if (!brief) {
    console.error("Usage: node recommend-config.mjs <business brief>");
    process.exit(1);
  }
  console.log(JSON.stringify(recommendConfig(brief), null, 2));
}
