---
applyTo: '*.spec.ts'
---

TITLE: Running Playwright Tests for Specific Projects
DESCRIPTION: Commands to run Playwright tests on all configured projects or on a specific project. The output shows how test results are displayed with project names.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-projects-js.md#2025-04-22_snippet_1

LANGUAGE: bash
CODE:
```
npx playwright test

Running 7 tests using 5 workers

  ✓ [chromium] › example.spec.ts:3:1 › basic test (2s)
  ✓ [firefox] › example.spec.ts:3:1 › basic test (2s)
  ✓ [webkit] › example.spec.ts:3:1 › basic test (2s)
  ✓ [Mobile Chrome] › example.spec.ts:3:1 › basic test (2s)
  ✓ [Mobile Safari] › example.spec.ts:3:1 › basic test (2s)
  ✓ [Microsoft Edge] › example.spec.ts:3:1 › basic test (2s)
  ✓ [Google Chrome] › example.spec.ts:3:1 › basic test (2s)
```

----------------------------------------

TITLE: Running Playwright Tests on a Single Project
DESCRIPTION: Command to run tests on a specific Playwright project using the --project flag, which allows targeting tests to a particular browser or configuration.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-projects-js.md#2025-04-22_snippet_2

LANGUAGE: bash
CODE:
```
npx playwright test --project=firefox

Running 1 test using 1 worker

  ✓ [firefox] › example.spec.ts:3:1 › basic test (2s)
```

----------------------------------------

TITLE: Splitting Playwright Tests into Different Projects
DESCRIPTION: Configuration that splits tests into separate projects based on file patterns. This example defines a 'Smoke' project for critical tests with no retries and a 'Default' project for all other tests with retries.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-projects-js.md#2025-04-22_snippet_4

LANGUAGE: javascript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Timeout is shared between all tests.
  projects: [
    {
      name: 'Smoke',
      testMatch: /.*smoke.spec.ts/,
      retries: 0,
    },
    {
      name: 'Default',
      testIgnore: /.*smoke.spec.ts/,
      retries: 2,
    },
  ],
});
```

----------------------------------------

TITLE: Configuring Project Dependencies in Playwright
DESCRIPTION: Configuration that sets up a dependency structure where browser-specific projects depend on a common setup project. This ensures setup tasks run before the actual tests across different browsers.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-projects-js.md#2025-04-22_snippet_5

LANGUAGE: javascript
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
  ],
});
```

----------------------------------------

TITLE: Configuring Multiple Test Projects with Different Directories in Playwright
DESCRIPTION: Shows how to configure multiple test projects in Playwright, including smoke tests for different browsers and a separate project for Chrome stable. Each project uses a different test directory.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testproject.md#2025-04-22_snippet_4

LANGUAGE: javascript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Smoke Chromium',
      testDir: './smoke-tests',
      use: {
        browserName: 'chromium',
      }
    },
    {
      name: 'Smoke WebKit',
      testDir: './smoke-tests',
      use: {
        browserName: 'webkit',
      }
    },
    {
      name: 'Smoke Firefox',
      testDir: './smoke-tests',
      use: {
        browserName: 'firefox',
      }
    },
    {
      name: 'Chrome Stable',
      testDir: './',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      }
    },
  ],
});
```

----------------------------------------

TITLE: Configuring Setup and Teardown Projects in Playwright
DESCRIPTION: Demonstrates how to set up projects with dependencies and teardown in a Playwright configuration file. It includes setup, teardown, and browser-specific projects.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testproject.md#2025-04-22_snippet_3

LANGUAGE: javascript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /global.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'teardown',
      testMatch: /global.teardown\.ts/,
    },
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
      dependencies: ['setup'],
    },
  ],
});
```

----------------------------------------

TITLE: Building Vue 3 Project for Production
DESCRIPTION: Command to compile and minify the Vue 3 project for production deployment.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-vue-vite/README.md#2025-04-22_snippet_2

LANGUAGE: sh
CODE:
```
npm run build
```

----------------------------------------

TITLE: Configuring Project Dependencies in Playwright Config
DESCRIPTION: Configuration example showing how to set up project dependencies for global setup in playwright.config.ts. Demonstrates setting up a database project that other test projects depend on.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-global-setup-teardown-js.md#2025-04-22_snippet_0

