import { expect, test } from "@playwright/test";

test.describe("@feature-home: Core functionality", () => {
  test("home page should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-testid="home-page"]')).toBeVisible();
  });

  test("navigation to home should work", async ({ page }) => {
    await page.goto("/projects");

    // Look for a link to home
    const homeLink = page.getByRole("link", { name: "Home" });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL("/");
    await expect(page.locator('[data-testid="home-page"]')).toBeVisible();
  });

  test("should perform well on initial load", async ({ page }) => {
    await test.step("Measure initial page load performance", async () => {
      const startTime = Date.now();
      await page.goto("/");
      await expect(page.locator('[data-testid="home-page"]')).toBeVisible();
      const loadTime = Date.now() - startTime;

      // Page should load within reasonable time (5 seconds)
      expect(loadTime).toBeLessThan(5000);
    });

    await test.step("Verify no layout shifts occur", async () => {
      await page.goto("/");

      // Wait for content to load
      await expect(page.locator('[data-testid="home-page"]')).toBeVisible();

      // Check that content is stable (no major layout shifts)
      const mainContent = page.locator("main");
      const initialBounds = await mainContent.boundingBox();

      // Wait a bit and check bounds haven't changed significantly
      await page.waitForTimeout(1000);
      const finalBounds = await mainContent.boundingBox();

      expect(finalBounds).toBeTruthy();
      expect(initialBounds).toBeTruthy();

      if (initialBounds && finalBounds) {
        // Allow for small differences but no major shifts
        expect(
          Math.abs(finalBounds.height - initialBounds.height),
        ).toBeLessThan(50);
      }
    });
  });
});
