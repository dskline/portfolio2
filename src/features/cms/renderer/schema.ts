import { z } from "zod";

export const baseContentRendererSchema = z.object({
  component: z.string().optional(),
  lexorank: z.string().optional(),
  children: z.any().optional(),
});

export type BaseContentRendererData = z.infer<typeof baseContentRendererSchema>;
