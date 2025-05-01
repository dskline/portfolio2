import { getFilesFromGithub } from "./getFilesFromGithub";

const CMS_TYPE = process.env.CMS_TYPE;

export async function getFiles(path: string) {
  if (CMS_TYPE === "github") {
    return getFilesFromGithub(path);
  }
  console.warn(`CMS_TYPE ${CMS_TYPE} not supported`);
  return [];
}
