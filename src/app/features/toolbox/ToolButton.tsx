import { clsx } from "clsx";
import type { Tool } from "./schema";

export function ToolButton(tool: Tool) {
  return (
    <a
      key={tool.title}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "border border-transparent rounded-md hover:border-inherit",
        "px-3 py-2 inline-flex items-center justify-center",
      )}
      style={{
        backgroundColor: tool.background,
        color: tool.color,
      }}
    >
      {tool.logo.startsWith("<svg") && tool.logo.indexOf("script") === -1 && (
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: developer is in control of the content
          dangerouslySetInnerHTML={{ __html: tool.logo }}
          style={{
            height: 24,
            width: 24 * Number.parseFloat(tool.logoWidthScale),
          }}
        />
      )}
    </a>
  );
}
