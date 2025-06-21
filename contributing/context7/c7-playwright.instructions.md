TITLE: Launch Browser Instance with Playwright (Node.js)
DESCRIPTION: Demonstrates how to initialize Playwright, launch a browser (Chromium, Firefox, or WebKit), open a new page, navigate to a URL, and close the browser. This is a fundamental example for starting browser automation.
SOURCE: https://playwright.dev/docs/intro/api/class-playwright

LANGUAGE: javascript
CODE:
```
const { chromium, firefox, webkit } = require('playwright');

(async () => {
  const browser = await chromium.launch();  // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();
```

----------------------------------------

TITLE: Install Playwright Library and Browsers
DESCRIPTION: These commands demonstrate how to install the Playwright library using npm and how to download the necessary browser binaries (Chromium, Firefox, WebKit) for testing.
SOURCE: https://playwright.dev/docs/intro/library

LANGUAGE: Shell
CODE:
```
npm i -D playwright
```

LANGUAGE: Shell
CODE:
```
npx playwright install chromium firefox webkit
```

----------------------------------------

TITLE: Configure Basic Playwright Test Options
DESCRIPTION: This snippet demonstrates the fundamental configuration options for Playwright tests, including setting the test directory, enabling parallel execution, configuring retries, and defining browser projects. It also shows how to set a base URL and collect traces for failed tests.
SOURCE: https://playwright.dev/docs/intro/test-configuration

LANGUAGE: TypeScript
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

----------------------------------------

TITLE: Launch Chromium Browser with Playwright in Node.js
DESCRIPTION: This Node.js example demonstrates how to launch a Chromium browser instance, open a new page, navigate to a URL, and then close the browser using Playwright. It showcases the basic workflow for browser automation.
SOURCE: https://playwright.dev/docs/intro/api/class-browsertype

LANGUAGE: Node.js
CODE:
```
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // other actions...
  await browser.close();
})();
```

----------------------------------------

TITLE: Navigate Playwright Page to URL
DESCRIPTION: Demonstrates how to navigate a Playwright page to a specified URL using `page.goto()`. Playwright automatically waits for the page to reach the load state prior to moving forward.
SOURCE: https://playwright.dev/docs/intro/writing-tests

LANGUAGE: JavaScript
CODE:
```
await page.goto('https://playwright.dev/');
```

----------------------------------------

TITLE: Locate Elements by Text Content in Playwright
DESCRIPTION: Demonstrates how to find elements based on their visible text using `page.getByText()`. Examples include matching by substring, exact string, and regular expressions. Playwright normalizes whitespace for text matching. This locator is recommended for non-interactive elements like `div`, `span`, or `p`. For example, to locate 'Welcome, John' in a DOM structure like `<span>Welcome, John</span>`.
SOURCE: https://playwright.dev/docs/intro/locators

LANGUAGE: HTML
CODE:
```
<span>Welcome, John</span>
```

LANGUAGE: TypeScript
CODE:
```
await expect(page.getByText('Welcome, John')).toBeVisible();
```

LANGUAGE: TypeScript
CODE:
```
await expect(page.getByText('Welcome, John', { exact: true })).toBeVisible();
```

LANGUAGE: TypeScript
CODE:
```
await expect(page.getByText(/welcome, [A-Za-z]+$/i)).toBeVisible();
```

----------------------------------------

TITLE: Define Playwright Page Object Model Class (TypeScript)
DESCRIPTION: This TypeScript snippet defines a 'TodoPage' class, implementing the Page Object Model pattern. It encapsulates interactions with a 'todo list' web application page, providing methods like 'goto', 'addToDo', 'remove', and 'removeAll' using Playwright's 'Page' and 'Locator' objects.
SOURCE: https://playwright.dev/docs/intro/test-fixtures

LANGUAGE: typescript
CODE:
```
import type { Page, Locator } from '@playwright/test';

export class TodoPage {
  private readonly inputBox: Locator;
  private readonly todoItems: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator('input.new-todo');
    this.todoItems = this.page.getByTestId('todo-item');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }
}
```

----------------------------------------

TITLE: Configure Test and Hook Timeouts with Playwright test.setTimeout
DESCRIPTION: The `test.setTimeout()` method allows modification of the timeout for the current test or hook. A value of zero indicates no timeout. This method can be used to adjust timeouts for individual tests, `beforeEach`/`beforeAll`/`afterAll` hooks, or entire test groups.
SOURCE: https://playwright.dev/docs/intro/api/class-test

