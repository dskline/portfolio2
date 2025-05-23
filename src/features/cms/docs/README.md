# Feature: CMS

As the portfolio owner, I want to have the ability to quickly edit often-changing components on my website so that I can maintain an up-to-date portfolio without requiring code changes.

## Must-Have Requirements (MVP)

- GitHub-based content management system
- Content retrieval from specified paths in a GitHub repository
- Markdown parsing with frontmatter support
- Authentication with GitHub using personal access token

## Enhancements

- Use existing tools rather than a separate CMS platform
- Easily make edits with any device (i.e. phone)
- Preview changes before publishing
- Ability to revert changes

## Implementation Details

The CMS implementation leverages GitHub as a content repository, allowing for easy editing, versioning, and management of website content. This approach eliminates the need for a dedicated CMS platform while providing robust content management capabilities.

The implementation follows these steps:

1. The system authenticates with GitHub using a personal access token
2. Content is retrieved from specified paths in a given GitHub repository
3. Markdown files are parsed and converted to JSON with frontmatter
4. The parsed content is served to the website components

### Content Management Workflow

For content updates:
1. Edit markdown files in the GitHub repository
2. For preview, push changes to a non-main branch
3. For production, merge changes to the main branch
4. The website automatically uses the latest content from the configured branch

## UI/Visual Design

The CMS is primarily a headless system with no custom admin interface. Instead, it leverages GitHub's existing UI for content management.

### Key UI Elements

- **GitHub Repository Interface**: Content editors use GitHub's web interface or GitHub Desktop application to edit markdown files
- **Markdown Files**: Structured with frontmatter for metadata and markdown content for the body
- **Preview Environment**: A staging version of the site that pulls content from a non-main branch

### User Interaction Patterns

- **Content Creation**: Create new markdown files in the appropriate repository path
- **Content Editing**: Edit existing markdown files either through GitHub's web editor or by cloning the repository locally
- **Content Organization**: Files are organized in a folder structure that mirrors the website's content hierarchy
- **Publication Flow**: Changes move from draft (local) → review (branch) → published (main branch)

### Accessibility

- Leverages GitHub's accessibility features for content editing
- No additional accessibility considerations required for the CMS implementation itself

## Environment Variables

| Variable Name | Purpose | Required | Default |
|---------------|---------|----------|---------|
| `CMS_TYPE` | The type of CMS to use | Yes | "github" |
| `CMS_TOKEN` | GitHub access token for authentication | Yes | - |
| `CMS_URL` | The GitHub repo containing markdown files | Yes | - |

> TIP: For previewing changes, set a staging environment to use a CMS_URL with a branch other than "main"

Example `.env` configuration:
```
CMS_TYPE=github
CMS_TOKEN=your_github_personal_access_token
CMS_URL=https://api.github.com/repos/yourusername/yourrepo/git/trees/preview
```

## Dependencies

### Package Dependencies
- [gray-matter](https://github.com/jonschlinkert/gray-matter): Parses the Markdown content's frontmatter