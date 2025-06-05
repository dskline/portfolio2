---
applyTo: '*.md'
---

# Markdown Documentation Standards

This document outlines the standards and best practices for creating Markdown documentation. Following these guidelines ensures consistency, readability, and maintainability across all documentation.

## Core Principles

-   **Clarity**: Documentation should be clear, concise, and easy to understand for its intended audience.
-   **Structure**: Use consistent heading levels and organization to create a logical information hierarchy.
-   **Completeness**: Cover necessary details without overwhelming the reader with excessive information.
-   **Maintainability**: Format documentation in a way that makes future updates straightforward.

## Document Structure

### Content Sections

-   **Introduction**: Begin each document with a brief overview that explains its purpose and scope.
-   **Table of Contents**: For documents longer than 500 words, include an auto-generated or manual table of contents at the top.
-   **Related Documentation**: When applicable, include links to related documents at the end.
-   **No Concluding Statements**: Avoid using concluding or closing statements at the end of documents. End with substantive content rather than summary statements.

## Formatting Guidelines

### Code Blocks

-   **Syntax Highlighting**: Always specify the language for code blocks to enable syntax highlighting.
-   **Context**: Provide sufficient context before code examples to explain their purpose.
-   **Annotations**: Use comments within code to highlight important aspects.

Example:
```typescript
// Initialize the configuration object
const config = {
  theme: 'dark',
  animations: true
};

// Apply configuration
applyTheme(config);
```

### Links and References

-   **Descriptive Text**: Use descriptive link text rather than generic phrases like "click here".
-   **Internal Links**: Use relative paths for links to other project documents.
-   **External Links**: For external resources, use descriptive link text and consider adding a brief explanation.
-   **API References**: When referencing APIs, link to the respective API documentation.

Example:
```markdown
Read more about feature specifications in our [feature guide](./feature-spec.instructions.md)
```

## Content Best Practices

### Language and Tone

-   **Consistency**: Maintain consistent terminology throughout the documentation.
-   **Active Voice**: Prefer active voice over passive voice for clearer, more direct instructions.
-   **Present Tense**: Use present tense rather than future or past tense when possible.
-   **Second Person**: Address the reader directly using "you" rather than "the user" or "one".

### Technical Documentation

-   **Prerequisites**: Clearly state any prerequisites or dependencies at the beginning.
-   **Step-by-Step Instructions**: Number steps for procedures and keep each step focused on a single action.
-   **Examples**: Include practical examples that demonstrate real-world usage.
-   **Error Handling**: Document common errors and their solutions.
-   **Parameters and Returns**: For API documentation, clearly describe parameters, return values, and types.

Example:
```markdown
## Installation

Before installing, ensure you have:
- Node.js v18 or higher
- npm v9 or higher

1. Clone the repository:
   ```bash
   git clone https://github.com/organization/project.git
   ```
2. Install dependencies:
   ```bash
   cd project
   npm install
   ```
```

### Visual Elements

-   **Images**: Include screenshots, diagrams, or illustrations when they help clarify concepts.
    -   Always provide alt text for images
    -   Keep images at a reasonable size and resolution
    -   Use dark and light mode versions when applicable
-   **Tables**: Use tables to organize structured data or parameter listings.
-   **Diagrams**: Consider using Mermaid diagrams for workflows, architecture, or other complex relationships.

## Accessibility Considerations

-   **Alt Text**: Always include descriptive alt text for images.
-   **Heading Structure**: Use proper heading hierarchy to support screen readers.
-   **Link Context**: Ensure link text makes sense out of context for screen reader users.
-   **Color Contrast**: Don't rely solely on color to convey information.

## Maintenance Guidelines

-   **Versioning**: For API documentation, clearly indicate which version the document applies to.
-   **Deprecation Notices**: Clearly mark deprecated features and provide migration paths.
-   **Review Cadence**: Establish a regular review schedule to keep documentation current.
