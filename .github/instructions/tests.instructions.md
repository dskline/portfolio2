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

-   **Single Assertion per Test (Logical Unit)**: While a test case (`test(...)`) can contain multiple `expect` calls, each `test.step()` should ideally focus on a single logical verification. This improves error isolation and reporting.
    -   If multiple distinct conditions need verification within one browser session, break them into logical `test.step()` blocks.
-   **Web-First Assertions**: Always use Playwright's `expect()` with built-in matchers (e.g., `toBeVisible()`, `toHaveText()`, `toHaveURL()`). These assertions automatically wait for conditions to be met, reducing flakiness.
    ```typescript
    // Good: Playwright waits for the element and visibility
    await expect(page.getByText('Submit')).toBeVisible();

    // Avoid: Manual checks and immediate assertions can be flaky
    // const button = await page.getByText('Submit');
    // expect(await button.isVisible()).toBe(true);
    ```
-   **Avoid Explicit Timeouts**: Do not use `page.waitForTimeout()` or similar explicit waits for managing test flow. Rely on Playwright's auto-waiting capabilities and web-first assertions. If a specific condition needs to be met, use an appropriate `expect` assertion that waits for it.
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

## Readability and Debugging

-   **Meaningful Titles**: Test and step titles should be concise yet descriptive enough to understand their purpose without reading the code.
-   **`console.debug` for Context**: Instead of inline comments explaining test logic, use `console.debug()` to log contextual information during test execution. This output can be invaluable for debugging.
    ```typescript
    console.debug(`Verifying order total for user: ${userId}, expected: ${expectedTotal}`);
    await expect(page.locator('#order-total')).toHaveText(expectedTotal.toString());
    ```
-   **Leverage Playwright Trace Viewer**: For in-depth debugging, utilize the Playwright Trace Viewer. It captures detailed execution traces, including DOM snapshots, console messages, and network requests, allowing you to step through the test and diagnose issues effectively. Configure it in `playwright.config.ts` (e.g., `trace: 'on-first-retry'`) and view traces using the `npx playwright show-trace <trace-file.zip>` command.

By adhering to these guidelines, we aim to create a test suite that is reliable, easy to understand, and efficient to maintain.

