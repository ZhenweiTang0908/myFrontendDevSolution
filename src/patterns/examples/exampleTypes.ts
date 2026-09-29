import type { ComponentType } from "react";
import type { DemoState } from "../../config/designConfig";

export interface GoldenExampleProps {
  state: DemoState;
}

export type GoldenExampleComponent = ComponentType<GoldenExampleProps>;
