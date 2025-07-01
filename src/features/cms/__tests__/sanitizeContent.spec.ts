import { expect, test } from "@playwright/test";
import { sanitizeContent } from "@/features/cms/utils/sanitizeContent";

test.describe("sanitizeContent", { tag: ["@smoke"] }, () => {
  test("should remove script tags", () => {
    const maliciousContent =
      '<p>Hello</p><script>alert("xss")</script><p>World</p>';
    const result = sanitizeContent(maliciousContent);
    expect(result).toBe("<p>Hello</p><p>World</p>");
  });

  test("should remove event handlers", () => {
    const maliciousContent =
      '<div onclick="alert(\'xss\')" onmouseover="steal()">Content</div>';
    const result = sanitizeContent(maliciousContent);
    expect(result).toBe("<div>Content</div>");
  });

  test("should remove javascript: URLs", () => {
    const maliciousContent = "<a href=\"javascript:alert('xss')\">Click me</a>";
    const result = sanitizeContent(maliciousContent);
    expect(result).toBe('<a data-removed="javascript-url">Click me</a>');
  });

  test("should remove vbscript: URLs", () => {
    const maliciousContent = "<a href=\"vbscript:msgbox('xss')\">Click me</a>";
    const result = sanitizeContent(maliciousContent);
    expect(result).toBe('<a data-removed="vbscript-url">Click me</a>');
  });

  test("should remove dangerous HTML tags", () => {
    const maliciousContent = `
      <p>Safe content</p>
      <iframe src="evil.com"></iframe>
      <form><input type="text"></form>
      <script>alert('xss')</script>
      <h1>More safe content</h1>
    `;
    const result = sanitizeContent(maliciousContent);
    expect(result).toContain("<p>Safe content</p>");
    expect(result).toContain("<h1>More safe content</h1>");
    expect(result).not.toContain("<iframe");
    expect(result).not.toContain("<form");
    expect(result).not.toContain("<input");
    expect(result).not.toContain("<script");
  });

  test("should preserve safe markdown/HTML", () => {
    const safeContent = `
      <h1>Title</h1>
      <p>Paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      <img src="/safe-image.jpg" alt="Safe image" />
    `;
    const result = sanitizeContent(safeContent);
    expect(result).toContain("<h1>Title</h1>");
    expect(result).toContain("<strong>bold</strong>");
    expect(result).toContain("<em>italic</em>");
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>");
    expect(result).toContain('<img src="/safe-image.jpg"');
  });

  test("should handle empty or invalid input", () => {
    expect(sanitizeContent("")).toBe("");
    // @ts-expect-error - Testing invalid input types for robustness
    expect(sanitizeContent(null)).toBe("");
    // @ts-expect-error - Testing invalid input types for robustness
    expect(sanitizeContent(undefined)).toBe("");
    // @ts-expect-error - Testing invalid input types for robustness
    expect(sanitizeContent(123)).toBe("");
  });

  test("should remove HTML comments", () => {
    const contentWithComments =
      "<p>Hello</p><!-- This is a comment --><p>World</p>";
    const result = sanitizeContent(contentWithComments);
    expect(result).toBe("<p>Hello</p><p>World</p>");
  });

  test("should preserve image data URLs but remove other data URLs", () => {
    const content = `
      <img src="data:image/png;base64,abc123" alt="Safe image" />
      <a href="data:text/html,<script>alert('xss')</script>">Malicious link</a>
    `;
    const result = sanitizeContent(content);
    expect(result).toContain("data:image/png;base64,abc123");
    expect(result).toContain('data-removed="data-url"');
    expect(result).not.toContain("data:text/html");
  });
});
