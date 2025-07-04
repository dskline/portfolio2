import { clsx } from "clsx";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import type { Tool } from "@/features/toolbox/getTools";

const { window } = new JSDOM("");
const DOMPurify = createDOMPurify(window);

export function ToolButton(tool: Tool) {
  // Sanitize the SVG logo to prevent XSS attacks
  const sanitizedLogo = DOMPurify.sanitize(tool.logo, {
    // allow all safe SVG elements and SVG Filters, no HTML or MathML
    USE_PROFILES: { svg: true, svgFilters: true },
  });

  return (
    <a
      key={tool.title}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="tool-button"
      aria-label={tool.title}
      className={clsx(
        "inline-flex px-4 py-2.5",
        "rounded-md border-2 border-transparent hocus:border-inherit",
        "bg-gray-200 dark:bg-neutral-800",
      )}
    >
      <div
        className="flex items-center [&>svg]:h-6"
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized SVG */
        dangerouslySetInnerHTML={{ __html: sanitizedLogo }}
      />
    </a>
  );
}
