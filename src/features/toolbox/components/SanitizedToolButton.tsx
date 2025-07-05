import { UnsanitizedToolButton } from "@/features/toolbox/components/UnsanitizedToolButton";
import type { Tool } from "@/features/toolbox/schema";

async function getPurify() {
  if (typeof window === "undefined") {
    const { default: DOMPurify } = await import("dompurify");
    const { JSDOM } = await import("jsdom");
    return DOMPurify(new JSDOM("").window);
  } else {
    const { default: DOMPurify } = await import("dompurify");
    return DOMPurify;
  }
}
export async function SanitizedToolButton(tool: Tool) {
  const purify = await getPurify();
  // Sanitize the SVG logo to prevent XSS attacks
  const sanitizedLogo = purify.sanitize(tool.logo, {
    // allow all safe SVG elements and SVG Filters, no HTML or MathML
    USE_PROFILES: { svg: true, svgFilters: true },
  });

  return <UnsanitizedToolButton {...tool} logo={sanitizedLogo} />;
}
export const ToolButton = SanitizedToolButton;
