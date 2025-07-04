import { getContent } from "@/features/cms/getContent";
import { Toolbox } from "@/features/toolbox/components/Toolbox";
import { toolSchema } from "@/features/toolbox/schema";

export default async function ToolboxPage() {
  const tools = await getContent("Portfolio/CMS/Tools", toolSchema);
  return <Toolbox tools={tools} />;
}
