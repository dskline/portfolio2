# Feature Scaffolding: Directory Structure Setup

Create the necessary folder structure and files for the feature.

## Directory Structure

```
src/features/<tag_name>/
├── __docs__/
│   └── SCOPES.md (already exists)
├── __tests__/
│   ├── <tag_name>.spec.ts
│   └── <tag_name>_services.spec.ts
├── components/
│   └── index.ts
├── services/
│   └── index.ts
├── schemas/
│   └── index.ts
└── index.ts
```

## Tag Name Validation

Before proceeding with scaffolding, validate the feature tag name:

### Input Requirements

- Feature tag name must be provided
- Tag name should be lowercase, alphabetic with hyphens allowed
- Tag name must not be empty or contain only whitespace
- Feature directory `src/features/<tag_name>/` should not already exist
- SCOPES.md file should exist at `src/features/<tag_name>/__docs__/SCOPES.md`

### Validation Steps

1. **Prompt for feature tag name**: Ask the user to provide the feature tag name
2. **Format validation**: Check that the tag name matches the pattern `^[a-z-]+$`
3. **Existence check**: Verify that `src/features/<tag_name>/` does not already exist
4. **Scope file check**: Confirm that `src/features/<tag_name>/__docs__/SCOPES.md` exists
5. **Error handling**: If any validation fails, provide clear error message and re-prompt

### Error Messages

- **Empty input**: "Feature tag name cannot be empty. Please provide a valid tag name."
- **Invalid format**: "Feature tag name must contain only lowercase letters, numbers, and hyphens. Example: 'user-profile' or 'data-export'"
- **Directory exists**: "Feature directory already exists at 'src/features/<tag_name>/'. Please choose a different tag name or remove the existing directory."
- **Missing scope**: "SCOPES.md file not found at 'src/features/<tag_name>/__docs__/SCOPES.md'. Please ensure the feature planning is complete before scaffolding."


## File Creation Guidelines

### Component Files
- Create placeholder component files with TypeScript interfaces
- Include // TODO comments for implementation
- Export components from index.ts

### Service Files
- Create placeholder service functions
- Include proper TypeScript typing
- Add // TODO comments for business logic

### Schema Files
- Create Zod schemas for data validation
- Include // TODO comments for schema definitions
- Export schemas from index.ts

### Test Files
- Create integration tests following TDD principles
- Refer to [testing guidelines](./testing.md)

## File Templates

Templates for each file type should include:
- Proper imports and exports
- TypeScript interfaces and types
- // TODO comments indicating implementation areas
- Basic structure following project conventions
