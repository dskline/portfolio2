import type matter from "gray-matter";
import type { ZodType } from "zod";
import { getFilesFromGithub } from "@/features/cms/getFilesFromGithub";

const CMS_TYPE = process.env.CMS_TYPE;

export async function getContent<T>(
  path: string,
  schema: ZodType<T>,
): Promise<T[]> {
  const files = [];
  if (CMS_TYPE === "github") {
    files.push(...(await getFilesFromGithub(path)));
  } else {
    console.warn(`CMS_TYPE ${CMS_TYPE} not supported`);
    return [];
  }

  return files
    .map((file) => schemaAdapter(file, schema))
    .filter((item) => item !== null)
    .sort((a, b) => {
      if (!a.lexorank && !b.lexorank) return 0;
      if (!a.lexorank) return 1;
      if (!b.lexorank) return -1;
      return a.lexorank.localeCompare(b.lexorank);
    });
}

function schemaAdapter(file: matter.GrayMatterFile<string>, schema: ZodType) {
  const fileData = {
    ...file.data,
    content: file.content, // Raw markdown content
  };
  // Validate frontmatter against schema
  const validation = schema.safeParse(fileData);
  if (!validation.success) {
    console.warn(
      `Validation failed for file: ${fileData}. Errors:`,
      validation.error.errors,
    );
  }
  return validation.success ? validation.data : null;
}
