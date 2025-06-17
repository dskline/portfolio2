import { Projects } from "@/features/projects/Projects";
import { getProjects } from "@/features/projects/getProjects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-8">
      <Projects projects={projects} />
    </div>
  );
}
