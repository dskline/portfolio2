import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { UnsanitizedToolButton } from "@/features/toolbox/components/UnsanitizedToolButton";
import type { Tool } from "@/features/toolbox/schema";

const purify =
  typeof window === "undefined" ? DOMPurify(new JSDOM("").window) : DOMPurify;

export function SanitizedToolButton(tool: Tool) {
  // Sanitize the SVG logo to prevent XSS attacks
  const sanitizedLogo = purify.sanitize(tool.logo, {
    // allow all safe SVG elements and SVG Filters, no HTML or MathML
    USE_PROFILES: { svg: true, svgFilters: true },
  });

  return <UnsanitizedToolButton {...tool} logo={sanitizedLogo} />;
}
export const ToolButton = SanitizedToolButton;
