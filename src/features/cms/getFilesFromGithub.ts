import matter from "gray-matter";
import { sanitizeContent } from "@/features/cms/utils/sanitizeContent";

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.CMS_TOKEN}`,
};

type File = {
  path: string;
  sha: string;
  url: string;
};
type TreeData = {
  tree: Array<File>;
};
export async function getFilesFromGithub(path: string) {
  // Take the CMS_URL and break it into baseUrl and defaultBranch
  const [baseUrl, defaultBranch] = process.env.CMS_URL.split("/git/trees/");
  const files = (
    await getFilesFromGithubSha(
      `${baseUrl}/git/trees`,
      defaultBranch,
      path.split("/"),
    )
  ).filter((file) => file.path.endsWith(".md"));

  if (!files) {
    console.error("No files found");
    return [];
  }
  return await toJSON(files);
}

// Recursively get the files from a given sha
async function getFilesFromGithubSha(
  baseUrl: string,
  sha: string,
  path: string[],
) {
  const response = await fetch(`${baseUrl}/${sha}`, { headers });
  const data: TreeData = await response.json();

  // If we've reached the end of the path, return the data
  if (path.length === 0) {
    return data.tree;
  }
  const newSha = data.tree.find((file) => file.path === path[0])?.sha;
  if (!newSha) {
    console.error(`Path not found: ${path[0]}`);
    return [];
  }
  return getFilesFromGithubSha(baseUrl, newSha, path.slice(1));
}

async function toJSON(files: File[]) {
  return Promise.all(
    files.map(async (file) => {
      const response = await fetch(file.url, { headers });
      const data = await response.json();
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      const sanitizedContent = sanitizeContent(content);
      return matter(sanitizedContent);
    }),
  );
}
