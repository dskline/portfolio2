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
   - brandfetchId: For retrieving tool data like logo and url
3. Tools are grouped by category and displayed in a responsive grid
4. Each tool is rendered as a button that links to its URL
5. The layout uses container queries for responsive design:
   - Category headers scale text size based on container width
   - Tools section switches between 1 and 2 columns based on container width
   - Tool buttons wrap within their container

## Brandfetching

The system uses Brandfetch API to retrieve and process logos for each tool:

1. Logos are processed to support both light and dark themes
2. For each tool, the system:
   - Retrieves brand colors and logos from Brandfetch
   - Processes the smallest available logo format for optimal performance
   - Handles theme-specific logo assignments
   - Supports ignoring specific logo types through `brandfetchIgnore` configuration
3. Logo processing is done through the `logoDecider.ts` module which:
   - Generates theme-specific logo configurations
   - Handles color assignments for both themes
   - Manages logo type assignments (icon, logo, symbol, banner)

### Limitations

1. Cost/Rate limiting: Brandfetch API has rate limits (100 fetches every 10 days on the free tier). Therefore, NextJS only invalidates the cache every 10 days. It's not expected that 100 tools will be added in the future, but considerations will need to be made if the same API token is used in another project.
2. Logo inconsistency: Some logos include their brand's icon, causing duplicate icons to display. In these cases, the icon must be individually removed.
3. No SVG support: Even when an SVG source is provided from Brandfetch, the SVG is not editable due to image tag wrapping. Consider a different API source for better customization.
4. Dark theme support: Not all retrieved icons/logos may have proper dark theme variants. In these cases, the logos may have to be individually removed so that the theme-friendly fallback title is displayed.

## Environment Variables

The following environment variables are required:

- `BRANDFETCH_TOKEN`: Access token for Brandfetch API

## Dependencies
- [Feature: CMS](../cms/README.md) to edit tools on the page
- [Feature: Cache](../cache/README.md) to cache brandfetch results
- [Zod](https://zod.dev/) to validate and static type the Markdown file objects
- [lodash.set](https://lodash.com/docs/4.17.15#set) for safe object property assignment
- [OpenAPI TypeScript](https://github.com/drwpow/openapi-typescript) for generating TypeScript types from the Brandfetch API specification
