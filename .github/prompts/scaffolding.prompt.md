I want you to implement the scaffolding for a feature using the following steps:

Step 1:

Ask me for the feature tag name. All documentation related to this feature will be stored in a folder named `src/features/<tag_name>/`.

There should already be a task written in the `src/features/<tag_name>/__docs__/SCOPE.md` file for scaffolding the feature structure with placeholder components and // TODO comments.

Step 2:

Once you have the feature tag name, create the necessary folder structure and files for the feature. This includes:

- Creating subfolders for components, services, schemas, and tests
- Creating placeholder files for each component, service, schema, and test
- Adding // TODO comments in each file to indicate where implementation should go
- Adding typescript types for each component and service, if applicable
- Adding integration tests for the feature, following TDD principles (more info below)

Testing guidelines:
- Tests go in the `__tests__` folder with a `.spec.ts` suffix.
- Tests should be broken down into separate files related by their EPIC tag (refer to the `src/features/<feature_name>/__docs__/SCOPE.md` file for a list of epics).
- Use the Epic title in the describe function of each test file.
- Use scope tags called `feature-<feature_name>` in the test files to indicate which feature they belong to.
- Follow best practices for Playwright tests - use `tests.instructions.md` as a guide.
- For better maintainability, use file names that reflect specific directories or components they test within the feature directory (see below):
    
Don't worry about ensuring the tests pass at this stage; this is the nature of Test-Driven Development (TDD). The tests will succeed as the feature is developed, showing progress.
In fact, they should be written in a way that they fail initially, as the feature is not yet implemented.
They should also be written in a way that they won't need to be updated as the feature is implemented.

Examples:
```typescript
// src/features/<feature_name>/__tests__/<feature_name>.spec.ts
import { test } from '@playwright/test';

test.describe('Feature: <feature_name>', { tag: "@feature-<feature_name>" }, () => {
    test('page should load successfully', async ({ page }) => {
        await page.goto('/<feature_name>');
        await expect(page).toHaveTitle(/<feature_name>/);
        await expect(page).toBeVisible();
    });
});
```

If there is service logic, that logic should live in `src/features/<feature_name>/services/`, and the tests for those services should be in `src/features/<feature_name>/__tests__/<feature_name>_services.spec.ts`.

```typescript
// src/features/<feature_name>/__tests__/<feature_name>_services.spec.ts
import { test } from '@playwright/test';

test.describe('<feature_name>: Data Fetching and Validation', { tag: "@feature-<feature_name>" }, () => {
    test('page shows loading indicator while fetching data', async ({ page }) => {
        // Test implementation here
    });

    test('page displays error message on fetch failure', async ({ page }) => {
        // Test implementation here
    });

    test('page renders content correctly after data fetch', async ({ page }) => {
        // Test implementation here
    });
});
```