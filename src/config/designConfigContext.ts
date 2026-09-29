import { createContext, useContext } from "react";
import type { DesignConfig, DesignPreset } from "./designConfig";

export interface DesignConfigContextValue {
  config: DesignConfig;
  updateConfig: (change: Partial<DesignConfig>) => void;
  applyPreset: (preset: DesignPreset) => void;
}

export const DesignConfigContext = createContext<DesignConfigContextValue | null>(null);

export function useDesignConfig(): DesignConfigContextValue {
  const value = useContext(DesignConfigContext);
  if (!value) {
    throw new Error("useDesignConfig must be used inside DesignConfigProvider");
  }
  return value;
}
