import { expect, test } from "@playwright/test";

test.describe(
  "Theme Toggle Functionality",
  { tag: ["@feature-theme", "@smoke"] },
  () => {
    test("should toggle theme when navbar button is clicked", async ({
      page,
    }) => {
      let initialHtmlClass: string | null;
      let themeAfterFirstToggle: string | null;
      const htmlElement = page.locator("html");

      await test.step("Navigate to homepage and check initial theme", async () => {
        await page.goto("/");
        initialHtmlClass = await htmlElement.getAttribute("class");
        // next-themes might add 'light' or 'dark' or nothing if system is preferred and no explicit toggle yet
        // We are primarily interested in the presence/absence of 'dark'
        console.debug(`Initial html class: ${initialHtmlClass}`);
      });

      const toggleButton = page.locator('[aria-label="Toggle theme"]');
      await test.step("Verify theme toggle button is visible", async () => {
        await expect(
          toggleButton,
          "Theme toggle button should be visible",
        ).toBeVisible();
      });

      await test.step("Click toggle button and verify theme changes", async () => {
        await toggleButton.click();

        // Wait for the class attribute to potentially change
        // Check if the 'dark' class presence has flipped or appeared
        if (initialHtmlClass?.includes("dark")) {
          // Was dark, should become light (dark class removed)
          await expect(
            htmlElement,
            "HTML class should not contain 'dark' after toggling from dark",
          ).not.toHaveClass(/dark/);
        } else {
          // Was light (or system default without dark), should become dark
          await expect(
            htmlElement,
            "HTML class should contain 'dark' after toggling from light",
          ).toHaveClass(/dark/);
        }
        themeAfterFirstToggle = await htmlElement.getAttribute("class");
        console.debug(
          `HTML class after first toggle: ${themeAfterFirstToggle}`,
        );
      });

      await test.step("Click toggle button again", async () => {
        await toggleButton.click();
        console.debug("Toggle button clicked second time");
      });

      let finalHtmlClass: string | null;
      await test.step("Get final theme state", async () => {
        finalHtmlClass = await htmlElement.getAttribute("class");
        console.debug(`HTML class after second toggle: ${finalHtmlClass}`);
      });

      await test.step("Verify theme class changes after second toggle", async () => {
        // Check if the 'dark' class presence has flipped again
        if (themeAfterFirstToggle?.includes("dark")) {
          // Was dark after first toggle, should become light after second toggle
          await expect(
            htmlElement,
            "HTML class should not contain 'dark' after second toggle",
          ).not.toHaveClass(/dark/);
        } else {
          // Was light after first toggle, should become dark after second toggle
          await expect(
            htmlElement,
            "HTML class should contain 'dark' after second toggle",
          ).toHaveClass(/dark/);
        }
      });

      await test.step("Verify theme differs from intermediate state", async () => {
        // A more direct check for reversion if initialHtmlClass is well-defined
        expect(
          finalHtmlClass,
          "Theme should have changed from the intermediate state",
        ).not.toBe(themeAfterFirstToggle);
      });

      await test.step("Verify theme reverts to match initial state", async () => {
        // To be absolutely sure about reverting to initial state
        if (initialHtmlClass?.includes("dark")) {
          expect(
            finalHtmlClass,
            "Theme should revert to initial dark state",
          ).toContain("dark");
        } else {
          expect(
            finalHtmlClass,
            "Theme should revert to initial light state",
          ).not.toContain("dark");
        }
      });
    });
  },
);
