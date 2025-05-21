import { expect, test } from "@playwright/test";
import type { Locator } from "@playwright/test";

test("@smoke Toolbox Button", async ({ page }) => {
  let toolButtons: Locator;

  await test.step("tool buttons exist on the page", async () => {
    await page.goto("/toolbox");

    toolButtons = page.locator('[data-testid="tool-button"]');
    await expect(
      toolButtons.first(),
      "There should be at least one tool button",
    ).toBeVisible();
  });

  await test.step("tool buttons have non-empty href attributes", async () => {
    await page.waitForLoadState("networkidle");

    (await toolButtons.all()).forEach(async (button, index) => {
      const href = await button.getAttribute("href");
      expect(
        href,
        `Tool button at index ${index} should have a valid href`,
      ).toBeTruthy();
    });
  });
});
