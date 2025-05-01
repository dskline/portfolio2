import { z } from "zod";
import { getFiles } from "../cms/getFiles";
import { getBrand } from "./brand/getBrand";

const toolSchema = z.object({
  title: z.string(),
  category: z.string().optional(),
  lexorank: z.string().optional(),
  brandfetchId: z.string(),
  brandfetchIgnore: z.array(z.string()).optional(), // example: ["dark.color", "light.icon"]
});
type UnprocessedTool = z.infer<typeof toolSchema>;

export const getTools = async () => {
  const tools = await getFiles("Portfolio/CMS/Tools");
  const toolsWithBrand: Tool[] = [];
  for (const tool of tools) {
    const parsedTool = toolSchema.parse(tool.data);
    const toolWithBrand = await attachBrand(parsedTool);
    toolsWithBrand.push(toolWithBrand);
  }
  return toolsWithBrand;
};

const attachBrand = async (tool: UnprocessedTool) => {
  const brand = await getBrand(tool.brandfetchId);
  return {
    ...tool,
    brand,
  };
};
export type Tool = UnprocessedTool & {
  brand: Awaited<ReturnType<typeof getBrand>>;
};
