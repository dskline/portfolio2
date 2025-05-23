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

      await test.step("Navigate to homepage and check initial theme", async () => {
        await page.goto("/");
        const htmlElement = page.locator("html");
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
        const htmlElement = page.locator("html");

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

      await test.step("Click toggle button again and verify theme reverts", async () => {
        await toggleButton.click();
        const htmlElement = page.locator("html");

        // Now it should revert to the initial state (or its opposite if the initial state was ambiguous)
        // More robustly, check if it's different from themeAfterFirstToggle and consistent with initialHtmlClass logic
        if (themeAfterFirstToggle?.includes("dark")) {
          // Was dark, should become light
          await expect(
            htmlElement,
            "HTML class should not contain 'dark' after second toggle",
          ).not.toHaveClass(/dark/, { timeout: 600 });
        } else {
          // Was light, should become dark
          await expect(
            htmlElement,
            "HTML class should contain 'dark' after second toggle",
          ).toHaveClass(/dark/, { timeout: 600 });
        }

        // A more direct check for reversion if initialHtmlClass is well-defined (e.g., explicitly 'light' or 'dark')
        // For now, we check that it's different from the intermediate state.
        const finalHtmlClass = await htmlElement.getAttribute("class");
        console.debug(`HTML class after second toggle: ${finalHtmlClass}`);
        expect(
          finalHtmlClass,
          "Theme should have changed from the intermediate state",
        ).not.toBe(themeAfterFirstToggle);

        // To be absolutely sure about reverting to initial state, we can re-evaluate based on initialHtmlClass
        if (initialHtmlClass?.includes("dark")) {
          expect(
            finalHtmlClass,
            "Theme should revert to initial dark state (or lack of explicit light)",
          ).toContain("dark");
        } else {
          expect(
            finalHtmlClass,
            "Theme should revert to initial light state (or lack of explicit dark)",
          ).not.toContain("dark");
        }
      });
    });
  },
);
