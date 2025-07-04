import { getContent } from "@/features/cms/getContent";
import { toolSchema } from "@/features/toolbox/getTools";
import { Toolbox } from "@/features/toolbox/Toolbox";

export default async function ToolboxPage() {
  const tools = await getContent("Portfolio/CMS/Tools", toolSchema);
  return <Toolbox tools={tools} />;
}
