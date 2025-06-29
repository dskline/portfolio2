# Feature Scaffolding Implementation

This prompt orchestrates the scaffolding process for a new feature using modular validation and setup procedures.

## Prerequisites

- Review [feature structure guidelines](../feature-structure.md)
- Review [testing guidelines](../testing.md)

## Step 1: Input Validation and Setup

1. **Request feature tag name** from the user
2. **Validate input format**: Ensure tag name follows `^[a-z-]+$` pattern
3. **Check directory existence**: Verify `src/features/<tag_name>/` doesn't exist
4. **Verify SCOPES.md**: Confirm `src/features/<tag_name>/__docs__/SCOPES.md` exists
5. **Handle validation errors**: Provide clear feedback and re-prompt if needed

## Step 2: Directory Structure Creation

Create the complete folder structure with placeholder files:
- Component files with TypeScript interfaces and // TODO comments
- Service files with proper typing and placeholder functions
- Schema files with Zod validation setup
- Index files with proper exports
- All files should include // TODO comments indicating implementation areas

## Step 3: Test Implementation

- Create integration tests based on SCOPES.md scopes
- Use proper test file naming conventions
- Implement TDD approach (tests should initially fail)
- Structure tests to not require updates during implementation

## Implementation Notes

- Follow existing project conventions and TypeScript standards
- Tests should reflect the scope breakdown from SCOPES.md
- Maintain consistency with existing feature structure patterns
