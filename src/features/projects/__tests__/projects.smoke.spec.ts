import { expect, test } from "@playwright/test";

test.describe("Projects Page Smoke Tests", { tag: ["@smoke"] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("should display projects page with correct title and layout", async ({
    page,
  }) => {
    await test.step("Check page loads with projects container", async () => {
      await expect(page.getByTestId("projects-container")).toBeVisible();
    });

    await test.step("Verify basic functionality", async () => {
      // Check that projects are loading and displayed
      await expect(page.locator("article").first()).toBeVisible();
    });
  });
});