LANGUAGE: typescript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // ...
  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
    },
    // {
    //   other project
    // }
  ]
});
```

----------------------------------------

TITLE: Configuring Worker Limits for Projects in Playwright
DESCRIPTION: Shows how to set worker limits for different projects in Playwright. It demonstrates setting a global worker limit and a specific limit for one project.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testproject.md#2025-04-22_snippet_6

LANGUAGE: javascript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 10,  // total workers limit

  projects: [
    {
      name: 'runs in parallel',
    },
    {
      name: 'one at a time',
      workers: 1,  // workers limit for this project
    },
  ],
});
```

----------------------------------------

TITLE: Configuring snapshotPathTemplate with projects
DESCRIPTION: Shows how the `snapshotPathTemplate` behaves when used with Playwright projects, specifically demonstrating the effect of the `{/projectName}` token when projects are defined with or without names.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/api/params.md#_snippet_36

LANGUAGE: javascript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotPathTemplate: '__screenshots__{/projectName}/{testFilePath}/{arg}{ext}',
  testMatch: 'example.spec.ts',
  projects: [
    { use: { browserName: 'firefox' } },
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
```

----------------------------------------

TITLE: Configuring Project Dependencies in Playwright Tests
DESCRIPTION: Setting up project dependencies to run certain tests before others. This example shows how to configure a setup project that must run before any browser-specific projects, allowing global setup to produce traces and artifacts.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testproject.md#2025-04-22_snippet_1

LANGUAGE: js
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /global.setup\.ts/,
    },
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
      dependencies: ['setup'],
    },
  ],
});
```

----------------------------------------

TITLE: Setting Browser Options for a Specific Project in Playwright
DESCRIPTION: Demonstrates how to set browser options for a specific project in the Playwright configuration file. This example sets the browserName to 'chromium' for a project named 'Chromium'.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testproject.md#2025-04-22_snippet_5

LANGUAGE: javascript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
```

----------------------------------------

TITLE: Installing Dependencies for Vue 3 Project
DESCRIPTION: Command to install all required dependencies for the Vue 3 project as defined in package.json.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-vue-vite/README.md#2025-04-22_snippet_0

LANGUAGE: sh
CODE:
```
npm install
```

----------------------------------------

TITLE: Configuring Multiple Test Projects with Different Browsers in Playwright
DESCRIPTION: Example configuration that runs every test in Chromium, Firefox and WebKit, both Desktop and Mobile versions. This shows how to set up multiple test projects in the configuration file, with shared options and project-specific settings.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testproject.md#2025-04-22_snippet_0

LANGUAGE: js
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

TITLE: Building Vue project for production
DESCRIPTION: Compiles and minifies the Vue.js application for production deployment, creating optimized assets.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-vue-cli/README.md#2025-04-22_snippet_2

LANGUAGE: bash
CODE:
```
npm run build
```

----------------------------------------

TITLE: Configuring Playwright Projects for Multiple Browsers
DESCRIPTION: This configuration demonstrates how to set up Playwright projects to run tests across different browsers including Chromium, Firefox, WebKit, mobile viewports, and branded browsers like Microsoft Edge and Google Chrome.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-projects-js.md#2025-04-22_snippet_0

LANGUAGE: javascript
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

TITLE: Configuring Parameterized Projects in JavaScript
DESCRIPTION: This configuration file defines multiple test projects with different values for the custom 'person' option, allowing tests to be run in multiple configurations.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-parameterize-js.md#2025-04-22_snippet_6

LANGUAGE: javascript
CODE:
```
// @ts-check

module.exports = defineConfig({
  projects: [
    {
      name: 'alice',
      use: { person: 'Alice' },
    },
    {
      name: 'bob',
      use: { person: 'Bob' },
    },
  ]
});
```

----------------------------------------

TITLE: Configuring Parameterized Projects in TypeScript
DESCRIPTION: This TypeScript configuration file defines multiple test projects with different values for the custom 'person' option, allowing tests to be run in multiple configurations with proper type checking.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-parameterize-js.md#2025-04-22_snippet_7

LANGUAGE: typescript
CODE:
```
import { defineConfig } from '@playwright/test';
import type { TestOptions } from './my-test';

export default defineConfig<TestOptions>({
  projects: [
    {
      name: 'alice',
      use: { person: 'Alice' },
    },
    {
      name: 'bob',
      use: { person: 'Bob' },
    },
  ]
});
```

----------------------------------------

TITLE: Configuring Playwright Projects for Multiple Environments
DESCRIPTION: Configuration to run tests against different environments (staging and production) with different retry settings. This setup allows testing the same test suite against multiple target environments.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-projects-js.md#2025-04-22_snippet_3

LANGUAGE: javascript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Timeout is shared between all tests.
  projects: [
    {
      name: 'staging',
      use: {
        baseURL: 'staging.example.com',
      },
      retries: 2,
    },
    {
      name: 'production',
      use: {
        baseURL: 'production.example.com',
      },
      retries: 0,
    },
  ],
});
```

----------------------------------------

TITLE: Setting Up Playwright in a .NET Console Project
DESCRIPTION: Commands to create a new console project, add the Playwright package, build the project, and install required browsers.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/library-csharp.md#2025-04-23_snippet_0

LANGUAGE: bash
CODE:
```
# Create project
dotnet new console -n PlaywrightDemo
cd PlaywrightDemo

# Add project dependency
dotnet add package Microsoft.Playwright
# Build the project
dotnet build
# Install required browsers - replace netX with actual output folder name, e.g. net8.0.
pwsh bin/Debug/netX/playwright.ps1 install

# If the pwsh command does not work (throws TypeNotFound), make sure to use an up-to-date version of PowerShell.
dotnet tool update --global PowerShell
```

----------------------------------------

TITLE: Accessing Project Configuration in JavaScript
DESCRIPTION: Retrieves the processed project configuration from the configuration file. This property provides access to the full project configuration object.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-workerinfo.md#2025-04-22_snippet_2

LANGUAGE: javascript
CODE:
```
workerInfo.project
```

----------------------------------------

TITLE: Building Project and Installing Browsers
DESCRIPTION: Commands to build the project and install required browser dependencies using PowerShell
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/intro-csharp.md#2025-04-23_snippet_2

LANGUAGE: bash
CODE:
```
dotnet build
```

LANGUAGE: bash
CODE:
```
pwsh bin/Debug/net8.0/playwright.ps1 install
```

----------------------------------------

TITLE: Linting Vue project files
DESCRIPTION: Runs linting tools to check for code errors and enforce coding standards, with automatic fixes where possible.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-vue-cli/README.md#2025-04-22_snippet_3

LANGUAGE: bash
CODE:
```
npm run lint
```

----------------------------------------

TITLE: Creating a New Svelte Project with degit
DESCRIPTION: Commands to create a new Svelte application using the degit tool to clone the official template repository and navigate to the project directory.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-svelte/README.md#2025-04-22_snippet_0

LANGUAGE: bash
CODE:
```
npx degit sveltejs/template svelte-app
cd svelte-app
```

----------------------------------------

TITLE: Project Dependencies with Chrome Configuration
DESCRIPTION: Extended playwright config showing how to set up Chrome project with database dependencies and device configurations.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-global-setup-teardown-js.md#2025-04-22_snippet_1

LANGUAGE: typescript
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // ...
  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chromium with db',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup db'],
    },
  ]
});
```

----------------------------------------

TITLE: Installing dependencies for Vue CLI project
DESCRIPTION: Installs all required dependencies for the Vue.js project as defined in package.json.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-vue-cli/README.md#2025-04-22_snippet_0

LANGUAGE: bash
CODE:
```
npm install
```

----------------------------------------

TITLE: Matrix Sharding for Playwright Tests in GitLab CI (JavaScript)
DESCRIPTION: This YAML configuration sets up matrix sharding for Playwright tests in GitLab CI using JavaScript. It defines a matrix of projects and shards, resulting in multiple parallel jobs with different combinations of project and shard values.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_38

LANGUAGE: yml
CODE:
```
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
  parallel:
    matrix:
      - PROJECT: ['chromium', 'webkit']
        SHARD: ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10', '8/10', '9/10', '10/10']
  script:
    - npm ci
    - npx playwright test --project=$PROJECT --shard=$SHARD
