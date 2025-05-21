/**
 * A lightweight SVG sanitizer that returns a sanitized version of the SVG string
 * This removes potentially harmful script tags and event handlers
 */
export function sanitizeSvg(svg: string): string {
  // Remove script tags
  let sanitized = svg.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );

  // Remove event handlers (on*)
  sanitized = sanitized.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*')/gi, "");

  // Remove javascript: URLs
  sanitized = sanitized.replace(
    /\shref\s*=\s*["']?javascript:/gi,
    ' href="removed"',
  );

  // Allow SVG tags and common attributes
  return sanitized;
}
