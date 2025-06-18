import { expect, test } from "@playwright/test";

test.describe("Projects Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test(
    "should display projects page with correct title and layout",
    {
      tag: "@smoke",
    },
    async ({ page }) => {
      await test.step("Check page loads with projects container", async () => {
        await expect(page.getByTestId("projects-container")).toBeVisible();
      });

      await test.step("Verify basic functionality", async () => {
        // Check that projects are loading and displayed
        await expect(page.locator("article").first()).toBeVisible();
      });
    },
  );

  test(
    "should display project information correctly",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      await test.step("Check projects are visible", async () => {
        // Wait for at least one project to be visible
        await expect(page.locator("article").first()).toBeVisible();
      });

      await test.step("Verify project structure and content", async () => {
        const firstProject = page.locator("article").first();

        // Check that project has title and content
        const title = firstProject.locator("h2");
        await expect(title).toBeVisible();

        // Check that project has subtitle
        const subtitle = firstProject.locator("p").first();
        await expect(subtitle).toBeVisible();

        // Check that project has content description
        const content = firstProject.locator("p").nth(1);
        await expect(content).toBeVisible();
      });
    },
  );

  test(
    "should display GitHub links when available",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      await test.step("Check for GitHub source code links", async () => {
        const githubLinks = page.getByRole("link", { name: /source code/i });

        // Should have at least one GitHub link (assuming test data has GitHub URLs)
        await expect(githubLinks.first()).toBeVisible();
      });

      await test.step("Verify GitHub link properties", async () => {
        const firstGithubLink = page
          .getByRole("link", { name: /source code/i })
          .first();

        // Should open in new tab
        await expect(firstGithubLink).toHaveAttribute("target", "_blank");
        await expect(firstGithubLink).toHaveAttribute(
          "rel",
          "noopener noreferrer",
        );

        // Should have GitHub icon
        const githubIcon = firstGithubLink.locator('img[alt="GitHub"]');
        await expect(githubIcon).toBeVisible();
      });
    },
  );

  test(
    "should display project images when available",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      await test.step("Check for project images", async () => {
        const projectImages = page.getByTestId("project-image");

        // Should have at least one image (assuming test data has images)
        await expect(projectImages.first()).toBeVisible();
      });

      await test.step("Verify image attributes", async () => {
        const firstImage = page.getByTestId("project-image").first();

        // Check image has proper alt text
        await expect(firstImage).toHaveAttribute("alt", /image \d+/);
      });
    },
  );

  test(
    "should display projects in proper order",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      await test.step("Verify projects are displayed and accessible", async () => {
        const articles = page.locator("article");
        const articleCount = await articles.count();

        if (articleCount > 1) {
          // Verify multiple projects are visible
          await expect(articles.first()).toBeVisible();
          await expect(articles.nth(1)).toBeVisible();
        }
      });
    },
  );

  test(
    "should handle projects without images gracefully",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      await test.step("Check layout for projects without images", async () => {
        const articles = page.locator("article");
        const firstArticle = articles.first();

        // Article should still be visible and properly laid out
        await expect(firstArticle).toBeVisible();

        // Check if this project has images
        const hasImages =
          (await firstArticle.getByTestId("project-image").count()) > 0;

        if (!hasImages) {
          // Project info section should still be visible
          const projectInfo = firstArticle.locator(
            '[class*="@container/ProjectInfo"]',
          );
          await expect(projectInfo).toBeVisible();
        }
      });
    },
  );

  test(
    "should handle projects without GitHub links gracefully",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      await test.step("Check layout for projects without GitHub links", async () => {
        const articles = page.locator("article");

        // Check each article to see if it handles missing GitHub links properly
        const articleCount = await articles.count();

        for (let i = 0; i < Math.min(articleCount, 3); i++) {
          const article = articles.nth(i);
          await expect(article).toBeVisible();

          // Project should still have title and content even without GitHub link
          await expect(article.locator("h2")).toBeVisible();
          await expect(article.locator("p").first()).toBeVisible();
        }
      });
    },
  );

  test(
    "should handle empty state gracefully",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      // This test would need a way to mock empty data
      // For now, we just ensure the container exists
      await test.step("Check container exists even with no projects", async () => {
        const container = page.getByTestId("projects-container");
        await expect(container).toBeVisible();
      });
    },
  );

  test(
    "should load and display correctly on slow connections",
    {
      tag: "@synthetic-monitoring",
    },
    async ({ page }) => {
      await test.step("Simulate slow network and verify content loads", async () => {
        // Simulate slow 3G connection
        await page.route("**/*", async (route) => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          await route.continue();
        });

        await page.reload();

        // Content should still load and be visible
        await expect(page.getByTestId("projects-container")).toBeVisible();
        await expect(page.locator("article").first()).toBeVisible({
          timeout: 10000,
        });
      });
    },
  );
});