```

----------------------------------------

TITLE: Teardown Configuration in Playwright Config
DESCRIPTION: Configuration example showing how to set up project teardown after all dependent projects have run.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-global-setup-teardown-js.md#2025-04-22_snippet_4

LANGUAGE: typescript
CODE:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // ...
  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
      teardown: 'cleanup db',
    },
    {
      name: 'cleanup db',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup db'],
    },
  ]
});
```

----------------------------------------

TITLE: Installing Dependencies for a Svelte Project
DESCRIPTION: Commands to navigate to the project directory and install the required Node.js dependencies using npm.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-svelte/README.md#2025-04-22_snippet_1

LANGUAGE: bash
CODE:
```
cd svelte-app
npm install
```

----------------------------------------

TITLE: Configuring Bitbucket Pipelines for Playwright Tests (Multiple Languages)
DESCRIPTION: These YAML snippets configure Bitbucket Pipelines to use Playwright Docker images for running tests in JavaScript, Python, Java, and C# projects.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_35

LANGUAGE: yml
CODE:
```
image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
```

LANGUAGE: yml
CODE:
```
image: mcr.microsoft.com/playwright/python:v%%VERSION%%-noble
```

LANGUAGE: yml
CODE:
```
image: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble
```

LANGUAGE: yml
CODE:
```
image: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble
```

