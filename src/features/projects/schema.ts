import { z } from "zod";

export const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  githubUrl: z.string().optional(),
  url: z.string().optional(),
  date: z.date(),
  images: z.array(z.string()).optional(),
  content: z.string(),
});
export type Project = z.infer<typeof projectSchema>;
