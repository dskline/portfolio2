import { z } from "zod";

export const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  githubUrl: z.string().optional(),
  url: z.string().optional(),
  date: z.coerce.date(),
  images: z.array(z.string()).optional(),
  children: z.string(),
});
export type Project = z.infer<typeof projectSchema>;