----------------------------------------

TITLE: Deploying a Svelte App to Vercel
DESCRIPTION: Commands to navigate to the public directory and deploy the Svelte application to Vercel with a custom project name.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-svelte/README.md#2025-04-22_snippet_8

LANGUAGE: bash
CODE:
```
cd public
vercel deploy --name my-project
```

----------------------------------------

TITLE: Setting Up TypeScript in a Svelte Project
DESCRIPTION: Command to run the included setup script that configures a TypeScript development environment for a Svelte project.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-svelte/README.md#2025-04-22_snippet_5

LANGUAGE: bash
CODE:
```
node scripts/setupTypeScript.js
```

----------------------------------------

TITLE: Creating New Test Project with .NET CLI
DESCRIPTION: Commands to create a new test project using dotnet CLI for different test frameworks (NUnit, MSTest, xUnit)
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/intro-csharp.md#2025-04-23_snippet_0

LANGUAGE: bash
CODE:
```
dotnet new nunit -n PlaywrightTests
cd PlaywrightTests
```

LANGUAGE: bash
CODE:
```
dotnet new mstest -n PlaywrightTests
cd PlaywrightTests
```

LANGUAGE: bash
CODE:
```
dotnet new xunit -n PlaywrightTests
cd PlaywrightTests
```

----------------------------------------

TITLE: Running tests on different browsers using Playwright for JavaScript
DESCRIPTION: This snippet is a configuration file to setup multiple test projects using Playwright for running tests across various browsers and devices. Each project specifies a different browser or device configuration. No dependencies are specifically required beyond Playwright itself.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/browsers.md#2025-04-22_snippet_6

LANGUAGE: js
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    /* Test against desktop browsers */
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
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // or 'chrome-beta'
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
    },
  ],
});
```

----------------------------------------

TITLE: Installing and Building Playwright for Bidi Testing
DESCRIPTION: Initial setup commands to clone Playwright repository, build the project, install Chromium, and run Bidi tests for Firefox projects.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/bidi/README.md#2025-04-22_snippet_0

LANGUAGE: sh
CODE:
```
git clone https://github.com/microsoft/playwright.git
cd playwright
npm run build # call `npm run watch` for watch mode
npx playwright install chromium
npm run biditest -- --project='moz-firefox-*'
```

----------------------------------------

TITLE: Configuring Playwright Platform Drivers in .NET Project Files
DESCRIPTION: XML configuration options for specifying which platform drivers to include when bundling Playwright in a .NET project.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/library-csharp.md#2025-04-23_snippet_4

LANGUAGE: xml
CODE:
```
<PropertyGroup>
  <PlaywrightPlatform>all</PlaywrightPlatform>
</PropertyGroup>
```

LANGUAGE: xml
CODE:
```
<PropertyGroup>
  <PlaywrightPlatform>osx;linux</PlaywrightPlatform>
