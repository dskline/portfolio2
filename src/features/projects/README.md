# Feature: Projects

A portfolio showcase feature that displays project information in a visually appealing layout with interactive image galleries. Users can browse through projects sorted by date, view project descriptions, and access source code repositories through GitHub links.

📖 **[View Detailed Specification](./__docs__/SPEC.md)**

## Usage

The Projects feature is designed to be used as a standalone page component that automatically fetches and displays project data from the CMS.

```typescript
// Example usage in a page
import ProjectsPage from '@/features/projects';

export default function Page() {
  return <ProjectsPage />;
}
```

The feature automatically:
- Fetches project data using `getProjects()`
- Sorts projects by date (newest first)
- Renders projects with responsive grid layouts
- Displays project images with shuffle effect and hover interactions
- Shows GitHub links when available

## Dependencies

| Package | Purpose | Documentation |
|---------|---------|---------------|
| `gray-matter` | Parsing project markdown files with frontmatter | [GitHub](https://github.com/jonschlinkert/gray-matter) |
| `zod` | Runtime type validation for project data | [Zod Docs](https://zod.dev/) |
