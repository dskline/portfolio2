/**
 * A lightweight HTML/content sanitizer for CMS content
 * Removes potentially harmful script tags, event handlers, and dangerous elements
 * while preserving safe HTML tags and attributes for content rendering
 */
export function sanitizeContent(content: string): string {
  if (!content || typeof content !== "string") {
    return "";
  }

  let sanitized = content;

  // Remove script tags and their content
  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );

  // Remove all event handlers (on*)
  sanitized = sanitized.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*')/gi, "");

  // Remove javascript: URLs from all attributes
  sanitized = sanitized.replace(
    /\s(?:href|src|action|formaction|data)\s*=\s*"javascript:[^"]*"/gi,
    ' data-removed="javascript-url"',
  );
  sanitized = sanitized.replace(
    /\s(?:href|src|action|formaction|data)\s*=\s*'javascript:[^']*'/gi,
    ' data-removed="javascript-url"',
  );

  // Remove vbscript: URLs
  sanitized = sanitized.replace(
    /\s(?:href|src|action|formaction|data)\s*=\s*"vbscript:[^"]*"/gi,
    ' data-removed="vbscript-url"',
  );
  sanitized = sanitized.replace(
    /\s(?:href|src|action|formaction|data)\s*=\s*'vbscript:[^']*'/gi,
    ' data-removed="vbscript-url"',
  );

  // Remove data URLs that could contain scripts (keep images)
  sanitized = sanitized.replace(
    /\s(?:href|src|action|formaction)\s*=\s*["']?data:(?!image\/)[^"']*/gi,
    ' data-removed="data-url"',
  );

  // Remove potentially dangerous HTML tags
  const dangerousTags = [
    "script",
    "iframe",
    "embed",
    "object",
    "applet",
    "form",
    "input",
    "textarea",
    "button",
    "select",
    "option",
    "meta",
    "link",
    "style",
    "base",
    "frame",
    "frameset",
    "noframes",
  ];

  for (const tag of dangerousTags) {
    // Remove opening and closing tags with any attributes
    const tagRegex = new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi");
    sanitized = sanitized.replace(tagRegex, "");
  }

  // Remove HTML comments that could contain malicious content
  sanitized = sanitized.replace(/<!--[\s\S]*?-->/gi, "");

  // Remove any remaining dangerous protocols (except data URLs for images)
  sanitized = sanitized.replace(
    /\s(?:href|src|action|formaction|data)\s*=\s*["']?(?:file|ftp):[^"'\s>]*/gi,
    ' data-removed="dangerous-protocol"',
  );

  return sanitized.trim();
}

/**
 * Sanitizes all string properties of a content item
 * This ensures that any user-generated content from the CMS is safe
 */
export function sanitizeContentItem<T extends Record<string, unknown>>(
  item: T,
): T {
  const sanitized = { ...item };

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === "string") {
      // Apply content sanitization to string values
      sanitized[key as keyof T] = sanitizeContent(value) as T[keyof T];
    }
  }

  return sanitized;
}
