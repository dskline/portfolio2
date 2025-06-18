---
applyTo: '*.spec.ts'
---

# Playwright Test Development Guidelines

This document outlines the standards and best practices for developing Playwright tests to ensure robustness, clarity, and maintainability.

## Core Principles

-   **Reliability**: Tests must be deterministic. Ensure the UI has reached the desired state before performing actions or assertions. Leverage Playwright's auto-waiting mechanisms and web-first assertions.
-   **Clarity**: Test code should be self-documenting. Prefer descriptive test titles and step names over inline comments.
-   **Efficiency**: Optimize test execution time. Utilize `test.step()` to structure tests and reuse browser sessions, minimizing redundant setup.

## Test Structure and Assertions

-   **Single Assertion per Test (Logical Unit)**: Each test should ideally focus on a single logical verification. This improves error isolation and reporting.
    -   If multiple distinct conditions need verification within one browser session, break them into logical `test.step()` blocks.
-   **Web-First Assertions**: Always use Playwright's `expect()` with built-in matchers (e.g., `toBeVisible()`, `toHaveText()`, `toHaveURL()`). These assertions automatically wait for conditions to be met, reducing flakiness.
    ```typescript
    // Good: Playwright waits for the element and visibility
    await expect(page.getByText('Submit')).toBeVisible();

    // Avoid: Manual checks and immediate assertions can be flaky
    // const button = await page.getByText('Submit');
    // expect(await button.isVisible()).toBe(true);
    ```
-   **Avoid Explicit Timeouts**: Do not use `page.waitForTimeout()` or similar explicit waits for managing test flow. Rely on Playwright's auto-waiting capabilities and web-first assertions. If a specific condition needs to be met, use an appropriate `expect` assertion that waits for it. If a timeout must be specified in an assertion, keep it under 600 milliseconds to ensure tests run efficiently.

    ```typescript
    // Avoid: Explicit timeout
    // await page.waitForTimeout(1000); // Bad practice
    
    // Prefer: Web-first assertions with minimal timeout if needed
    await expect(element, "Custom error message").toBeVisible({ timeout: 600 });
    
    // Best: Let Playwright's default auto-waiting handle it
    await expect(element).toBeVisible();
    ```
-   **Descriptive Assertion Messages**: Utilize the optional `message` parameter in `expect` calls to provide context-rich failure information. This significantly aids in debugging.
    ```typescript
    await expect(response.status(), `API call to ${url} failed`).toBe(200);
    ```

## Test Organization and Tagging

-   **Test Steps (`test.step()`):** Break down complex tests into smaller, logical units using `test.step('Step description', async () => { ... });`. This improves readability of test reports and helps pinpoint failures.
-   **Test Categories (Tags):** Every test *must* be tagged to define its purpose and execution scope. Tags are applied using the `{ tag: '@category' }` option in `test()` or `test.describe()`. Avoid including tags directly in test titles.

    | Category                | Execution Cadence       | Description                                                                                                |
    | ----------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
    | `@synthetic-monitoring` | Nightly                 | Critical end-to-end flows that monitor the health of external services and key application functionalities. |
    | `@smoke`                | Pre-commit Hook         | A small suite of fast-running tests verifying core functionalities and critical paths post-change.         |
    | `@regression`           | Post-deploy / Nightly   | Comprehensive suite to ensure existing functionalities remain working after new changes or deployments.    |
    | `@feature-<name>`       | During Development / CI | Tests specific to a new feature or module (e.g., `@feature-checkout`, `@feature-profile`).                 |
    | `@visual`               | Ad-hoc / On-demand      | Tests focused on visual regression, capturing screenshots/videos for snapshot comparison.                    |

    *Example:*
    ```typescript
    import { test, expect } from '@playwright/test';

    test('User can log in successfully', { tag: '@smoke' }, async ({ page }) => {
      // ... test steps ...
    });

    test.describe('Checkout Process', { tag: ['@regression', '@feature-checkout'] }, () => {
      test('Add item to cart and proceed to payment', async ({ page }) => {
        // ...
      });
    });
    ```