LANGUAGE: JavaScript
CODE:
```
test('very slow test', async ({ page }) => {
  test.setTimeout(120000);
  // ...
});
```

LANGUAGE: JavaScript
CODE:
```
test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  test.setTimeout(testInfo.timeout + 30000);
});
```

LANGUAGE: JavaScript
CODE:
```
test.beforeAll(async () => {
  // Set timeout for this hook.
  test.setTimeout(60000);
});
```

LANGUAGE: JavaScript
CODE:
```
test.describe('group', () => {
  // Applies to all tests in this group.
  test.describe.configure({ timeout: 60000 });

  test('test one', async () => { /* ... */ });
  test('test two', async () => { /* ... */ });
  test('test three', async () => { /* ... */ });
});
```

LANGUAGE: APIDOC
CODE:
```
test.setTimeout(timeout)
  Arguments:
    timeout: number - Timeout in milliseconds.
```

----------------------------------------

TITLE: Use Extended Fixtures in Playwright Tests
DESCRIPTION: This example shows how to import and use a custom fixture, 'todoPage', defined via `test.extend` in a Playwright test case.
SOURCE: https://playwright.dev/docs/intro/api/class-test

LANGUAGE: TypeScript
CODE:
```
import { test } from './my-test';

test('test 1', async ({ todoPage }) => {
  await todoPage.addToDo('my todo');
  // ...
});
```

----------------------------------------

TITLE: Configure Playwright Trace Recording in playwright.config.ts
DESCRIPTION: This configuration snippet for `playwright.config.ts` demonstrates how to set up automatic trace recording. It configures traces to be recorded 'on-first-retry' for failed tests, with the number of retries adjusted based on the environment (2 for CI, 0 locally). This ensures traces are generated for debugging issues, especially in Continuous Integration environments.
SOURCE: https://playwright.dev/docs/intro/trace-viewer-intro

LANGUAGE: TypeScript
CODE:
```
import { defineConfig } from '@playwright/test';
export default defineConfig({
  retries: process.env.CI ? 2 : 0, // set to 2 when running on CI
  // ...
  use: {
    trace: 'on-first-retry', // record traces on first retry of each test
  },
});
```

----------------------------------------

TITLE: Locate Element by CSS Selector in Playwright
DESCRIPTION: Demonstrates how to locate and interact with an element using a CSS selector in Playwright. It highlights that Playwright's CSS selectors can pierce shadow DOM and include custom pseudo-classes for more advanced targeting.
SOURCE: https://playwright.dev/docs/intro/other-locators

LANGUAGE: Node.js
CODE:
```
await page.locator('css=button').click();
```

----------------------------------------

TITLE: Playwright Locator: frameLocator() Usage
DESCRIPTION: Example demonstrating how to use `locator.frameLocator()` to interact with elements inside an iframe by first locating the iframe and then elements within it.
SOURCE: https://playwright.dev/docs/intro/api/class-locator

LANGUAGE: JavaScript
CODE:
```
const locator = page.frameLocator('iframe').getByText('Submit');
await locator.click();
```

----------------------------------------

TITLE: Run Playwright Tests
DESCRIPTION: Executes Playwright tests across all configured browsers (Chromium, Firefox, WebKit) in headless mode by default. Results are shown in the terminal.
SOURCE: https://playwright.dev/docs/intro/intro

LANGUAGE: Shell
CODE:
```
npx playwright test
```

LANGUAGE: Shell
CODE:
```
yarn playwright test
```

LANGUAGE: Shell
CODE:
```
pnpm exec playwright test
```

----------------------------------------

TITLE: Playwright: Use Resilient Locators
DESCRIPTION: Highlights the importance of using Playwright's built-in locators, especially user-facing attributes like `getByRole`, for creating resilient end-to-end tests. These locators are less prone to breaking when the DOM structure changes, ensuring tests remain stable and maintainable. Examples include basic selection, chaining, and filtering.
SOURCE: https://playwright.dev/docs/intro/best-practices

LANGUAGE: JavaScript
CODE:
```
// 👍
page.getByRole('button', { name: 'submit' });
```

LANGUAGE: JavaScript
CODE:
```
const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });
```

LANGUAGE: JavaScript
CODE:
```
await page
    .getByRole('listitem')
    .filter({ hasText: 'Product 2' })
    .getByRole('button', { name: 'Add to cart' })
    .click();
```

