# Feature: Toolbox

A comprehensive showcase of my technical skills and tools, presenting an interactive grid of technologies I work with. Users can explore different categories of tools (frontend, backend, design, etc.) with visual icons and descriptions to understand my technical expertise at a glance.

📖 **[View Detailed Specification](./__docs__/SPEC.md)**

## Development Tips

### Using Storybook for ToolButton Design
Use Storybook to develop and test ToolButton components with different configurations:

```bash
pnpm run storybook
```

Navigate to `Features/Toolbox/ToolButton` to:
- Experiment with background colors (light and dark mode)
- Edit and preview SVG logos

### Tool Configuration Front Matter
When adding new tools, use this YAML front matter structure:

```yaml
---
title: "Next.js"
url: "https://nextjs.org"
category: "Frontend"
logo: |
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 104">
    <!-- SVG content here -->
  </svg>
description: "React framework for production"
lexorank: m
---
```

**Front Matter Fields:**
- `title`: Display name of the tool
- `url`: Official website or documentation link
- `category`: Group tools by type (Frontend, Backend, Design, etc.)
- `logo`: Inline SVG or path to logo file
- `description`: Brief description for tooltips/accessibility
- `lexorank`: Manual ordering within categories

## Dependencies

| Package | Purpose | Documentation |
|---------|---------|---------------|
| `@/features/cms` | Content management system for managing tool data and configurations | [CMS Feature](../cms/README.md) |
| `zod` | Schema validation for tool data and configuration | [Documentation](https://zod.dev) |
