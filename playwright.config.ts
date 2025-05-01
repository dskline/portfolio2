import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"; // default for local dev

export default defineConfig({
  use: {
    baseURL,
    headless: true,
  },
  testMatch: "src/features/**/*.spec.{js,ts,jsx,tsx}",
});
