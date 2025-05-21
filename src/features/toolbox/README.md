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
   - lexorank: For sorting
   - url: Link to the tool's website
   - logo: SVG markup for the tool's logo
3. Tools are grouped by category and displayed in a responsive grid
4. Each tool is rendered as a button that links to its URL
5. The layout uses container queries for responsive design:
   - Category headers scale text size based on container width
   - Tools section switches between 1 and 2 columns based on container width
   - Tool buttons wrap within their container

### Future Considerations

Finding the right SVG can be difficult, as we want both the icon and the watermark logo beside it in the same pattern. After finding the right SVG, it's often required to modify the HTML - to remove width/height attributes and replace fills with `"currentColor"`. A standard library would be nice, but does not appear to exist at this time.

## Dependencies
- [Zod](https://zod.dev/) to validate and static type the Markdown file objects
