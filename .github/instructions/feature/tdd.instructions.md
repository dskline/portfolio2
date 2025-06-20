# Feature Scaffolding: Test Implementation

Guidelines for creating integration tests following Test-Driven Development (TDD) principles.

## Test Organization

- Tests go in the `__tests__` folder with a `.spec.ts` suffix
- Separate test files by Scope (refer to SCOPE.md for scope breakdown)
- Use Scope titles to help describe test function names
- Add `@feature-<feature_tag>` scope tags for feature identification

## Test File Naming Convention

- Main feature test file: `<feature_tag>.spec.ts` (e.g., `about.spec.ts`)
- Scope-based tests: `<feature_tag>_<scope_name>.spec.ts` (e.g., `about_cms_integration.spec.ts`, `about_components.spec.ts`)
- Visual tests: `<feature_tag>.visual.spec.ts` (e.g., `about.visual.spec.ts`)

## Scope Separation Requirements

- Each Scope from SCOPE.md must have its own dedicated test file
- Scope test files should be named using the pattern: `<feature_name>_<scope_name>.spec.ts`
- <scope_name> should be derived from the Scope title in SCOPE.md and prefer only one word if possible (two words max)
- Each Scope file should focus only on testing functionality described in that specific Scope

## Test Structure Template

For Scope-specific tests:
```typescript
import { test, expect } from '@playwright/test';

test.describe('@feature-<feature_tag>: Scope description from SCOPE.md', () => {
    test('descriptive test name based on Scope tasks', async ({ page }) => {
        await test.step('Step description', async () => {
            // Test implementation
            // Should initially fail (TDD approach)
            // Will pass as feature is implemented
        });
    });
});
```

For overview tests (main feature file):
```typescript
import { test, expect } from '@playwright/test';

test.describe('@feature-<feature_tag>: Core functionality', () => {
    test('page should load successfully', async ({ page }) => {
        await page.goto('/about');
        await expect(page.locator('[data-testid="about-page"]')).toBeVisible();
    });

    test('navigation link exists', async ({ page }) => {
        await page.goto('/');
        const link = page.locator('a[href="/about"]');
        await expect(link).toHaveCount(1);
    });

    test('links should navigate correctly', async ({ page }) => {
        await page.goto('/');
        await page.click('');
        await expect(page.locator('[data-testid="about-page"]')).toBeVisible();
    });
});
```

## TDD Principles

- Tests should be written before implementation
- Tests should initially fail (red phase)
- Tests should not require updates as feature is implemented
- Focus on testing behavior, not implementation details
- Include tests for error states and edge cases