----------------------------------------

TITLE: Playwright API Class Reference Overview
DESCRIPTION: This section outlines the hierarchical structure of Playwright's API classes, categorized by their primary function within the Playwright framework. It includes core library classes, assertion utilities, test runner components, reporting interfaces, and experimental features.
SOURCE: https://playwright.dev/docs/intro/api/class-websocketroute

LANGUAGE: APIDOC
CODE:
```
API Reference:
  Playwright Test:
    - Playwright Test
  Playwright Library:
    Classes:
      - APIRequest
      - APIRequestContext
      - APIResponse
      - Accessibility
      - Browser
      - BrowserContext
      - BrowserServer
      - BrowserType
      - CDPSession
      - Clock
      - ConsoleMessage
      - Coverage
      - Dialog
      - Download
      - ElementHandle
      - FileChooser
      - Frame
      - FrameLocator
      - JSHandle
      - Keyboard
      - Locator
      - Logger
      - Mouse
      - Page
      - Request
      - Response
      - Route
      - Selectors
      - TimeoutError
      - Touchscreen
      - Tracing
      - Video
      - WebError
      - WebSocket
      - WebSocketRoute
      - Worker
  Assertions:
    - APIResponseAssertions
    - GenericAssertions
    - LocatorAssertions
    - PageAssertions
    - SnapshotAssertions
  Test Runner:
    - Fixtures
    - FullConfig
    - FullProject
    - Location
    - Playwright Test
    - TestConfig
    - TestInfo
    - TestInfoError
    - TestOptions
    - TestProject
    - TestStepInfo
    - WorkerInfo
  Test Reporter:
    - Reporter
    - Suite
    - TestCase
    - TestError
    - TestResult
    - TestStep
  Experimental:
    - Android
    - AndroidDevice
    - AndroidInput
    - AndroidSocket
    - AndroidWebView
    - Electron
    - ElectronApplication
```

----------------------------------------

TITLE: Configure Playwright Test for multiple browsers and devices
DESCRIPTION: This configuration example demonstrates how to set up Playwright Test to run tests across various browser engines (Chromium, Firefox, WebKit) and device types (Desktop, Mobile). It utilizes the `projects` array in `playwright.config.ts` to define distinct test environments, each with specific `use` options like `devices['Desktop Chrome']` or `devices['Pixel 5']`.
SOURCE: https://playwright.dev/docs/intro/api/class-testproject

LANGUAGE: typescript
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Options shared for all projects.
  timeout: 30000,
  use: {
    ignoreHTTPSErrors: true,
  },

  // Options specific to each project.
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
    },
    {
      name: 'Mobile Chrome',
      use: devices['Pixel 5'],
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
  ],
});
```

----------------------------------------

TITLE: Playwright Locator Assertion: toBeVisible
DESCRIPTION: Asserts that the element identified by the locator is visible on the page. This means the element is rendered, has a size greater than zero, and is not hidden by CSS properties.
SOURCE: https://playwright.dev/docs/intro/test-assertions

LANGUAGE: APIDOC
CODE:
```
await expect(locator).toBeVisible()
```

----------------------------------------

TITLE: Playwright: Perform Various Mouse Click Actions
DESCRIPTION: This section illustrates how to perform different types of mouse clicks using Playwright's locator.click(), locator.dblclick(), and locator.hover() methods. It covers generic clicks, double clicks, right clicks, clicks with keyboard modifiers (Shift, ControlOrMeta), hovering, and clicking at specific coordinates.
SOURCE: https://playwright.dev/docs/intro/input

LANGUAGE: javascript
CODE:
```
// Generic click
await page.getByRole('button').click();

// Double click
await page.getByText('Item').dblclick();

// Right click
await page.getByText('Item').click({ button: 'right' });

// Shift + click
await page.getByText('Item').click({ modifiers: ['Shift'] });

// Ctrl + click on Windows and Linux
// Meta + click on macOS
await page.getByText('Item').click({ modifiers: ['ControlOrMeta'] });

// Hover over element
await page.getByText('Item').hover();

