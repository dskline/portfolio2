## Feature: CMS

A headless content management system that enables dynamic content updates without code deployments. The CMS leverages GitHub as a content repository, allowing content editors to manage markdown files directly through GitHub's interface while providing a seamless content delivery system for the portfolio website.

📖 **[View Detailed Specification](./__docs__/SPEC.md)**

## Usage

The CMS feature now provides a unified API for retrieving and validating content from GitHub repositories using Zod schemas:

```typescript
import { getContent } from '@/features/cms/getContent';
import { projectSchema } from '@/features/projects/schema';

// Get all validated project entries from a specific path
export async function getProjects() {
  return getContent('content/projects', projectSchema);
}
```


### Rendering Markdown Content

To render markdown content as HTML, use the `ContentRenderer` component:

```tsx
import { ContentRenderer } from '@/features/cms/renderer/ContentRenderer';

<ContentRenderer content={item.content} />
```

- `ContentRenderer` uses `remark` and `remark-html` to convert markdown to HTML, and sanitizes the output with DOMPurify to prevent XSS attacks.
- For custom rendering, pass a component prop to `ContentRenderer`.

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
| `remark` | Markdown parser for rendering markdown content | [Documentation](https://github.com/remarkjs/remark) |
| `remark-html` | Converts markdown to HTML | [Documentation](https://github.com/remarkjs/remark-html) |