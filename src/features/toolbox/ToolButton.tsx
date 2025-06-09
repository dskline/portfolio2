import type { Tool } from "@/features/toolbox/getTools";
import { sanitizeSvg } from "@/features/toolbox/sanitizeSvg";
import { clsx } from "clsx";

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