</PropertyGroup>
```

----------------------------------------

TITLE: Initialize Playwright Test Project (Shell)
DESCRIPTION: This command initializes Playwright Test in the current directory or creates a new project directory with Playwright configured. It sets up the necessary files like the configuration and example tests.
SOURCE: https://github.com/microsoft/playwright/blob/main/README.md#_snippet_0

LANGUAGE: Shell
CODE:
```
# Run from your project's root directory
npm init playwright@latest
# Or create a new project
npm init playwright@latest new-project
```

----------------------------------------

TITLE: Running Vue project in development mode
DESCRIPTION: Starts the development server with hot-reload functionality for real-time updates during development.
SOURCE: https://github.com/microsoft/playwright/blob/main/tests/components/ct-vue-cli/README.md#2025-04-22_snippet_1

LANGUAGE: bash
CODE:
```
npm run serve
```

----------------------------------------

TITLE: Configuring CircleCI for Playwright Tests (Multiple Languages)
DESCRIPTION: This YAML configuration defines CircleCI executors for running Playwright tests in Docker containers for JavaScript, Python, Java, and C# projects. It specifies the appropriate Playwright Docker image for each language.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_32

LANGUAGE: yml
CODE:
```
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
```

LANGUAGE: yml
CODE:
```
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright/python:v%%VERSION%%-noble
```

LANGUAGE: yml
CODE:
```
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble
```

LANGUAGE: yml
CODE:
```
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble
```

----------------------------------------

TITLE: GitHub Actions Workflow for C# Playwright in Containers
DESCRIPTION: The YAML configuration defines a workflow for running C# Playwright tests using Docker containers in GitHub Actions, ensuring a controlled environment. The setup is efficient for CI operations, triggered upon main branch activities.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_16

LANGUAGE: yml
CODE:
```
name: Playwright Tests\non:\n  push:\n    branches: [ main, master ]\n  pull_request:\n    branches: [ main, master ]\njobs:\n  playwright:\n    name: 'Playwright Tests'\n    runs-on: ubuntu-latest\n    container:\n      image: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble\n      options: --user 1001\n    steps:\n      - uses: actions/checkout@v4\n      - name: Setup dotnet\n        uses: actions/setup-dotnet@v4\n        with:\n          dotnet-version: 8.0.x\n      - run: dotnet build\n      - name: Run your tests\n        run: dotnet test
```

----------------------------------------

TITLE: Initializing Playwright Project via pnpm - Bash
DESCRIPTION: Creates a Playwright test project using pnpm, generating configuration and example tests interactively. Requires Node.js and pnpm installed. Allows customization of test folder, test language, browser download, and CI workflow setup. Installs Playwright-related packages as development dependencies within the project.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/intro-js.md#2025-04-22_snippet_2

LANGUAGE: bash
CODE:
```
pnpm create playwright
```

----------------------------------------

TITLE: Testing Across All Browsers by Configuring Playwright Projects (JavaScript)
DESCRIPTION: Provides a sample Playwright configuration file (playwright.config.ts) to enable running test projects across Chromium, Firefox, and WebKit using device emulation. Uses the defineConfig and devices utilities from the Playwright test module. Input: none (config file structure). Output: configuration object specifying browser projects. Requires dependencies: '@playwright/test' and device descriptors.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/best-practices-js.md#2025-04-22_snippet_9

LANGUAGE: javascript
CODE:
```
import { defineConfig, devices } from '@playwright/test';\n\nexport default defineConfig({\n  projects: [\n    {\n      name: 'chromium',\n      use: { ...devices['Desktop Chrome'] },\n    },\n    {\n      name: 'firefox',\n      use: { ...devices['Desktop Firefox'] },\n    },\n    {\n      name: 'webkit',\n      use: { ...devices['Desktop Safari'] },\n    },\n  ],\n});
```

----------------------------------------

TITLE: Configuring Azure Pipelines for Playwright Tests (C#)
DESCRIPTION: This YAML configuration sets up Azure Pipelines to run Playwright tests in a containerized environment for a C# project. It uses the official Playwright .NET Docker image, sets up .NET SDK 8.0, builds the project, and runs the tests.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_31

LANGUAGE: yml
CODE:
```
trigger:
- main

pool:
  vmImage: ubuntu-latest
container: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble

steps:
- task: UseDotNet@2
  inputs:
    packageType: sdk
    version: '8.0.x'
  displayName: 'Use .NET SDK'

