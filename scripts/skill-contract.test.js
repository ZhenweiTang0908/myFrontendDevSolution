import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { recommendConfig } from "../skills/frontend-design/scripts/recommend-config.mjs";

describe("Frontend Design Skill contract", () => {
  it("selects the documented customer-search default", () => {
    expect(recommendConfig("Build a customer search tool with filters")).toEqual({
      preset: "graphite-workbench",
      pagePattern: "search-list",
    });
  });

  it("supports Chinese briefs and explicit product families", () => {
    expect(recommendConfig("做一个带权限和批量操作的管理后台")).toEqual({
      preset: "enterprise-operations",
      pagePattern: "data-table",
    });
    expect(recommendConfig("做一个绿色帮助文档中心")).toEqual({
      preset: "guided-help",
      pagePattern: "help-docs",
    });
  });

  it("keeps promotion explicit and frontend design globally invokable", async () => {
    const [frontendMetadata, promotionMetadata] = await Promise.all([
      readFile(join(process.cwd(), "skills/frontend-design/agents/openai.yaml"), "utf8"),
      readFile(join(process.cwd(), ".agents/skills/promote-ui-pattern/agents/openai.yaml"), "utf8"),
    ]);

    expect(frontendMetadata).toContain('display_name: "Frontend Design"');
    expect(frontendMetadata).toContain("allow_implicit_invocation: true");
    expect(promotionMetadata).toContain('display_name: "Promote UI Pattern"');
    expect(promotionMetadata).toContain("allow_implicit_invocation: false");
  });
});
