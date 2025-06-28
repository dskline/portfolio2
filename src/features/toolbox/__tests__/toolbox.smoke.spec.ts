import type { Locator } from "@playwright/test";
import { expect, test } from "@playwright/test";

test("Toolbox Button", { tag: "@smoke" }, async ({ page }) => {
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

    const allButtons = await toolButtons.all();
    for (let i = 0; i < allButtons.length; i++) {
      const button = allButtons[i];
      const href = await button.getAttribute("href");
      expect(
        href,
        `Tool button at index ${i} should have a valid href`,
      ).toBeTruthy();
    }
  });
});
