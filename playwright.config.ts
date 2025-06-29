import {
  defineConfig,
  devices,
  type PlaywrightTestProject,
} from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"; // default for local dev

const projects: PlaywrightTestProject[] = [
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
];
if (process.env.VISUAL) {
  projects.push(
    {
      name: "visual-desktop",
      grep: /@visual/,
      use: {
        ...devices["Desktop Firefox"],
        video: "on",
      },
    },
    {
      name: "visual-mobile",
      grep: /@visual/,
      use: {
        ...devices["iPhone SE"],
        video: "on",
      },
    },
  );
}

export default defineConfig({
  retries: 1,
  use: {
    baseURL,
    headless: true,
    trace: "on-first-retry",
  },
  testMatch: "src/features/**/*.spec.{js,ts,jsx,tsx}",
  projects,
});
