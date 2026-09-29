export const applicationScales = ["small-toolbox", "medium-product", "large-platform"] as const;
export const uiProfiles = ["product-custom", "data-workbench", "admin-ant"] as const;
export const themes = ["violet", "blue", "graphite", "green"] as const;
export const densities = ["comfortable", "compact", "dense"] as const;
export const motionModes = ["calm", "expressive"] as const;
export const navigationShells = ["sidebar", "topbar", "launcher"] as const;
export const demoStates = ["populated", "loading", "empty", "error", "partial", "disabled", "restricted"] as const;

export type ApplicationScale = (typeof applicationScales)[number];
export type UIProfile = (typeof uiProfiles)[number];
export type ThemeName = (typeof themes)[number];
export type Density = (typeof densities)[number];
export type MotionMode = (typeof motionModes)[number];
export type NavigationShell = (typeof navigationShells)[number];
export type DemoState = (typeof demoStates)[number];

export interface DesignConfig {
  scale: ApplicationScale;
  profile: UIProfile;
  theme: ThemeName;
  density: Density;
  motion: MotionMode;
  navigation: NavigationShell;
  state: DemoState;
}

export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  config: DesignConfig;
}

export const defaultConfig: DesignConfig = {
  scale: "small-toolbox",
  profile: "product-custom",
  theme: "violet",
  density: "comfortable",
  motion: "expressive",
  navigation: "launcher",
  state: "populated",
};

export const presets: readonly DesignPreset[] = [
  {
    id: "vivid-toolbox",
    name: "Vivid toolbox",
    description: "Independent tools with shared structure and controlled accents.",
    config: defaultConfig,
  },
  {
    id: "focused-product",
    name: "Focused product",
    description: "A coherent product with calm blue feedback and sidebar navigation.",
    config: {
      scale: "medium-product",
      profile: "product-custom",
      theme: "blue",
      density: "comfortable",
      motion: "calm",
      navigation: "sidebar",
      state: "populated",
    },
  },
  {
    id: "graphite-workbench",
    name: "Graphite workbench",
    description: "AI Find-inspired search, filters, tables, and inspection.",
    config: {
      scale: "medium-product",
      profile: "data-workbench",
      theme: "graphite",
      density: "compact",
      motion: "calm",
      navigation: "sidebar",
      state: "populated",
    },
  },
  {
    id: "enterprise-operations",
    name: "Enterprise operations",
    description: "A dense Ant-based platform for complex administration.",
    config: {
      scale: "large-platform",
      profile: "admin-ant",
      theme: "blue",
      density: "dense",
      motion: "calm",
      navigation: "topbar",
      state: "populated",
    },
  },
  {
    id: "guided-help",
    name: "Guided help",
    description: "A calm green reading and guidance experience.",
    config: {
      scale: "small-toolbox",
      profile: "product-custom",
      theme: "green",
      density: "comfortable",
      motion: "expressive",
      navigation: "launcher",
      state: "populated",
    },
  },
] as const;

const optionMap = {
  scale: applicationScales,
  profile: uiProfiles,
  theme: themes,
  density: densities,
  motion: motionModes,
  navigation: navigationShells,
  state: demoStates,
} as const;

export function normalizeConfig(input: Partial<Record<keyof DesignConfig, string>>): DesignConfig {
  return Object.fromEntries(
    Object.entries(defaultConfig).map(([key, fallback]) => {
      const configKey = key as keyof DesignConfig;
      const candidate = input[configKey];
      const options = optionMap[configKey] as readonly string[];
      return [configKey, candidate && options.includes(candidate) ? candidate : fallback];
    }),
  ) as unknown as DesignConfig;
}

export function parseConfig(searchParams: URLSearchParams): DesignConfig {
  return normalizeConfig({
    scale: searchParams.get("scale") ?? undefined,
    profile: searchParams.get("profile") ?? undefined,
    theme: searchParams.get("theme") ?? undefined,
    density: searchParams.get("density") ?? undefined,
    motion: searchParams.get("motion") ?? undefined,
    navigation: searchParams.get("navigation") ?? undefined,
    state: searchParams.get("state") ?? undefined,
  });
}

export function writeConfig(searchParams: URLSearchParams, config: DesignConfig): URLSearchParams {
  const next = new URLSearchParams(searchParams);
  for (const [key, value] of Object.entries(config)) {
    next.set(key, value);
  }
  return next;
}
