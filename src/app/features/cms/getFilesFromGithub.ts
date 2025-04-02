type TreeData = {
  tree: Array<{
    path: string;
    sha: string;
  }>;
};
export async function getFilesFromGithub(path: string) {
  // Take the CMS_URL and break it into baseUrl and defaultBranch
  const [baseUrl, defaultBranch] = process.env.CMS_URL.split("/git/trees/");
  const files = getFilesFromGithubSha(
    `${baseUrl}/git/trees`,
    defaultBranch,
    path.split("/"),
  );
  // TODO: Convert the markdown files into JSON format
  return files;
}

// Recursively get the files from a given sha
async function getFilesFromGithubSha(
  baseUrl: string,
  sha: string,
  path: string[],
) {
  const response = await fetch(`${baseUrl}/${sha}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.CMS_TOKEN}`,
    },
  });
  const data: TreeData = await response.json();

  // If we've reached the end of the path, return the data
  if (path.length === 0) {
    return data;
  }
  const newSha = data.tree.find((file) => file.path === path[0])?.sha;
  if (!newSha) {
    console.error(`Path not found: ${path[0]}`);
    return [];
  }
  return getFilesFromGithubSha(baseUrl, newSha, path.slice(1));
}
