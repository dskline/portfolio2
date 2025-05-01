import { clsx } from "clsx";
import { ToolButton } from "./ToolButton";
import { getTools } from "./getTools";
import type { Tool } from "./getTools";

export async function Toolbox() {
  const tools = await getTools();

  // Group tools by category
  const toolsByCategory = tools.reduce(
    (acc, tool) => {
      const category = tool.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tool);
      return acc;
    },
    {} as Record<string, Tool[]>,
  );

  return (
    <div className="@container/Toolbox grid gap-8 p-4">
      {Object.entries(toolsByCategory)
        .sort()
        .map(([category, categoryTools]) => (
          <div
            key={category}
            className="grid @md/Toolbox:grid-cols-[minmax(33cqi,1fr)_2fr] gap-4"
          >
            <div className="@container/ToolboxCategory">
              <h2
                className={clsx(
                  "uppercase dark:text-gray-300 transition-all duration-500",
                  "text-3xl @3xs/ToolboxCategory:text-4xl",
                )}
              >
                {category}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categoryTools.map((tool) => (
                <ToolButton key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
