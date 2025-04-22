import { getFiles } from "@/app/features/cms/getFiles";
import { clsx } from "clsx";
import { ToolButton } from "./ToolButton";
import { toolSchema } from "./schema";
import type { Tool } from "./schema";

export async function Toolbox() {
  const tools = await getFiles("Portfolio/CMS/Tools");

  // Group tools by category
  const toolsByCategory = tools.reduce(
    (acc, tool) => {
      const category = tool.data.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(toolSchema.parse(tool.data));
      return acc;
    },
    {} as Record<string, Tool[]>,
  );

  return (
    <div className="@container/Toolbox grid gap-8 p-4">
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <div
          key={category}
          className="grid @md/Toolbox:grid-cols-[minmax(33cqi,1fr)_2fr] gap-4"
        >
          <div className="@container/ToolboxCategory">
            <h2
              className={clsx(
                "uppercase text-gray-300 transition-all duration-500",
                "text-3xl @3xs/ToolboxCategory:text-4xl",
              )}
            >
              {category}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryTools.map((tool) => (
              <ToolButton key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
