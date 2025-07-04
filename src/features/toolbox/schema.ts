import z from "zod";

export const toolSchema = z.object({
  title: z.string(),
  category: z.string().optional(),
  lexorank: z.string().optional(),
  url: z.string(),
  logo: z.string(),
});
export type Tool = z.infer<typeof toolSchema>;
