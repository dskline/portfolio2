import { getContent } from "@/features/cms/getContent";
import { Projects } from "@/features/projects/Projects";
import { projectSchema } from "@/features/projects/schema";

export default async function ProjectsPage() {
  const projects = await getContent("Portfolio/CMS/Projects", projectSchema);

  return (
    <div className="p-8">
      <Projects projects={projects} />
    </div>
  );
}