- script: dotnet build --configuration Release
  displayName: 'Build'
- script: dotnet test --configuration Release
  displayName: 'Run tests'
```

----------------------------------------

TITLE: Handling Multiple Potential Elements with or_ - Python
DESCRIPTION: Shows how to use the `Locator.or_` method in Python to create a locator that matches either of two potential elements. The example demonstrates waiting for either a 'New email' button or a security settings dialog and taking action based on which element becomes visible.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/release-notes-python.md#_snippet_23

LANGUAGE: python
CODE:
```
new_email = page.get_by_role("button", name="New email")
dialog = page.get_by_text("Confirm security settings")
expect(new_email.or_(dialog)).is_visible()
if (dialog.is_visible()):
  page.get_by_role("button", name="Dismiss").click()
new_email.click()
```

----------------------------------------

TITLE: Configure Playwright Projects with Custom Option (TypeScript)
DESCRIPTION: Demonstrates how to configure different Playwright projects ('shopping', 'wellbeing') by providing specific values for the custom 'defaultItem' option defined in 'my-test.ts' using the 'use' property in the config file.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-fixtures-js.md#_snippet_17

LANGUAGE: TypeScript
CODE:
```
import { defineConfig } from '@playwright/test';
import type { MyOptions } from './my-test';

export default defineConfig<MyOptions>({
  projects: [
    {
      name: 'shopping',
      use: { defaultItem: 'Buy milk' },
    },
    {
      name: 'wellbeing',
      use: { defaultItem: 'Exercise!' },
    },
  ]
});
```

----------------------------------------

TITLE: GitHub Actions Workflow for C# Playwright
DESCRIPTION: This document snippet provides a GitHub Actions workflow for running Playwright tests in C# projects. It handles setup and execution on push/pull to main branches, manages dependencies and test execution, particularly for the .NET environment.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_12

LANGUAGE: yml
CODE:
```
name: Playwright Tests\non:\n  push:\n    branches: [ main, master ]\n  pull_request:\n    branches: [ main, master ]\njobs:\n  test:\n    timeout-minutes: 60\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v4\n    - name: Setup dotnet\n      uses: actions/setup-dotnet@v4\n      with:\n        dotnet-version: 8.0.x\n    - name: Build & Install\n      run: dotnet build\n    - name: Ensure browsers are installed\n      run: pwsh bin/Debug/net8.0/playwright.ps1 install --with-deps\n    - name: Run your tests\n      run: dotnet test
```

----------------------------------------

TITLE: Installing Playwright Canary Release via NPM in Bash
DESCRIPTION: This Bash snippet installs the latest canary (unreleased) version of the @playwright/test package using npm with the '@next' tag. To use, developers should have Node.js and npm installed, and should run this in the root directory of their Node.js project. The '@next' tag ensures that the prerelease version is installed as a dev dependency, unlocking access to daily features before they reach stable release. The command takes no parameters and produces no direct output; instead, it updates the project's package.json and installs the prerelease package.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/canary-releases-js.md#2025-04-22_snippet_0

LANGUAGE: bash
CODE:
```
npm install -D @playwright/test@next
```

----------------------------------------

TITLE: Configuring GitLab CI for Playwright Tests (Multiple Languages)
DESCRIPTION: These YAML configurations set up GitLab CI to run Playwright tests using Docker images for JavaScript, Python, Java, and C# projects. Each configuration specifies the appropriate Playwright Docker image for the test stage.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_36

LANGUAGE: yml
CODE:
```
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
  script:
  ...
```

LANGUAGE: yml
CODE:
```
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright/python:v%%VERSION%%-noble
  script:
  ...
```

LANGUAGE: yml
CODE:
```
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble
  script:
  ...
```

LANGUAGE: yml
CODE:
```
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble
  script:
  ...
```

----------------------------------------

TITLE: Configure Project-Specific Locale in Playwright
DESCRIPTION: This snippet demonstrates how to override the global locale setting for a specific project (e.g., 'chromium') by defining the 'locale' option within the project's 'use' property in the Playwright configuration file.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/test-use-options-js.md#_snippet_9

LANGUAGE: TypeScript
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'de-DE'
      }
    }
  ]
});
```

----------------------------------------

