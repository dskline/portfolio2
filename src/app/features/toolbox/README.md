## Feature: Toolbox

As a portfolio viewer, I would like to see a list of tools used by the candidate.

As the portfolio owner, I would like the ability to edit my toolbox using the CMS feature.

### Nice to haves
- Categorize the tools
- Simple, presentable
- Link to the products

## Implementation Details

1. The system retrieves tool data from markdown files using the CMS feature
2. Each tool's markdown file contains:
   - title: Name of the tool
   - category: Group the tool belongs to (defaults to "Other")
   - url: Link to the tool's website
   - logo: SVG of the tool's logo
3. Tools are grouped by category and displayed in a responsive grid
4. Each tool is rendered as a button that links to its URL
5. The layout uses container queries for responsive design:
   - Category headers scale text size based on container width
   - Tools section switches between 1 and 2 columns based on container width
   - Tool buttons wrap within their container


## Dependencies
- [Feature: CMS](../cms/README.md) to edit tools on the page
- [Zod](https://zod.dev/) to validate and static type the Markdown file objects