import { z } from "zod";
import { getFiles } from "@/features/cms/getFiles";

const toolSchema = z.object({
  title: z.string(),
  category: z.string().optional(),
  lexorank: z.string().optional(),
  url: z.string(),
  logo: z.string(),
});
export type Tool = z.infer<typeof toolSchema>;

export const getTools = async () => {
  const tools = await getFiles("Portfolio/CMS/Tools");

  return tools
    .map((tool) => {
      const parsedTool = toolSchema.safeParse(tool.data);
      if (!parsedTool.success) {
        console.debug("Invalid tool data:", parsedTool.error);
        return null;
      }
      return parsedTool.data;
    })
    .filter((tool): tool is Tool => tool !== null);
};
