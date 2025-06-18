import { z } from "zod";
import { getFiles } from "@/features/cms/getFiles";

const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  githubUrl: z.string().optional(),
  url: z.string().optional(),
  date: z.date(),
  images: z.array(z.string()).optional(),
  content: z.string(),
});
export type Project = z.infer<typeof projectSchema>;

export const getProjects = async () => {
  const projects = await getFiles("Portfolio/CMS/Projects");

  return projects
    .map((project) => {
      const parsedProject = projectSchema.safeParse({
        ...project.data,
        content: project.content,
      });
      if (!parsedProject.success) {
        console.debug("Invalid project data:", parsedProject.error);
        return null;
      }
      return parsedProject.data;
    })
    .filter((project): project is Project => project !== null);
};
