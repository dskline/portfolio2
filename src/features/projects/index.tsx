import { getProjects } from "@/features/projects/getProjects";
import { Projects } from "@/features/projects/Projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-8">
      <Projects projects={projects} />
    </div>
  );
}