// Click the top left corner
await page.getByText('Item').click({ position: { x: 0, y: 0 } });
```

----------------------------------------

TITLE: GitHub Actions Workflow: Run Sharded Playwright Tests
DESCRIPTION: This YAML configuration defines a GitHub Actions workflow that runs Playwright tests in parallel across multiple jobs using a matrix strategy. It sets up Node.js, installs dependencies and Playwright browsers, and executes tests with a specific shard index and total, then uploads individual blob reports as artifacts for later merging.
SOURCE: https://playwright.dev/docs/intro/test-sharding

LANGUAGE: yaml
CODE:
```
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  playwright-tests:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright browsers
      run: npx playwright install --with-deps

    - name: Run Playwright tests
      run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

    - name: Upload blob report to GitHub Actions Artifacts
      if: ${{ !cancelled() }}
      uses: actions/upload-artifact@v4
      with:
        name: blob-report-${{ matrix.shardIndex }}
        path: blob-report
        retention-days: 1
```

----------------------------------------

TITLE: Define TodoPage Class for Playwright Test
DESCRIPTION: This TypeScript class defines a `TodoPage` object for Playwright tests, encapsulating common interactions with a ToDo application's page elements like input box and todo items. It includes methods for navigation, adding, removing, and clearing todo items.
SOURCE: https://playwright.dev/docs/intro/test-fixtures

LANGUAGE: typescript
CODE:
```
import type { Page, Locator } from '@playwright/test';

export class TodoPage {
  private readonly inputBox: Locator;
  private readonly todoItems: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator('input.new-todo');
    this.todoItems = this.page.getByTestId('todo-item');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }
}
```

----------------------------------------

TITLE: Defining Playwright Fixtures and Test Hooks
DESCRIPTION: This TypeScript code demonstrates how to define custom Playwright fixtures using `base.extend`. It includes examples of worker-scoped and test-scoped fixtures, both automatic and non-automatic, showing their setup and teardown phases. It also illustrates the use of `beforeAll`, `beforeEach`, `afterEach`, and `afterAll` hooks alongside test definitions, providing a comprehensive setup for Playwright tests.
SOURCE: https://playwright.dev/docs/intro/test-fixtures

LANGUAGE: typescript
CODE:
```
import { test as base } from '@playwright/test';

const test = base.extend<{
  testFixture: string,
  autoTestFixture: string,
  unusedFixture: string,
}, {
  workerFixture: string,
  autoWorkerFixture: string,
}> ({
  workerFixture: [async ({ browser }) => {
    // workerFixture setup...
    await use('workerFixture');
    // workerFixture teardown...
  }, { scope: 'worker' }],

  autoWorkerFixture: [async ({ browser }) => {
    // autoWorkerFixture setup...
    await use('autoWorkerFixture');
    // autoWorkerFixture teardown...
  }, { scope: 'worker', auto: true }],

  testFixture: [async ({ page, workerFixture }) => {
    // testFixture setup...
    await use('testFixture');
    // testFixture teardown...
  }, { scope: 'test' }],

  autoTestFixture: [async () => {
    // autoTestFixture setup...
    await use('autoTestFixture');
    // autoTestFixture teardown...
  }, { scope: 'test', auto: true }],

  unusedFixture: [async ({ page }) => {
    // unusedFixture setup...
    await use('unusedFixture');
    // unusedFixture teardown...
  }, { scope: 'test' }],
});

test.beforeAll(async () => { /* ... */ });
test.beforeEach(async ({ page }) => { /* ... */ });
test('first test', async ({ page }) => { /* ... */ });
test('second test', async ({ testFixture }) => { /* ... */ });
test.afterEach(async () => { /* ... */ });
test.afterAll(async () => { /* ... */ });
```

----------------------------------------

TITLE: Selecting Options by Value or Label with Playwright locator.selectOption()
DESCRIPTION: This snippet demonstrates how to use `locator.selectOption()` to select an option within a dropdown. The method now supports matching options by either their `value` attribute or their visible text `label`, simplifying interaction with select elements.
SOURCE: https://playwright.dev/docs/intro/release-notes

LANGUAGE: TypeScript
CODE:
```
await element.selectOption('Red');
```

----------------------------------------

TITLE: Basic Playwright Test Example
DESCRIPTION: Demonstrates a fundamental Playwright test using `test` to define a test case and `expect` for assertions. It navigates to a URL, extracts text from an element, and verifies the extracted text.
SOURCE: https://playwright.dev/docs/intro/api/class-test

LANGUAGE: JavaScript
CODE:
```
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});
```

----------------------------------------

TITLE: Registering Playwright Locator Handler for Cookie Dialogs
DESCRIPTION: This snippet demonstrates how to use `page.addLocatorHandler()` to automatically handle elements that might block Playwright actions, such as cookie consent dialogs. It registers a callback that clicks 'Accept all' when a specific cookie heading appears, allowing the test to proceed without manual intervention.
SOURCE: https://playwright.dev/docs/intro/release-notes

LANGUAGE: javascript
CODE:
```
// Setup the handler.
await page.addLocatorHandler(
    page.getByRole('heading', { name: 'Hej! You are in control of your cookies.' }),
    async () => {
      await page.getByRole('button', { name: 'Accept all' }).click();
    });
