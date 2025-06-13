import { loadEnvFile } from "node:process";
import { defineConfig } from "vitest/config";

export default defineConfig(() => ({
  test: {
    env: loadEnvFile(),
  },
}));
