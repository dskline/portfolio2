# Scope Documentation Guide
This guide outlines the standard format and content requirements for feature scope documentation. Following this structure ensures comprehensive, consistent, and maintainable task tracking across all features in the project.

## Introduction

Scope documents serve as the primary implementation roadmap for features, breaking down complex specifications into manageable, actionable tasks. Each feature should have a dedicated SCOPES.md file that follows this standardized format.

## Document Structure

### 1. Feature Title

Begin with a clear title that matches the feature name from the specification:

```markdown
# Scope for Feature: [Feature Name]
```

### 2. Scopes and Tasks Section

Organize implementation work into logical scopes (high-level goals) and break each scope down into specific tasks.

```markdown
## Scopes and Tasks

### SCOPE_1: [Scope Name]
- [x] Task description (#SCOPE_1_a)
- [ ] Task description (#SCOPE_1_b)
- [ ] Task description (#SCOPE_1_c)

### SCOPE_2: [Scope Name]
- [ ] Task description (#SCOPE_2_a)
  - **Depends on**: #SCOPE_1_a, #SCOPE_1_b
- [ ] Task description (#SCOPE_2_b)
  - **Depends on**: #SCOPE_2_a
```

## Task Numbering Pattern

Tasks are numbered using a combination of the Scope ID and a letter suffix:

- **Scope Format**: `SCOPE_<number>` (e.g., SCOPE_1, SCOPE_2, SCOPE_3)
- **Task Format**: `#SCOPE_<number>_<letter>` (e.g., #SCOPE_1_a, #SCOPE_1_b, #SCOPE_2_a)

This pattern provides:
- Clear scope grouping
- Unique task identification
- Alphabetical ordering within scopes
- Easy cross-referencing in code comments and documentation

### Scope Numbering Guidelines

- **Always start with SCOPE_1** for initialization and documentation
- **Use sequential numbering** (SCOPE_2, SCOPE_3, etc.) for implementation phases
- **Use `{FINAL_SCOPE_NUMBER}` placeholder** in templates to indicate the final scope should be numbered based on the total number of scopes for the specific feature
- **Replace placeholders with actual numbers** when creating specific feature scope documents

## Scope Guidelines
### Scope 1: Always Documentation and Testing

The first scope should always focus on documentation and testing setup:

```markdown
### SCOPE_1: Initialization
- [x] Set up initial project docs (#SCOPE_1_a)
- [ ] Create feature flag and scaffold feature structure with // TODO comments (#SCOPE_1_b)
- [ ] Write integration tests for feature (#SCOPE_1_c)
```

### Subsequent Scopes: Feature Implementation

Organize remaining scopes by logical implementation phases:
- Data layer / API integration
- Core business logic
- UI components

### Scope {FINAL_SCOPE_NUMBER}: Finalization and Cleanup

The final scope should focus on wrapping up the feature and ensuring quality and maintainability:
- Integration and deployment. If applicable, write visual tests that generate screenshots and video, and add these assets to the README or documentation.
- Remove or clean up feature flags if they were used during development. Ensure feature tests are no longer expected to fail.
- Add synthetic monitoring to ensure the feature works as expected in production.

```markdown
### SCOPE_{FINAL_SCOPE_NUMBER}: Finalization
- [ ] Create visual tests for feature and add screenshots/video to docs (#SCOPE_{FINAL_SCOPE_NUMBER}_a)
- [ ] Remove feature flags (#SCOPE_{FINAL_SCOPE_NUMBER}_b)
- [ ] Add synthetic monitoring and regression tags to tests (#SCOPE_{FINAL_SCOPE_NUMBER}_c)
```

## Task Requirements

### Task Descriptions

- Use clear, actionable language
- Start with an action verb (Create, Implement, Build, Add, etc.)
- Be specific enough to understand the scope
- Include brief context when helpful

### Task Dependencies

- Use the `**Depends on**:` format to indicate dependencies
- Reference specific task IDs or entire scopes
- List multiple dependencies with commas
- Dependencies should be logical and help sequence work

### Task Status

- Use `[x]` for completed tasks
- Use `[ ]` for pending tasks
- Update status as work progresses

## Complete Example

```markdown
# Roadmap for Feature: Home Page

## Scopes and Tasks

### SCOPE_1: Initialization
- [x] Set up initial project docs (#SCOPE_1_a)
- [ ] Create feature flag and scaffold feature structure with // TODO comments (#SCOPE_1_b)
- [ ] Write integration tests for feature (#SCOPE_1_c)

### SCOPE_2: Implement data fetching and validation
- [ ] Implement `getHomeContent` function to fetch markdown files (#SCOPE_2_a)
- [ ] Implement zod schema validation for frontmatter fields (#SCOPE_2_b)
- [ ] Add error handling for empty or malformed content (#SCOPE_2_c)

### SCOPE_3: Build UI components for content rendering
- [ ] Create `ContentRenderer` component to map tags to components (#SCOPE_3_a)
  - **Depends on**: #SCOPE_2_b
- [ ] Build `HeroComponent` for hero sections (#SCOPE_3_b)
  - **Depends on**: #SCOPE_3_a
- [ ] Build `CustomComponent` for generic content (#SCOPE_3_c)
  - **Depends on**: #SCOPE_3_a

### SCOPE_4: Integrate the feature into the main application
- [ ] Create `HomePage` component to orchestrate content rendering (#SCOPE_4_a)
  - **Depends on**: SCOPE_2, SCOPE_3
- [ ] Write visual tests for `HomePage` and add screenshots/video to the docs (#SCOPE_4_b)
  - **Depends on**: #SCOPE_4_a
```

## Best Practices

### Scope Organization

- Keep scopes focused on a single major goal
- There should be no more than 6 tasks per scope
- Order scopes by logical implementation sequence
- Use descriptive scope names that clearly indicate the goal

### Task Granularity

- Break large tasks into smaller, manageable pieces
- Each task should be completable in a single development session
- Avoid tasks that span multiple files or components unless they're tightly coupled
- Include testing and documentation tasks where appropriate

### Dependency Management

- Clearly identify blocking dependencies
- Avoid circular dependencies
- Consider both technical and logical dependencies
- Update dependencies as the implementation evolves

### Maintenance

- Update task status regularly
- Add new tasks as they're discovered during implementation
- Remove or modify tasks that become obsolete
- Keep descriptions current with the actual implementation
