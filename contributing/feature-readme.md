---
applyTo: '**/features/*/README.md'
---

# Feature README Guidelines

This file should serve as a contributing guide for developers working on this feature.

## Structure

### Header
Start with a level 1 heading that follows the format: `# Feature: [Feature Name]`

Provide a brief user story or description explaining:
- What the feature does from a user's perspective
- The main goal or purpose of the feature

Include a link to the detailed specification:
```markdown
📖 **[View Detailed Specification](./__docs__/SPEC.md)**
```

Display any screenshots or .mp4/.mov files generated by test cases and stored in the `__docs__/` directory. Use the following format:
```markdown
![Screenshot showing the feature's main interface](./__docs__/screenshot.png)
![Video demonstrating the feature's functionality](./__docs__/video.mov)
```

### Usage
If the feature requires specific usage instructions, provide a section with examples such as:

```typescript
// Example of how to use the feature in code
import { FeatureName } from 'path/to/feature';
FeatureName.doSomething();
```

### Environment Variables (if applicable)
If the feature requires environment variables, create a table:

```markdown
## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VAR_NAME` | Description of what this variable does | Yes/No | `example_value` |
```

Include any additional setup instructions or tips for configuring these variables.

### Dependencies (if applicable)
If the feature has specific package dependencies beyond the standard Next.js stack, list them in a table:

```markdown
## Dependencies

| Package | Purpose | Documentation |
|---------|---------|---------------|
| `package-name` | Brief description of why this package is needed | [Link](https://example.com) |
```

Only include dependencies that are needed by this feature and are listed as a dependency in package.json.

Do not include any of the following packages:
- Packages that are part of or included in the standard Next.js stack (e.g., `next`, `react`, `react-dom`)
- Utilities that are commonly used for design purposes (e.g., `clsx`)

## Guidelines
- Keep the README focused on helping developers understand and contribute to the feature
- Use clear, concise language
- Include code examples sparingly, only when they clarify implementation details
- Link to external documentation when referencing third-party packages
- Update the README when adding new environment variables or dependencies

