import { expect, test } from "@playwright/test";

test.describe("Navigation Regression Tests", { tag: ["@regression"] }, () => {
  test("all navigation links work", async ({ page, request }) => {
    await page.goto("/");
    const links = await page.$$eval("nav a[href]", (els) =>
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
      console.debug(`Navigation Link: ${url} - Status: ${response.status()}`);

      expect(response.status(), `Link failed: ${url}`).toBeLessThan(400);
    }
  });
});