// Write the test as usual.
await page.goto('https://www.ikea.com/');
await page.getByRole('link', { name: 'Collection of blue and white' }).click();
await expect(page.getByRole('heading', { name: 'Light and easy' })).toBeVisible();
```

----------------------------------------

TITLE: Configure Playwright projects for multiple browsers and devices
DESCRIPTION: This configuration snippet demonstrates how to set up Playwright projects to run tests across various browsers (Chromium, Firefox, WebKit), mobile viewports (Pixel 5, iPhone 12), and branded browsers (Microsoft Edge, Google Chrome). It utilizes the 'devices' utility from '@playwright/test' to easily define browser and device specific settings within the 'projects' array.
SOURCE: https://playwright.dev/docs/intro/test-projects

LANGUAGE: TypeScript
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },
  ],
});
```

----------------------------------------

TITLE: Writing a Basic Playwright Test in TypeScript
DESCRIPTION: This snippet demonstrates how to write two fundamental Playwright tests using TypeScript. The first test navigates to the Playwright website and asserts that the page title contains 'Playwright'. The second test clicks the 'Get started' link and verifies that the 'Installation' heading becomes visible. It illustrates common actions like `page.goto`, `page.getByRole`, and assertions such as `toHaveTitle` and `toBeVisible`.
SOURCE: https://playwright.dev/docs/intro/writing-tests

LANGUAGE: TypeScript
CODE:
```
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

----------------------------------------

TITLE: Configure Playwright General Test Options
DESCRIPTION: This snippet shows how to set various general test options in `playwright.config.ts`, including `actionTimeout`, `browserName`, `bypassCSP`, `channel`, `headless`, and `testIdAttribute`. These options control browser behavior and test execution settings.
SOURCE: https://playwright.dev/docs/intro/test-use-options

LANGUAGE: typescript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    actionTimeout: 0,

    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    browserName: 'chromium',

    // Toggles bypassing Content-Security-Policy.
    bypassCSP: true,

    // Channel to use, for example "chrome", "chrome-beta", "msedge", "msedge-beta".
    channel: 'chrome',

    // Run browser in headless mode.
    headless: false,

    // Change the default data-testid attribute.
    testIdAttribute: 'pw-test-id'
  }
});
```

LANGUAGE: APIDOC
CODE:
```
testOptions.actionTimeout: Timeout for each Playwright action in milliseconds. Defaults to 0 (no timeout). Learn more about timeouts and how to set them for a single test.
testOptions.browserName: Name of the browser that runs tests. Defaults to 'chromium'. Options include chromium, firefox, or webkit.
testOptions.bypassCSP: Toggles bypassing Content-Security-Policy. Useful when CSP includes the production origin. Defaults to false.
testOptions.channel: Browser channel to use. Learn more about different browsers and channels.
testOptions.headless: Whether to run the browser in headless mode meaning no browser is shown when running tests. Defaults to true.
testOptions.testIdAttribute: Changes the default data-testid attribute used by Playwright locators.
```

----------------------------------------

TITLE: Playwright Page Object Methods Reference
DESCRIPTION: A comprehensive list of methods available on the Playwright `Page` object, enabling interaction with web elements, managing navigation, and handling events. These methods are used for querying elements, performing actions like clicks and fills, checking states, and waiting for conditions.
SOURCE: https://playwright.dev/docs/intro/api/class-page

LANGUAGE: APIDOC
CODE:
```
Page Methods:
  $
  $$
  $eval
  $$eval
  accessibility
  check
  click
  dblclick
  dispatchEvent
  fill
  focus
  getAttribute
  hover
  innerHTML
  innerText
  inputValue
  isChecked
  isDisabled
  isEditable
  isEnabled
  isHidden
  isVisible
  press
  selectOption
  setChecked
  setInputFiles
  tap
  textContent
  type
  uncheck
  waitForNavigation
  waitForSelector
  waitForTimeout
```

