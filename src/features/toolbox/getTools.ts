import { z } from "zod";
import { getContent } from "@/features/cms/getContent";

export const toolSchema = z.object({
  title: z.string(),
  category: z.string().optional(),
  lexorank: z.string().optional(),
  url: z.string(),
  logo: z.string(),
});
export type Tool = z.infer<typeof toolSchema>;

export const getTools = async () => {
  return await getContent("Portfolio/CMS/Tools", toolSchema);
};
