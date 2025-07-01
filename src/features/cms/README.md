## Feature: CMS

A headless content management system that enables dynamic content updates without code deployments. The CMS leverages GitHub as a content repository, allowing content editors to manage markdown files directly through GitHub's interface while providing a seamless content delivery system for the portfolio website.

📖 **[View Detailed Specification](./__docs__/SPEC.md)**

## Usage

The CMS feature provides a simple API for retrieving content from GitHub repositories:

```typescript
import { getFiles } from '@/features/cms';

// Get all markdown files from a specific path
export async function getProjects() {
  const files = await getFiles('content/projects');
  return files.map(file => ({
    slug: file.data.slug,
    title: file.data.title,
    content: file.content,
    ...file.data
  }));
}
```

For retrieving specific content collections:

```typescript
import { getFiles } from '@/features/cms';

export async function getBlogPosts() {
  const posts = await getFiles('content/blog');
  return posts
    .filter(post => post.data.published)
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
}
```

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `CMS_TYPE` | The type of CMS to use | Yes | `github` |
| `CMS_TOKEN` | GitHub personal access token for API authentication | Yes | `ghp_xxxxxxxxxxxxxxxxxxxx` |
| `CMS_URL` | GitHub API URL pointing to the content repository tree | Yes | `https://api.github.com/repos/username/content/git/trees/main` |

### Setup Instructions

1. Create a GitHub personal access token with `repo` permissions
2. Set up a content repository or use an existing one
3. Configure the environment variables to point to your content repository
4. For staging environments, use a different branch in the `CMS_URL` (e.g., `git/trees/preview`)

## Dependencies

| Package | Purpose | Documentation |
|---------|---------|---------------|
| `dompurify` | Sanitizes HTML content to prevent XSS attacks | [Documentation](https://github.com/cure53/DOMPurify) |
| `gray-matter` | Parses markdown frontmatter and content | [Documentation](https://github.com/jonschlinkert/gray-matter) |
| `jsdom` | Provides a DOM-like environment for server-side HTML sanitization | [Documentation](https://github.com/jsdom/jsdom) |