----------------------------------------

TITLE: Web-First Assertions with Playwright expect
DESCRIPTION: Demonstrates how Playwright's `expect` function now supports web-first assertions, which automatically re-test elements until a condition is met or a timeout is reached. It highlights the `toHaveText` assertion and explains the re-testing mechanism.
SOURCE: https://playwright.dev/docs/intro/release-notes

LANGUAGE: JavaScript
CODE:
```
await expect(page.locator('.status')).toHaveText('Submitted');
```

----------------------------------------

TITLE: Locating Elements by Implicit Role with Playwright's getByRole
DESCRIPTION: Demonstrates how to use `page.getByRole` to locate common DOM elements like headings, checkboxes, and buttons based on their implicit ARIA roles and accessible names. This method is useful for robust and accessible element selection in Playwright tests.
SOURCE: https://playwright.dev/docs/intro/api/class-page

LANGUAGE: javascript
CODE:
```
await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

await page.getByRole('checkbox', { name: 'Subscribe' }).check();

await page.getByRole('button', { name: /submit/i }).click();
```

----------------------------------------

TITLE: Handle and Mock Playwright Network Requests
DESCRIPTION: This snippet demonstrates how to intercept and fulfill network requests using `page.route()` or `browserContext.route()`, allowing you to mock API endpoints with custom status codes and body content for testing purposes.
SOURCE: https://playwright.dev/docs/intro/network

LANGUAGE: JavaScript
CODE:
```
await page.route('**/api/fetch_data', route => route.fulfill({
  status: 200,
  body: testData
}));
await page.goto('https://example.com');

```

LANGUAGE: JavaScript
CODE:
```
await browserContext.route('**/api/login', route => route.fulfill({
  status: 200,
  body: 'accept'
}));
await page.goto('https://example.com');

```

----------------------------------------

TITLE: Playwright Test: Create Worker-Specific Database User Fixture
DESCRIPTION: This TypeScript code defines a Playwright test fixture (`dbUserName`) that creates a unique user in a test database for each worker process. It leverages `test.info().workerIndex` to ensure data isolation between parallel tests and includes cleanup logic to delete the user after tests are done.
SOURCE: https://playwright.dev/docs/intro/test-parallel

LANGUAGE: TypeScript
CODE:
```
import { test as baseTest, expect } from '@playwright/test';
// Import project utils for managing users in the test database.
import { createUserInTestDatabase, deleteUserFromTestDatabase } from './my-db-utils';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { dbUserName: string }>(
  // Returns db user name unique for the worker.
  {
    dbUserName: [async ({ }, use) => {
      // Use workerIndex as a unique identifier for each worker.
      const userName = `user-${test.info().workerIndex}`;
      // Initialize user in the database.
      await createUserInTestDatabase(userName);
      await use(userName);
      // Clean up after the tests are done.
      await deleteUserFromTestDatabase(userName);
    }, { scope: 'worker' }],
  },
);
```

----------------------------------------

TITLE: Filling Text Input Fields with Playwright
DESCRIPTION: The `locator.fill()` method is the simplest way to populate form fields. It focuses the element and triggers an `input` event with the provided text. This method is compatible with `<input>`, `<textarea>`, and `[contenteditable]` elements, supporting various input types like text, date, and time.
SOURCE: https://playwright.dev/docs/intro/input

LANGUAGE: Node.js
CODE:
```
// Text input
await page.getByRole('textbox').fill('Peter');

// Date input
await page.getByLabel('Birth date').fill('2020-02-02');

// Time input
await page.getByLabel('Appointment time').fill('13:15');

// Local datetime input
await page.getByLabel('Local time').fill('2020-03-02T05:15');
```

----------------------------------------

TITLE: Initialize Playwright Project using npm init
DESCRIPTION: This command provides a convenient way to set up a new Playwright Test project or configure an existing one. It generates a Playwright Test configuration file, optional examples, a GitHub Action workflow, and a first test file (`example.spec.ts`).
SOURCE: https://playwright.dev/docs/intro/release-notes

LANGUAGE: bash
CODE:
```
# Run from your project's root directory
npm init playwright@latest
# Or create a new project
npm init playwright@latest new-project
```

----------------------------------------

TITLE: Create and Interact with a Single Playwright Page
DESCRIPTION: Demonstrates how to create a new page within a browser context, navigate to a URL, fill an input field, click an element, and retrieve the current page URL. This snippet illustrates basic page interactions.
SOURCE: https://playwright.dev/docs/intro/pages