### Differentiating @smoke and @regression Tests

While both `@smoke` and `@regression` tags aim to ensure the application is working, they differ in scope and purpose:

**`@smoke` Tests: A Quick Health Check**

*   **Purpose**: To verify that the most critical, core functionalities of the application are working as expected. Think of it as a quick "is the system up and running and basically usable?" check.
*   **Scope**: Narrow. Covers the "happy path" for essential features.
*   **Speed**: Must be very fast. These are often run frequently (e.g., on every commit or before a deployment to a development environment).
*   **Goal**: To get a rapid signal that there are no major breakages in fundamental areas. If smoke tests fail, there's likely a significant issue that needs immediate attention, and further, more extensive testing (like regression) might be blocked or unnecessary until fixed.

*   **Examples for an E-commerce Site:**
    *   `test('User can load the homepage and see the main banner', { tag: '@smoke' })`
    *   `test('User can search for a product and see results', { tag: '@smoke' })`
    *   `test('User can log in with valid credentials', { tag: '@smoke' })`
    *   `test('User can add a popular item to the cart from its product page', { tag: '@smoke' })`
    *   `test('User can navigate to the checkout page with an item in the cart', { tag: '@smoke' })`

**`@regression` Tests: Ensuring Stability After Changes**

*   **Purpose**: To ensure that new code changes (features, bug fixes, refactoring) have not unintentionally broken existing functionalities. They confirm that what used to work still works.
*   **Scope**: Broader than smoke tests. Covers a wider range of functionalities, including edge cases, different user flows, and variations of existing features.
*   **Speed**: Can be slower and more comprehensive than smoke tests. Often run less frequently than smoke tests (e.g., nightly, before a release, or after major merges).
*   **Goal**: To catch unintended side effects of code changes and maintain the overall stability and correctness of the application.

*   **Examples for an E-commerce Site (building upon smoke tests):**
    *   `test('User login fails with incorrect password and shows error message', { tag: '@regression' })`
    *   `test('User can apply various filters (e.g., price, category, brand) on the search results page', { tag: '@regression' })`
    *   `test('User can add multiple items, including items with special options, to the cart', { tag: '@regression' })`
    *   `test('User can update item quantity in the cart', { tag: '@regression' })`
    *   `test('User can remove an item from the cart', { tag: '@regression' })`
    *   `test('User can complete the checkout process with a specific payment method (e.g., credit card)', { tag: '@regression' })`
    *   `test('User can complete the checkout process with another payment method (e.g., PayPal)', { tag: '@regression' })`
    *   `test('Order confirmation details are displayed correctly after checkout', { tag: '@regression' })`
    *   `test('User can view their order history after logging in', { tag: '@regression' })`
    *   `test('All links in the site footer navigate to the correct pages', { tag: '@regression' })`

**Key Differences Summarized:**

| Aspect          | `@smoke`                                  | `@regression`                                     |
| :-------------- | :---------------------------------------- | :------------------------------------------------ |
| **Primary Goal** | Quick check of critical path viability    | Ensure existing features haven't broken         |
| **Scope**       | Narrow, core features, happy path       | Broad, detailed features, edge cases, variations |
| **Frequency**   | High (e.g., pre-commit, on every build)   | Medium (e.g., nightly, pre-release)             |
| **Speed**       | Very Fast                                 | Can be slower, more comprehensive                 |
| **Trigger**     | Any significant change, scheduled         | After code changes, before releases               |

## Element Selection and Locators

-   **Use Reliable Selectors**: Prioritize stable selectors that are unlikely to change with UI updates. Order of preference:
    1. Data attributes (`data-testid="login-button"`)
    2. Accessibility attributes (role, aria-label)
    3. CSS selectors with component-based classes
    4. Text content (for user-facing elements)
    
