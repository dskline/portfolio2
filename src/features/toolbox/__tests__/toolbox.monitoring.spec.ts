import { expect, test } from "@playwright/test";

test(
  "all toolbox links work",
  { tag: "@synthetic-monitoring" },
  async ({ page, request }) => {
    await page.goto("/toolbox");
    const links = await page.$$eval("a[href]", (els) =>
      els.map((e) => (e as HTMLAnchorElement).href),
    );

    // Filter out anchor links and duplicates
    const uniqueLinks = Array.from(new Set(links)).filter(
      (href) => !href.startsWith("#"),
    );

    for (const href of uniqueLinks) {
      const url = href.startsWith("http")
        ? href
        : new URL(href, page.url()).toString();
      const response = await request.get(url);

      expect(response.status(), `Toolbox link failed: ${url}`).toBeLessThan(
        400,
      );
    }
  },
);
