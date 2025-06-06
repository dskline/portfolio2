import { clsx } from "clsx";
import type { Tool } from "./getTools";
import { sanitizeSvg } from "./sanitizeSvg";

export function ToolButton(tool: Tool) {
  const sanitizedLogo = sanitizeSvg(tool.logo);

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
        "rounded-md border-2 border-transparent hover:border-inherit",
        "bg-indigo-100 dark:bg-gray-800",
        "transition-colors duration-200",
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
