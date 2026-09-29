import { defaultConfig, normalizeConfig, parseConfig, writeConfig } from "./designConfig";

describe("design configuration", () => {
  it("falls back per dimension for invalid URL values", () => {
    expect(parseConfig(new URLSearchParams("theme=orange&density=compact"))).toEqual({
      ...defaultConfig,
      density: "compact",
    });
  });

  it("round-trips every supported dimension without deleting unrelated URL state", () => {
    const config = normalizeConfig({
      scale: "large-platform",
      profile: "admin-ant",
      theme: "graphite",
      density: "dense",
      motion: "calm",
      navigation: "topbar",
      state: "loading",
    });
    const params = writeConfig(new URLSearchParams("pattern=data-table"), config);

    expect(parseConfig(params)).toEqual(config);
    expect(params.get("pattern")).toBe("data-table");
  });
});
