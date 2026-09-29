import { SlidersHorizontal } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  applicationScales,
  demoStates,
  densities,
  motionModes,
  navigationShells,
  presets,
  themes,
  uiProfiles,
  type DesignConfig,
} from "../config/designConfig";
import { useDesignConfig } from "../config/designConfigContext";
import { patterns } from "../patterns/patternRegistry";

const labels: Record<string, string> = {
  "small-toolbox": "Small toolbox",
  "medium-product": "Medium product",
  "large-platform": "Large platform",
  "product-custom": "Product custom",
  "data-workbench": "Data workbench",
  "admin-ant": "Admin Ant",
  violet: "Violet",
  blue: "Blue",
  graphite: "Graphite",
  green: "Green",
  comfortable: "Comfortable",
  compact: "Compact",
  dense: "Dense",
  calm: "Calm",
  expressive: "Expressive",
  sidebar: "Sidebar",
  topbar: "Top bar",
  launcher: "Launcher",
  populated: "Populated",
  loading: "Loading",
  empty: "Empty",
  error: "Error",
  partial: "Partial",
  disabled: "Disabled",
  restricted: "Restricted",
};

const fields = [
  ["scale", "System size", applicationScales],
  ["profile", "UI profile", uiProfiles],
  ["theme", "Theme", themes],
  ["density", "Density", densities],
  ["motion", "Motion", motionModes],
  ["navigation", "Navigation", navigationShells],
  ["state", "Demo state", demoStates],
] as const;

export function ConfigControl() {
  const { config, updateConfig, applyPreset } = useDesignConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const { patternId } = useParams();

  return (
    <aside className="config-control" aria-label="Design configuration">
      <div className="config-control__title">
        <span className="icon-tile icon-tile--accent" aria-hidden="true">
          <SlidersHorizontal size={17} />
        </span>
        <div>
          <strong>Control</strong>
          <span>Change structure and tone independently.</span>
        </div>
      </div>

      <label className="control-field">
        <span>Recommended preset</span>
        <select
          aria-label="Recommended preset"
          value={presets.find((preset) => Object.entries(preset.config).every(([key, value]) => config[key as keyof DesignConfig] === value))?.id ?? "custom"}
          onChange={(event) => {
            const preset = presets.find((candidate) => candidate.id === event.target.value);
            if (preset) applyPreset(preset);
          }}
        >
          <option value="custom" disabled>Custom configuration</option>
          {presets.map((preset) => (
            <option key={preset.id} value={preset.id}>{preset.name}</option>
          ))}
        </select>
      </label>

      <label className="control-field">
        <span>Page Pattern</span>
        <select
          aria-label="Page Pattern"
          value={patternId ?? "catalog"}
          onChange={(event) => {
            const pathname = event.target.value === "catalog" ? "/" : `/patterns/${event.target.value}`;
            navigate({ pathname, search: location.search });
          }}
        >
          <option value="catalog">Catalog overview</option>
          {patterns.map((pattern) => (
            <option value={pattern.id} key={pattern.id}>{pattern.name}</option>
          ))}
        </select>
      </label>

      <div className="config-control__grid">
        {fields.map(([key, label, options]) => (
          <label className="control-field" key={key}>
            <span>{label}</span>
            <select
              value={config[key]}
              onChange={(event) => updateConfig({ [key]: event.target.value })}
            >
              {options.map((option) => <option value={option} key={option}>{labels[option]}</option>)}
            </select>
          </label>
        ))}
      </div>
    </aside>
  );
}
