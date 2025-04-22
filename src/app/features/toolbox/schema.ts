import { z } from "zod";

export const toolSchema = z.object({
  title: z.string(),
  url: z.string(),
  logo: z.string(),
  logoWidthScale: z.string(),
  background: z.string(),
  color: z.string(),
});
export type Tool = z.infer<typeof toolSchema>;