-   **Add Data Attributes When Needed**: When good element locators don't exist in the component, attributes should be added to the component code. In order of preference: good accessibility descriptor attributes should be used first, followed by `data-testid` attributes specifically for testing. This creates a stable contract between the UI and tests.
    ```typescript
    // In component code
    <button data-testid="submit-form">Submit</button>

    // In test code
    await page.locator('[data-testid="submit-form"]').click();
    ```

-   **Avoid Brittle Selectors**: Do not use selectors that depend on:
    - Exact position in the DOM hierarchy
    - Auto-generated IDs or classes
    - Visual styling attributes that might change

## Test Scope Restrictions

### Visual Testing Guidelines

-   **No Visual Tests in Regular Spec Files**: Regular `.spec.ts` files should NOT include visual testing such as:
    - Checking for specific Tailwind CSS classes (e.g., `toHaveClass(/bg-blue-500/)`)
    - Testing hover effects or CSS transitions
    - Responsive design breakpoint testing
    - Layout or styling verification

-   **Visual Testing Files**: Create separate `feature.visual.spec.ts` files tagged with `@visual` for visual regression testing:
    ```typescript
    // projects.visual.spec.ts
    test('Projects feature displays correctly across viewports', { tag: '@visual' }, async ({ page }) => {
      // Test mobile, tablet, and desktop layouts
      // Generate screenshots and videos for visual comparison
    });
    ```

-   **Exception for Dynamic CSS Classes**: The ONLY time CSS class testing is allowed in regular spec files is when testing dynamically added classes that indicate application-wide state changes:
    ```typescript
    // Good: Testing application state changes via CSS classes
    await expect(page.locator('body')).toHaveClass(/dark/); // Dark mode activated
    await expect(page.locator('container')).toHaveClass(/loading/); // Container in loading state
    
    // Prefer: Test actual HTML attributes when available
    await expect(submitButton).toBeDisabled(); // Button is disabled
    await expect(modal).toHaveAttribute('open'); // Modal is open
    await expect(checkbox).toBeChecked(); // Checkbox is checked
    await expect(input).toHaveAttribute('aria-expanded', 'true'); // Dropdown expanded
    
    // Bad: Testing static styling classes
    await expect(button).toHaveClass(/bg-blue-500/); // Static styling
    await expect(container).toHaveClass(/flex/); // Layout styling
    await expect(item).toHaveClass(/selected/); // Use aria-selected instead
    ```

### Accessibility Testing Restrictions

-   **No Accessibility Tests in Playwright**: Do NOT write accessibility tests in Playwright spec files. This includes:
    - Testing semantic HTML structure
    - Checking ARIA attributes
    - Keyboard navigation testing
    - Screen reader compatibility
    - Alt text verification
    - Focus management

-   **Accessibility Testing Handled Elsewhere**: Accessibility is covered by:
    - Storybook accessibility addon
    - ESLint accessibility rules
    - Code review processes
    - Dedicated accessibility testing tools

### Focus on Functional Testing

Regular spec files should focus on:
- **User interactions and workflows**
- **Data flow and API responses**
- **Navigation and routing**
- **Form submission and validation**
- **Error handling and edge cases**
- **Business logic verification**

## Readability and Debugging

-   **Meaningful Titles**: Test and step titles should be concise yet descriptive enough to understand their purpose without reading the code.
-   **`console.debug` for Context**: Instead of inline comments explaining test logic, use `console.debug()` to log contextual information during test execution. This output can be invaluable for debugging.
    ```typescript
    console.debug(`Verifying order total for user: ${userId}, expected: ${expectedTotal}`);
    await expect(page.locator('#order-total')).toHaveText(expectedTotal.toString());
    ```
-   **Leverage Playwright Trace Viewer**: For in-depth debugging, utilize the Playwright Trace Viewer. It captures detailed execution traces, including DOM snapshots, console messages, and network requests, allowing you to step through the test and diagnose issues effectively. Configure it in `playwright.config.ts` (e.g., `trace: 'on-first-retry'`) and view traces using the `npx playwright show-trace <trace-file.zip>` command.

By adhering to these guidelines, we aim to create a test suite that is reliable, easy to understand, and efficient to maintain.

