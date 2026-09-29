import { describe, expect, it } from "vitest";
import { getIconDefinition, iconCategories, iconEntries, iconRegistry } from "./iconRegistry";

describe("semantic icon registry", () => {
  it("covers every declared category with documented entries", () => {
    for (const category of iconCategories) {
      expect(iconEntries.some(([, definition]) => definition.category === category)).toBe(true);
    }

    for (const [key, definition] of iconEntries) {
      expect(key).toMatch(/^[a-z]+(?:-[a-z]+)*$/);
      expect(definition.label.length).toBeGreaterThan(1);
      expect(definition.use.length).toBeGreaterThan(10);
      expect(definition.avoid.length).toBeGreaterThan(10);
      expect(definition.aliases.length).toBeGreaterThan(0);
    }
  });

  it("keeps critical action and feedback meanings explicit", () => {
    expect(getIconDefinition("delete").label).toBe("Delete");
    expect(getIconDefinition("close").label).toBe("Close");
    expect(getIconDefinition("success").label).toBe("Success");
    expect(getIconDefinition("save").label).toBe("Save");
    expect(iconRegistry.loading.icon).not.toBe(iconRegistry.pending.icon);
  });
});
