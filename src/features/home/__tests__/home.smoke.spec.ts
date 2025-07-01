import { expect, test } from "@playwright/test";

test.describe("Home Page Smoke Tests", { tag: ["@smoke"] }, () => {
  test("should load home page with hero content successfully", async ({
    page,
  }) => {
    await test.step("should navigate to home page", async () => {
      const startTime = Date.now();
      await page.goto("/");
      const loadTime = Date.now() - startTime;

      // Critical path should load within 3 seconds
      expect(loadTime, `Home page took ${loadTime}ms to load`).toBeLessThan(
        3000,
      );
    });

    await test.step("should display main content area", async () => {
      await expect(page.getByRole("main")).toBeVisible();
    });

    await test.step("should render hero section content", async () => {
      await expect(page.getByRole("heading").first()).toBeVisible();
    });
  });

  test("should maintain performance under load", async ({ page }) => {
    await test.step("should load page within performance budget", async () => {
      const startTime = Date.now();
      await page.goto("/");
      await expect(page.getByRole("main")).toBeVisible();
      const totalTime = Date.now() - startTime;

      // Performance budget: 5 seconds for complete page load
      expect(totalTime, `Page load took ${totalTime}ms`).toBeLessThan(5000);
    });

    await test.step("should not have excessive layout shifts", async () => {
      await page.goto("/");

      // Wait for initial content to load
      await expect(page.getByRole("main")).toBeVisible();

      // Capture initial layout
      const mainElement = page.getByRole("main");
      const initialBounds = await mainElement.boundingBox();

      // Wait for any dynamic content to settle
      await page.waitForTimeout(1000);

      const finalBounds = await mainElement.boundingBox();

      expect(initialBounds).toBeTruthy();
      expect(finalBounds).toBeTruthy();

      if (initialBounds && finalBounds) {
        // Allow for small layout adjustments but no major shifts
        const heightDifference = Math.abs(
          finalBounds.height - initialBounds.height,
        );
        expect(
          heightDifference,
          `Layout shift of ${heightDifference}px detected`,
        ).toBeLessThan(100);
      }
    });
  });
});
