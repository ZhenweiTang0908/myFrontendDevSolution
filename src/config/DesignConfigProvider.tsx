import { useMemo, type PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import {
  parseConfig,
  writeConfig,
} from "./designConfig";
import { DesignConfigContext, type DesignConfigContextValue } from "./designConfigContext";

export function DesignConfigProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();
  const config = useMemo(() => parseConfig(searchParams), [searchParams]);

  const value = useMemo<DesignConfigContextValue>(
    () => ({
      config,
      updateConfig: (change) => setSearchParams(writeConfig(searchParams, { ...config, ...change }), { replace: true }),
      applyPreset: (preset) => setSearchParams(writeConfig(searchParams, preset.config), { replace: true }),
    }),
    [config, searchParams, setSearchParams],
  );

  return (
    <DesignConfigContext.Provider value={value}>
      <div
        className="design-root"
        data-scale={config.scale}
        data-profile={config.profile}
        data-theme={config.theme}
        data-density={config.density}
        data-motion={config.motion}
        data-navigation={config.navigation}
      >
        {children}
      </div>
    </DesignConfigContext.Provider>
  );
}