LANGUAGE: Node.js
CODE:
```
// Create a page.
const page = await context.newPage();

// Navigate explicitly, similar to entering a URL in the browser.
await page.goto('http://example.com');
// Fill an input.
await page.locator('#search').fill('query');

// Navigate implicitly by clicking a link.
await page.locator('#submit').click();
// Expect a new url.
console.log(page.url());
```

----------------------------------------

TITLE: Import and Utilize Global Playwright Fixtures in Test Files
DESCRIPTION: This TypeScript snippet demonstrates how to import the custom `test` object, which includes the globally defined `forEachWorker` fixture, into a Playwright test file. By importing from `./fixtures`, the global `beforeAll`/`afterAll` hooks defined in `fixtures.ts` are automatically applied to tests within this file.
SOURCE: https://playwright.dev/docs/intro/test-fixtures

LANGUAGE: TypeScript
CODE:
```
import { test } from './fixtures';
import { expect } from '@playwright/test';

test('basic', async ({ }) => {
  // ...
});
```

----------------------------------------

TITLE: Perform Aria Snapshot Assertion in Playwright
DESCRIPTION: This code snippet demonstrates how to use Playwright's `toMatchAriaSnapshot` to assert the accessibility tree of a page element. It navigates to 'https://playwright.dev/' and then checks if the 'banner' role element's accessibility structure matches the provided snapshot template, including headings and links.
SOURCE: https://playwright.dev/docs/intro/aria-snapshots

LANGUAGE: Node.js
CODE:
```
await page.goto('https://playwright.dev/');
await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
  - banner:
    - heading /Playwright enables reliable end-to-end/ [level=1]
    - link "Get started"
    - link "Star microsoft/playwright on GitHub"
    - link /[\\d]+k\\+ stargazers on GitHub/
`);
```

----------------------------------------

TITLE: Playwright page.route API Reference
DESCRIPTION: Detailed API documentation for the `page.route` method in Playwright. It specifies the parameters (`url`, `handler`, `options`) including their types and descriptions, and the return type of the method. This method is central to network request interception and modification.
SOURCE: https://playwright.dev/docs/intro/api/class-page

LANGUAGE: APIDOC
CODE:
```
page.route(url, handler, options)

Arguments:
  url: string | RegExp | function(URL):boolean
    Description: A glob pattern, regex pattern, or predicate that receives a URL to match during routing. If baseURL is set in the context options and the provided URL is a string that does not start with *, it is resolved using the new URL() constructor.
  handler: function(Route, Request):Promise<Object> | Object
    Description: handler function to route the request.
  options: Object (optional)
    Properties:
      times: number (optional)
        Description: How often a route should be used. By default it will be used every time. (Added in: v1.15)

Returns:
  Promise<void>
```

----------------------------------------

TITLE: Run Playwright Tests from Command Line
DESCRIPTION: Command to execute Playwright tests using the npx utility, which runs packages from the npm registry without explicitly installing them globally.
SOURCE: https://playwright.dev/docs/intro/release-notes

LANGUAGE: bash
CODE:
```
npx playwright test
```

----------------------------------------

TITLE: Install Playwright with npm, yarn, or pnpm
DESCRIPTION: This section provides commands to initialize and install Playwright using popular Node.js package managers: npm, yarn, and pnpm. The installation process allows choosing between TypeScript or JavaScript, naming the tests folder, adding a GitHub Actions workflow, and installing Playwright browsers.
SOURCE: https://playwright.dev/docs/intro/intro

LANGUAGE: npm
CODE:
```
npm init playwright@latest
```

LANGUAGE: yarn
CODE:
```
yarn create playwright
```

LANGUAGE: pnpm
CODE:
```
pnpm create playwright
```

----------------------------------------

TITLE: Scanning an entire page for accessibility violations with Playwright and Axe-core
DESCRIPTION: This example demonstrates how to perform a full-page accessibility scan using `@axe-core/playwright` within a Playwright test. It imports the necessary packages, navigates to a URL, runs `AxeBuilder.analyze()`, and asserts that no violations are found.
SOURCE: https://playwright.dev/docs/intro/accessibility-testing

LANGUAGE: TypeScript
CODE:
```
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

