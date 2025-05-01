## Feature: CMS

As the portfolio owner, I would like to have the ability to quickly edit often-changing components on my website.

### Nice to haves
- Use existing tools rather than a separate CMS platform
- Easily make edits with any device (i.e. phone)
- Preview changes before publishing
- Ability to revert changes

## Implementation Details

1. The system authenticates with GitHub using a personal access token
2. Content is retrieved from specified paths in a given GitHub repository
3. Markdown files are parsed and converted to JSON with frontmatter

## Environment Variables

The following environment variables are required:

- `CMS_TYPE`: The type of CMS to use (currently supports "github")
- `CMS_TOKEN`: GitHub access token for authentication
- `CMS_URL`: The GitHub repo containing markdown files (format: https://api.github.com/repos/{owner}/{repo}/git/trees/{branch})

> TIP: For previewing changes, set a staging environment to use a CMS_URL with a branch other than "main"

Example `.env` configuration:
```
CMS_TYPE=github
CMS_TOKEN=your_github_personal_access_token
CMS_URL=https://api.github.com/repos/yourusername/yourrepo/git/trees/preview
```

## Dependencies
- [gray-matter](https://github.com/jonschlinkert/gray-matter) to parse the Markdown content's frontmatter