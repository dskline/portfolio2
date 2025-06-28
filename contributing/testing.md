```
applyTo: '**/features/*/__tests__/*.spec.md'
```
# Testing guidelines

- Test files should only be in the `__tests__` folder of feature directories, i.e. `src/features/<feature_tag>/__tests__`

## Naming conventions

- File name should be `<feature_tag>.spec.ts` or `<feature_tag>_<scope_tag>.spec.ts`.
- `<scope_tag>` should be derived from the Scope title in SCOPES.md and prefer only one word if possible (two words max).

Use descriptive test titles in the following format:

```typescript
import { expect, test } from "@playwright/test";

test.describe("{{ The feature or scope title being tested }}", () => {
  test(
    "{{ Descriptive test name based on Scope tasks }}",
    { tag: "@{{ scope_tag }}" },
    async ({ page }) => {
      page.goto("/{{ The page or feature being tested }}");

      await test.step("{{ Step one }}", async () => {
        // Implementation with at most one assertion
      });
      await test.step("{{ Step two }}", async () => {
        // Implementation with at most one assertion
      });
    },
  );
});
```

## Test tags (categories)

Only one test tag should be used per test() function (not test.describe or test.step):

| Test Tag                | Execution Cadence       | Description                                                                                                 |
| ----------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `@synthetic-monitoring` | Nightly                 | Critical end-to-end flows that monitor the health of external services and key application functionalities. |
| `@smoke`                | Pre-commit Hook         | A small suite of fast-running tests verifying core functionalities and critical paths post-change.          |
| `@regression`           | Pre-deploy              | Comprehensive suite to ensure existing functionalities remain working after new changes or deployments.     |
| `@visual`               | Ad-hoc / On-demand      | Tests focused on visual regression, capturing screenshots/videos for snapshot comparison.                   |

## Best Practices

Refer to [Context Samples](./context7/c7-playwright.instructions.md) for examples of how to implement these best practices in Playwright tests.

### Maintainability    
- Keep tests small, focused, and isolated to a single functionality or user interaction.
- Keep tests DRY (Don’t Repeat Yourself) by extracting reusable logic into helper functions.
- Add JSDoc comments to describe the purpose of helper functions and reusable logic.
- Implement proper error handling and logging in tests to provide clear failure messages.
- Ensure test and step titles are concise yet descriptive enough to understand their purpose without reading the code.

### Locators
- Avoid using `page.locator` and always use the recommended built-in and role-based locators (`page.getByRole`, `page.getByLabel`, `page.getByText`, `page.getByTitle`, etc.) over complex selectors.
- Use `page.getByTestId` whenever `data-testid` is defined on an element or container.
- Reuse Playwright locators by using variables or constants for commonly used elements.

### Assertions
- Prefer to use web-first assertions (`toBeVisible`, `toHaveText`, etc.) whenever possible.
- Use `expect` matchers for assertions (`toEqual`, `toContain`, `toBeTruthy`, `toHaveLength`, etc.) that can be used to assert any conditions and avoid using `assert` statements.
- Use the optional message parameter in expect calls to aid debugging when tests fail.

```typescript
await expect(response.status(), `API call to ${url} failed`).toBe(200);
```

### Test Execution
- Avoid hardcoded timeouts.
- Use `page.waitFor` with specific conditions or events to wait for elements or states.
- Ensure tests run reliably in parallel without shared state conflicts.

### Test Scope
- Focus on critical user paths, maintaining tests that are stable, maintainable, and reflect real user behavior.
- Cover user interactions, workflows, navigation, input validation, and business logic verification.
- Avoid testing implementation details or internal states that are not visible to the user.
- Avoid testing accessibility (Storybook will do this for us).
- Avoid mocking API calls or external services. Instead, use integration tests that interact with real endpoints or services.
