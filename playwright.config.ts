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
      name: "smoke",
      grep: /@smoke/,
    },
    {
      name: "regression",
      grep: /@regression/,
    },
    {
      name: "synthetic-monitoring",
      grep: /@synthetic-monitoring/,
    },
    {
      name: "visual-desktop",
      grep: /@visual/,
      use: {
        screenshot: "on",
        video: "on",
        viewport: { width: 800, height: 600 },
      },
    },
    {
      name: "visual-mobile",
      grep: /@visual/,
      use: {
        screenshot: "on",
        video: "on",
        viewport: { width: 400, height: 600 },
      },
    },
  ],
});