test.describe('homepage', () => { // 2
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://your-site.com/'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});
```

LANGUAGE: JavaScript
CODE:
```
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default; // 1

test.describe('homepage', () => { // 2
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://your-site.com/'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});
```

----------------------------------------

TITLE: Playwright browserContext.route API Reference
DESCRIPTION: Detailed API documentation for the `browserContext.route` method in Playwright. It outlines the parameters (`url`, `handler`, `options` including `times`) and their types, descriptions, and the method's return type. This method is used for intercepting and modifying network requests.
SOURCE: https://playwright.dev/docs/intro/api/class-browsercontext

LANGUAGE: APIDOC
CODE:
```
browserContext.route(
  url: string | RegExp | function(URL): boolean,
  handler: function(Route, Request): Promise<Object> | Object,
  options?: Object
)

Arguments:
  url: string | RegExp | function(URL): boolean
    A glob pattern, regex pattern, or predicate that receives a URL to match during routing. If baseURL is set in the context options and the provided URL is a string that does not start with *, it is resolved using the new URL() constructor.
  handler: function(Route, Request): Promise<Object> | Object
    Handler function to route the request.
  options?: Object
    times?: number (optional, Added in: v1.15)
      How often a route should be used. By default it will be used every time.

Returns:
  Promise<void>
```

----------------------------------------

TITLE: Configure Playwright Expect Assertion Timeout
DESCRIPTION: This snippet demonstrates how to set the timeout for Playwright assertions (e.g., `expect`). The `expect.timeout` property in the configuration or the `timeout` option in the assertion method specifies the maximum duration for an assertion to pass.
SOURCE: https://playwright.dev/docs/intro/test-timeouts

LANGUAGE: TypeScript
CODE:
```
// In playwright.config.ts
export default defineConfig({
  expect: {
    timeout: 10_000
  }
});

// In a test file
expect(locator).toBeVisible({ timeout: 10_000 });
```

----------------------------------------

TITLE: Detect Playwright Test Retries at Runtime
DESCRIPTION: Demonstrates how to use `testInfo.retry` within a Playwright test or hook to detect if the current test execution is a retry attempt. This allows for conditional logic, such as clearing server-side state, to ensure test independence and reliability during retries.
SOURCE: https://playwright.dev/docs/intro/test-retries

LANGUAGE: typescript
CODE:
```
import { test, expect } from '@playwright/test';

test('my test', async ({ page }, testInfo) => {
  if (testInfo.retry)
    await cleanSomeCachesOnTheServer();
  // ...
});
```

----------------------------------------

TITLE: Playwright Test Runner: Automatic Browser Context Isolation
DESCRIPTION: Demonstrates how Playwright's test runner automatically provides an isolated BrowserContext and page for each test, ensuring complete separation between tests.
SOURCE: https://playwright.dev/docs/intro/browser-contexts

LANGUAGE: JavaScript
CODE:
```
import { test } from '@playwright/test';

test('example test', async ({ page, context }) => {
  // "context" is an isolated BrowserContext, created for this specific test.
  // "page" belongs to this context.
});

test('another test', async ({ page, context }) => {
  // "context" and "page" in this second test are completely
  // isolated from the first test.
});
```

----------------------------------------

TITLE: Pause Playwright Test Execution
DESCRIPTION: Inserts a breakpoint in a Playwright test, pausing execution and allowing the user to interact with the browser and open developer tools for inspection. This is equivalent to setting a breakpoint in a debugger.
SOURCE: https://playwright.dev/docs/intro/debug

LANGUAGE: JavaScript
CODE:
```
await page.pause();
```

----------------------------------------

TITLE: Run Playwright Tests in Headed Browser Mode
DESCRIPTION: Run Playwright tests with a visible browser window using the '--headed' flag. This allows you to visually observe how Playwright interacts with the web application during test execution.
SOURCE: https://playwright.dev/docs/intro/running-tests

LANGUAGE: Shell
CODE:
```
npx playwright test --headed
```

----------------------------------------

TITLE: Retrying Code Blocks Until Assertions Pass with Playwright expect().toPass()
DESCRIPTION: This example shows how to use `expect(async () => { ... }).toPass()` to repeatedly execute an asynchronous code block until all assertions within it pass. This is particularly useful for handling eventual consistency or dynamic UI states in tests, ensuring reliability.
SOURCE: https://playwright.dev/docs/intro/release-notes

LANGUAGE: TypeScript
CODE:
```
await expect(async () => {
  const response = await page.request.get('https://api.example.com');
  await expect(response).toBeOK();
}).toPass();
```