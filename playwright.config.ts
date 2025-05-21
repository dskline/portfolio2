import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"; // default for local dev

export default defineConfig({
  use: {
    baseURL,
    headless: true,
  },
  testMatch: "src/features/**/*.spec.{js,ts,jsx,tsx}",
  projects: [
    {
      name: "screenplay-desktop",
      grep: /@screenplay/,
      use: {
        screenshot: "on",
        video: "on",
        viewport: { width: 800, height: 600 },
      },
    },
    {
      name: "screenplay-mobile",
      grep: /@screenplay/,
      use: {
        screenshot: "on",
        video: "on",
        viewport: { width: 400, height: 600 },
      },
    },
    {
      name: "smoke",
      grep: /@smoke/,
    },
    {
      name: "synthetic-monitoring",
      grep: /@synthetic-monitoring/,
    },
  ],
});
