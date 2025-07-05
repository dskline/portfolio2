import { expect, test } from "@playwright/test";

test.describe("Home Page Smoke Tests", { tag: ["@smoke"] }, () => {
  test("should load home page with hero content successfully", async ({
    page,
  }) => {
    await test.step("should display main content area", async () => {
      await page.goto("/");
      await expect(page.getByRole("main")).toBeVisible();
    });

    await test.step("should render hero section content", async () => {
      await expect(page.getByRole("heading").first()).toBeVisible();
    });
  });
});
