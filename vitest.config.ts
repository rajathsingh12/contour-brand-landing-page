import { defineConfig } from "vitest/config";
import path from "path";

// This shell exports NODE_ENV=production, which makes React load its production
// build (no `act` export) and breaks every Testing Library render. Force test
// mode in the main process before workers fork (Object.assign sidesteps the
// read-only NODE_ENV type), and again per worker via test.env.
Object.assign(process.env, { NODE_ENV: "test" });

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    env: { NODE_ENV: "test" },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
