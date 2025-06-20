# Feature Scaffolding Implementation

This prompt orchestrates the scaffolding process for a new feature using modular validation and setup procedures.

## Prerequisites

- Review [scaffolding guidelines](../../.github/instructions/feature/scaffolding.instructions.md)
- Review [TDD guidelines](../../.github/instructions/feature/tdd.instructions.md)

## Step 1: Input Validation and Setup

Follow the validation process from `scaffolding.instructions.md`:

1. **Request feature tag name** from the user
2. **Validate input format**: Ensure tag name follows `^[a-z-]+$` pattern
3. **Check directory existence**: Verify `src/features/<tag_name>/` doesn't exist
4. **Verify SCOPE.md**: Confirm `src/features/<tag_name>/__docs__/SCOPE.md` exists
5. **Handle validation errors**: Provide clear feedback and re-prompt if needed

## Step 2: Directory Structure Creation

Follow the structure guidelines from `scaffolding.instructions.md`:

Create the complete folder structure with placeholder files:
- Component files with TypeScript interfaces and // TODO comments
- Service files with proper typing and placeholder functions
- Schema files with Zod validation setup
- Index files with proper exports
- Test files following TDD principles

## Step 3: Test Implementation

Follow the testing guidelines from `tdd.instructions.md`:

- Create integration tests based on SCOPE.md epics
- Use proper test file naming conventions
- Implement TDD approach (tests should initially fail)
- Add appropriate scope tags: `@feature-<tag_name>`
- Structure tests to not require updates during implementation

## Implementation Notes

- All files should include // TODO comments indicating implementation areas
- Follow existing project conventions and TypeScript standards
- Tests should reflect the epic breakdown from SCOPE.md
- Maintain consistency with existing feature structure patterns
