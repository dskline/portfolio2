import { test } from "@playwright/test";

// Go to the toolbox page and slowly scroll down to the bottom
// to ensure all elements are loaded.
test(
  "Toolbox page visual scroll test",
  { tag: "@visual" },
  async ({ page }) => {
    await page.goto("/toolbox");
    await page.waitForLoadState("networkidle");

    // Scroll slowly to the bottom to ensure all elements are loaded smoothly
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const { scrollHeight } = document.body;
        let currentPosition = 0;
        const scrollStep = 100; // pixels per step
        const scrollInterval = 100; // milliseconds between steps

        const smoothScroll = setInterval(() => {
          if (currentPosition >= scrollHeight) {
            clearInterval(smoothScroll);
            resolve(true);
            return;
          }
          currentPosition += scrollStep;
          window.scrollTo(0, currentPosition);
        }, scrollInterval);
      });
    });
  },
);
