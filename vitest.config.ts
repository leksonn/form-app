/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./app/setupTests.ts",
    include: ["app/**/*.{test,spec}.{ts,tsx}"],
  },
});
