import clsx from "clsx";
import { ToolButton } from "@/features/toolbox/components/SanitizedToolButton";
import type { Tool } from "@/features/toolbox/schema";

export async function Toolbox({ tools }: { tools: Tool[] }) {
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
    <div className="@container/Toolbox mx-auto grid gap-10 px-4 py-16 md:w-3/4">
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <div
          key={category}
          className="grid @md/Toolbox:grid-cols-[minmax(33cqi,1fr)_2fr] gap-4"
        >
          <div className="@container/ToolboxCategory">
            <h2
              className={clsx(
                "uppercase transition-all duration-500 dark:text-gray-300",
                "@3xs/ToolboxCategory:text-4xl text-3xl",
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