TITLE: Configuring Playwright Authentication Projects with JavaScript
DESCRIPTION: Defines a Playwright configuration file to manage multiple test projects, including setups for different browsers and authentication states. This ensures tests start in an authenticated state as specified.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/auth.md#2025-04-22_snippet_4

LANGUAGE: javascript
CODE:
```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

----------------------------------------

TITLE: Combining Locators with and_ - Python
DESCRIPTION: Illustrates how to use the `Locator.and_` method in Python to create a new locator that matches elements that satisfy the conditions of *both* the original locator and the locator provided as an argument.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/release-notes-python.md#_snippet_22

LANGUAGE: python
CODE:
```
button = page.get_by_role("button").and_(page.get_by_title("Subscribe"))
```

----------------------------------------

TITLE: GitHub Actions Workflow for Playwright (Java)
DESCRIPTION: Configures a GitHub Actions workflow to run Playwright tests for a Java project. It sets up Java 17 (Temurin), builds the project using Maven, installs Playwright browsers via Maven exec, and runs tests using Maven test.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci-intro.md#_snippet_2

LANGUAGE: yml
CODE:
```
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-java@v3
      with:
        distribution: 'temurin'
        java-version: '17'
    - name: Build & Install
      run: mvn -B install -D skipTests --no-transfer-progress
    - name: Ensure browsers are installed
      run: mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --with-deps"
    - name: Run tests
      run: mvn test
```

----------------------------------------

TITLE: Configuring Azure Pipelines for Playwright Tests (Java)
DESCRIPTION: This YAML configuration sets up Azure Pipelines to run Playwright tests in a containerized environment for a Java project. It uses the official Playwright Java Docker image, sets up Java 17, builds the project with Maven, and runs the tests.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_30

LANGUAGE: yml
CODE:
```
trigger:
- main

pool:
  vmImage: ubuntu-latest
container: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble

steps:
- task: JavaToolInstaller@0
  inputs:
    versionSpec: '17'
    jdkArchitectureOption: 'x64'
    jdkSourceOption: AzureStorage

- script: mvn -B install -D skipTests --no-transfer-progress
  displayName: 'Build and install'
- script: mvn test
  displayName: 'Run tests'
```

----------------------------------------

TITLE: Running Playwright Tests on Multiple Browsers
DESCRIPTION: Execute tests on multiple browsers by using the --project flag multiple times with different browser names.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/running-tests-js.md#2025-04-22_snippet_4

LANGUAGE: bash
CODE:
```
npx playwright test --project webkit --project firefox
```

----------------------------------------

TITLE: Initializing Playwright Project via yarn - Bash
DESCRIPTION: Sets up a new Playwright project using yarn, interactively scaffolding configuration and directory structure for end-to-end tests. Requires Node.js and yarn. Prompts the user for choices on test folder, setup language, CI integration, and browsers. Installs and configures Playwright as a development dependency.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/intro-js.md#2025-04-22_snippet_1

LANGUAGE: bash
CODE:
```
yarn create playwright
```

----------------------------------------

TITLE: Configuring Google Cloud Build for Playwright Tests (JavaScript)
DESCRIPTION: This YAML configuration sets up Google Cloud Build to run Playwright tests using the official Playwright Docker image for JavaScript projects. It specifies the Docker image and sets the CI environment variable.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci.md#2025-04-22_snippet_39

LANGUAGE: yml
CODE:
```
steps:
- name: mcr.microsoft.com/playwright:v%%VERSION%%-noble
  script: 
  ...
  env:
  - 'CI=true'
```

----------------------------------------

TITLE: GitHub Actions Workflow for Playwright (C#)
DESCRIPTION: Configures a GitHub Actions workflow to run Playwright tests for a C# project. It sets up .NET 8.0.x, builds the project using dotnet build, installs Playwright browsers using a PowerShell script, and runs tests using dotnet test.
SOURCE: https://github.com/microsoft/playwright/blob/main/docs/src/ci-intro.md#_snippet_3

LANGUAGE: yml
CODE:
```
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup dotnet
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: 8.0.x
    - name: Build & Install
      run: dotnet build
    - name: Ensure browsers are installed
      run: pwsh bin/Debug/net8.0/playwright.ps1 install --with-deps
    - name: Run your tests
      run: dotnet test
```