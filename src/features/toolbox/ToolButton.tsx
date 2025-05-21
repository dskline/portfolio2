import { clsx } from "clsx";
import type { Tool } from "./getTools";

export function ToolButton(tool: Tool) {
  return (
    <a
      key={tool.title}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="tool-button"
      className={clsx(
        "px-4 py-2.5 border-2 border-transparent hover:border-inherit rounded-md",
        "bg-indigo-100 dark:bg-gray-800",
        "transition-colors duration-200",
      )}
    >
      <div
        className="flex items-center [&>svg]:h-6"
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted source (me) */
        dangerouslySetInnerHTML={{ __html: tool.logo }}
      />
    </a>
  );
}
