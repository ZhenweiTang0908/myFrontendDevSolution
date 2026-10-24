import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { auditSource } from "../skills/frontend-design/scripts/audit-target.mjs";
import { patternProfiles, presetProfiles, recommendConfig } from "../skills/frontend-design/scripts/recommend-config.mjs";
import { presets } from "../src/config/designConfig";
import { patterns } from "../src/patterns/patternRegistry";

const skillFile = (path) => readFile(join(process.cwd(), "skills/frontend-design", path), "utf8");

describe("Frontend Design Skill contract", () => {
  it("selects the documented customer-search default", () => {
    expect(recommendConfig("Build a customer search tool with filters")).toMatchObject({
      preset: "graphite-workbench",
      pagePattern: "search-list",
      compatible: true,
    });
  });

  it("supports Chinese briefs and explicit product families", () => {
    expect(recommendConfig("做一个带权限和批量操作的管理后台")).toMatchObject({
      preset: "enterprise-operations",
      pagePattern: "data-table",
    });
    expect(recommendConfig("做一个绿色帮助文档中心")).toMatchObject({
      preset: "guided-help",
      pagePattern: "help-docs",
    });
  });

  it("chooses the preset from product context and the pattern from the task independently", () => {
    expect(recommendConfig("管理后台里的 CSV 导入页")).toMatchObject({
      preset: "enterprise-operations",
      pagePattern: "import-mapping",
      compatible: true,
    });
    expect(recommendConfig("Internal admin settings page")).toMatchObject({
      preset: "enterprise-operations",
      pagePattern: "settings",
    });
  });

  it("does not treat words containing \"ai\" as AI briefs", () => {
    for (const brief of ["Build an email sender", "Show order detail", "Maintain a note list"]) {
      expect(recommendConfig(brief).pagePattern).not.toBe("ai-workspace");
    }
  });

  it("still selects the AI workspace for AI briefs", () => {
    for (const brief of ["Build an AI assistant", "做一个 AI 生成工具", "做个AI助手"]) {
      expect(recommendConfig(brief)).toMatchObject({ preset: "vivid-toolbox", pagePattern: "ai-workspace" });
    }
  });

  it("returns no pattern instead of guessing when the brief names no task", () => {
    const result = recommendConfig("Build an email sender");
    expect(result).toMatchObject({ preset: "vivid-toolbox", pagePattern: null, compatible: null });
    expect(result.notes.join(" ")).toContain("classify the Page Pattern");
  });

  it("prefers the longer, more specific keyword", () => {
    expect(recommendConfig("做一个 Markdown 编辑器").pagePattern).toBe("content-editor");
    expect(recommendConfig("Build a team dashboard").pagePattern).toBe("dashboard");
  });

  it("falls back to a compatible preset when the brief has no product context", () => {
    expect(recommendConfig("做一个客户审批页面")).toMatchObject({
      preset: "graphite-workbench",
      pagePattern: "review-approval",
      compatible: true,
    });
  });

  it("flags patterns that are not registered for the recommended profile", () => {
    const result = recommendConfig("小工具里的批量表格");
    expect(result).toMatchObject({ preset: "vivid-toolbox", pagePattern: "data-table", compatible: false });
    expect(result.notes.join(" ")).toContain("graphite-workbench");
  });

  it("keeps the bundled pattern and preset data in sync with the source registry", () => {
    expect(Object.keys(patternProfiles).sort()).toEqual(patterns.map((pattern) => pattern.id).sort());
    for (const pattern of patterns) expect(patternProfiles[pattern.id], pattern.id).toEqual([...pattern.profiles]);
    expect(Object.keys(presetProfiles).sort()).toEqual(presets.map((preset) => preset.id).sort());
    for (const preset of presets) expect(presetProfiles[preset.id], preset.id).toBe(preset.config.profile);
  });

  it("documents every registered preset and pattern in the bundled selection rules", async () => {
    const selection = await skillFile("references/selection.md");
    const rowFor = (id) => selection.split("\n").find((line) => line.startsWith(`| \`${id}\` |`));
    for (const { id, config } of presets) {
      const values = [config.scale, config.profile, config.theme, config.density, config.motion, config.navigation];
      expect(rowFor(id), id).toContain(values.join(" / "));
    }
    for (const { id, profiles } of patterns) {
      expect(rowFor(id), id).toMatch(new RegExp(`\\| ${profiles.join(", ")} \\|$`));
    }
  });

  it("keeps promotion explicit and frontend design globally invokable", async () => {
    const [frontendMetadata, promotionMetadata] = await Promise.all([
      skillFile("agents/openai.yaml"),
      readFile(join(process.cwd(), ".agents/skills/promote-ui-pattern/agents/openai.yaml"), "utf8"),
    ]);

    expect(frontendMetadata).toContain('display_name: "Frontend Design"');
    expect(frontendMetadata).toContain("allow_implicit_invocation: true");
    expect(promotionMetadata).toContain('display_name: "Promote UI Pattern"');
    expect(promotionMetadata).toContain("allow_implicit_invocation: false");
  });

  it("links only to bundled files that exist", async () => {
    const skill = await skillFile("SKILL.md");
    const links = [...skill.matchAll(/\]\(((?:references|assets|scripts)\/[^)]+)\)/g)].map((match) => match[1]);
    expect(links.length).toBeGreaterThan(0);
    await Promise.all(links.map((link) => skillFile(link)));
  });
});

describe("Frontend Design audit scan", () => {
  const rules = (file, source) => auditSource(file, source).map((finding) => finding.rule);

  it("reports raw values with their line", () => {
    const [finding] = auditSource("src/Page.css", ".a {}\n.b { color: #ff0000; }");
    expect(finding).toMatchObject({ line: 2, rule: "raw-color" });
    expect(rules("src/Page.tsx", "const c = 'rgb(1, 2, 3)';")).toContain("raw-color");
    expect(rules("src/Page.css", ".a { color: var(--primitive-blue-500); }")).toContain("primitive-token");
  });

  it("exempts token files by name, not by directory", () => {
    expect(rules("src/styles/tokens.css", ":root { --x: #fff; }")).toEqual([]);
    expect(rules("src/theme/Button.css", ".a { color: #fff; }")).toContain("raw-color");
  });

  it("allows Ant imports only inside the admin adapter", () => {
    const source = 'import { Table } from "antd";\nimport Button from "antd/es/button";';
    expect(rules("src/pages/Users.tsx", source)).toEqual(["direct-antd-import", "direct-antd-import"]);
    expect(rules("src/profiles/admin/Table.tsx", source)).toEqual([]);
  });

  it("checks each icon-only control for its own accessible name", () => {
    const source = '<button aria-label="Close"><XIcon /></button>\n<button><svg><path d="M0 0" /></svg></button>\n<button><SaveIcon />Save</button>';
    const findings = auditSource("src/Toolbar.tsx", source);
    expect(findings).toEqual([expect.objectContaining({ line: 2, rule: "unnamed-icon-action" })]);
  });

  it("flags multiple h1 elements and raw inline layout styles", () => {
    expect(rules("src/Page.tsx", "<h1>A</h1><h1>B</h1>")).toContain("multiple-h1");
    expect(rules("src/Page.tsx", "<div style={{ padding: 12 }} />")).toContain("raw-inline-style");
  });
});
