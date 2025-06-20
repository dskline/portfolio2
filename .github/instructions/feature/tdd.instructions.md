# Feature Scaffolding: Test Implementation

Guidelines for creating integration tests following Test-Driven Development (TDD) principles.

## Test Organization

- Tests go in the `__tests__` folder with a `.spec.ts` suffix
- Separate test files by Epic (refer to SCOPE.md for epic breakdown)
- Use Epic titles to help describe test function names
- Add `@feature-<tag_name>` scope tags for feature identification

## Test File Naming Convention

- Main feature tests: `<tag_name>.spec.ts`
- Service tests: `<tag_name>_services.spec.ts`
- Component-specific tests: `<tag_name>_<component_name>.spec.ts`

## Test Structure Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('<tag_name>: description based on Epic Title from SCOPE.md', { tag: "@feature-<tag_name>" }, () => {
    test('descriptive test name', async ({ page }) => {
        // Test implementation
        // Should initially fail (TDD approach)
        // Will pass as feature is implemented
    });
});
```

## TDD Principles

- Tests should be written before implementation
- Tests should initially fail (red phase)
- Tests should not require updates as feature is implemented
- Focus on testing behavior, not implementation details
- Include tests for error states and edge cases

## Test Categories

1. **Page Loading Tests**: Verify pages load and render correctly
2. **Data Fetching Tests**: Test API calls and data validation
3. **User Interaction Tests**: Test component interactions
4. **Error Handling Tests**: Test error states and recovery
5. **Integration Tests**: Test feature integration with main app
