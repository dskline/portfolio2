````instructions
---
applyTo: '**/__docs__/SCOPE.md'
---

# Scope Documentation Guide
This guide outlines the standard format and content requirements for feature scope documentation. Following this structure ensures comprehensive, consistent, and maintainable task tracking across all features in the project.

## Introduction

Scope documents serve as the primary implementation roadmap for features, breaking down complex specifications into manageable, actionable tasks. Each feature should have a dedicated SCOPE.md file that follows this standardized format.

## Document Structure

### 1. Feature Title

Begin with a clear title that matches the feature name from the specification:

```markdown
# Scope for Feature: [Feature Name]
```

### 2. Epics and Tasks Section

Organize implementation work into logical epics (high-level goals) and break each epic down into specific tasks.

```markdown
## Epics and Tasks

### EPIC_1: [Epic Name]
- [x] Task description (#EPIC_1_a)
- [ ] Task description (#EPIC_1_b)
- [ ] Task description (#EPIC_1_c)

### EPIC_2: [Epic Name]
- [ ] Task description (#EPIC_2_a)
  - **Depends on**: #EPIC_1_a, #EPIC_1_b
- [ ] Task description (#EPIC_2_b)
  - **Depends on**: #EPIC_2_a
```

## Task Numbering Pattern

Tasks are numbered using a combination of the Epic ID and a letter suffix:

- **Epic Format**: `EPIC_<number>` (e.g., EPIC_1, EPIC_2, EPIC_3)
- **Task Format**: `#EPIC_<number>_<letter>` (e.g., #EPIC_1_a, #EPIC_1_b, #EPIC_2_a)

This pattern provides:
- Clear epic grouping
- Unique task identification
- Alphabetical ordering within epics
- Easy cross-referencing in code comments and documentation

## Epic Guidelines
### Epic 1: Always Documentation and Testing

The first epic should always focus on documentation and testing setup:

```markdown
### EPIC_1: Initialization
- [x] Set up initial project docs (#EPIC_1_a)
- [ ] Create feature flag and scaffold feature structure with // TODO comments (#EPIC_1_b)
- [ ] Write integration tests for feature (#EPIC_1_c)
```

### Subsequent Epics: Feature Implementation

Organize remaining epics by logical implementation phases:
- Data layer / API integration
- Core business logic
- UI components

### Epic N: Finalization and Cleanup

The final epic should focus on wrapping up the feature and ensuring quality and maintainability:
- Integration and deployment. If applicable, write visual tests that generate screenshots and video, and add these assets to the README or documentation.
- Remove or clean up feature flags if they were used during development. Update test scope tags from `@feature-<tag-name>` to `@regression` to reflect the feature's integration into the main test suite.
- Add synthetic monitoring to ensure the feature works as expected in production.

```markdown
### EPIC_N: Finalization
- [ ] Write visual tests for feature and add screenshots/video to docs (#EPIC_N_a)
- [ ] Remove feature flags and clean up code (#EPIC_N_b)
- [ ] Update test scope tags from `@feature-<tag-name>` to `@regression` (#EPIC_N_c)
- [ ] Add synthetic monitoring for feature (#EPIC_N_d)
```

## Task Requirements

### Task Descriptions

- Use clear, actionable language
- Start with an action verb (Create, Implement, Build, Add, etc.)
- Be specific enough to understand the scope
- Include brief context when helpful

### Task Dependencies

- Use the `**Depends on**:` format to indicate dependencies
- Reference specific task IDs or entire epics
- List multiple dependencies with commas
- Dependencies should be logical and help sequence work

### Task Status

- Use `[x]` for completed tasks
- Use `[ ]` for pending tasks
- Update status as work progresses

## Complete Example

```markdown
# Roadmap for Feature: Home Page

## Epics and Tasks

### EPIC_1: Initialization
- [x] Set up initial project docs (#EPIC_1_a)
- [ ] Create feature flag and scaffold feature structure with // TODO comments (#EPIC_1_b)
- [ ] Write integration tests for feature (#EPIC_1_c)

### EPIC_2: Implement data fetching and validation
- [ ] Implement `getHomeContent` function to fetch markdown files (#EPIC_2_a)
- [ ] Implement zod schema validation for frontmatter fields (#EPIC_2_b)
- [ ] Add error handling for empty or malformed content (#EPIC_2_c)

### EPIC_3: Build UI components for content rendering
- [ ] Create `ContentRenderer` component to map tags to components (#EPIC_3_a)
  - **Depends on**: #EPIC_2_b
- [ ] Build `HeroComponent` for hero sections (#EPIC_3_b)
  - **Depends on**: #EPIC_3_a
- [ ] Build `CustomComponent` for generic content (#EPIC_3_c)
  - **Depends on**: #EPIC_3_a

### EPIC_4: Integrate the feature into the main application
- [ ] Create `HomePage` component to orchestrate content rendering (#EPIC_4_a)
  - **Depends on**: EPIC_2, EPIC_3
- [ ] Write visual tests for `HomePage` and add screenshots/video to the docs (#EPIC_4_b)
  - **Depends on**: #EPIC_4_a
```

## Best Practices

### Epic Organization

- Keep epics focused on a single major goal
- Aim for 3-6 tasks per epic
- Order epics by logical implementation sequence
- Use descriptive epic names that clearly indicate the goal

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
````
