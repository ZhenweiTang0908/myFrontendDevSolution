import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Ant is an explicitly selected, lazy-loaded profile. Its optional route chunk
    // is larger than the always-loaded product shell, so use a truthful budget for it.
    chunkSizeWarningLimit: 750,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
  },
});
