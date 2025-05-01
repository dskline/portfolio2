import { getFiles } from "@/features/cms/getFiles";

export default async function Page() {
  const projects = await getFiles("Portfolio/CMS/Projects");
  // TODO: Render the projects
  return <>{JSON.stringify(projects)}</>;
}
