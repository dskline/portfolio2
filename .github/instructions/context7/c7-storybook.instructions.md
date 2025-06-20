---
applyTo: '**/__docs__/*stories*'
---
TITLE: Defining Primary Story with Args (Standard CSF)
DESCRIPTION: Demonstrates how to define a basic story for a `Button` component in its 'primary' state using Storybook's Component Story Format (CSF). It utilizes `args` to configure component properties, making them editable via Storybook Controls.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/writing-stories/index.mdx#_snippet_1

LANGUAGE: JavaScript
CODE:
```
import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button'
  }
};
```

----------------------------------------

TITLE: Defining Button Stories for React in TypeScript
DESCRIPTION: This TypeScript snippet defines Storybook stories for a React Button component, providing type safety using `Meta<typeof Button>` and `StoryObj<typeof meta>`. It demonstrates setting component metadata and defining multiple stories with inherited arguments.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-using-args.md#_snippet_4

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    backgroundColor: '#ff0',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: '😄👍😍💯',
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    label: '📚📕📈🤓',
  },
};

```

----------------------------------------

TITLE: Testing Form Submission in Common JS/JSX Storybook
DESCRIPTION: This snippet provides a common JavaScript/JSX Storybook story for a `Form` component. It showcases the `play` function to simulate user input and form submission, followed by an assertion using `expect` and `waitFor` to confirm that the `onSubmit` argument was successfully invoked. The `fn` utility is utilized to create a spy for the `onSubmit` function.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-interactions-play-function.md#_snippet_3

LANGUAGE: JavaScript
CODE:
```
import { expect, fn, waitFor } from 'storybook/test';

import { Form } from './Form';

export default {
  component: Form,
  args: {
    // 👇 Use `fn` to spy on the onSubmit arg
    onSubmit: fn(),
  },
};

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvas to query the DOM
 */
export const Submitted = {
  play: async ({ args, canvas, step, userEvent }) => {
    // Starts querying the component from its root element
    await step('Enter credentials', async () => {
      await userEvent.type(canvas.getByTestId('email'), 'hi@example.com');
      await userEvent.type(canvas.getByTestId('password'), 'supersecret');
    });

    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });

    // 👇 Now we can assert that the onSubmit arg was called
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};
```

----------------------------------------

TITLE: Creating Storybook Project with npm
DESCRIPTION: Initializes a new Storybook project using the npm package manager. The `--package-manager=npm` flag explicitly sets npm as the package manager for the Storybook project itself.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/create-command-custom-package-manager.md#_snippet_0

LANGUAGE: shell
CODE:
```
npm create storybook@latest --package-manager=npm
```

----------------------------------------

TITLE: Defining Basic Story with CSF
DESCRIPTION: This JavaScript snippet defines a basic story using Component Story Format (CSF) for a Button component. It imports React and the Button component, then exports a named story called 'basic' that renders the Button.
SOURCE: https://github.com/storybookjs/storybook/blob/next/code/addons/docs/docs/recipes.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import React from 'react';
import { Button } from './Button';

// NOTE: no default export since `Button.stories.mdx` is the story file for `Button` now
//
// export default {
//   title: 'Demo/Button',
//   component: Button,
// };

export const basic = () => <Button>Basic</Button>;
basic.parameters = {
  foo: 'bar',
};
```

----------------------------------------

TITLE: Configuring Storybook Composition in TypeScript
DESCRIPTION: This TypeScript snippet configures the `.storybook/main.ts` file to enable Storybook composition. It leverages the `StorybookConfig` type for better type safety and uses the `refs` property to define external Storybooks, dynamically setting their URLs based on whether Storybook is running in 'DEVELOPMENT' or production mode. This ensures proper integration of multiple Storybooks with type checking.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-refs-with-function.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  // 👇 Retrieve the current environment from the configType argument
  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        react: {
          title: 'Composed React Storybook running in development mode',
          url: 'http://localhost:7007'
        },
        angular: {
          title: 'Composed Angular Storybook running in development mode',
          url: 'http://localhost:7008'
        }
      };
    }
    return {
      react: {
        title: 'Composed React Storybook running in production',
        url: 'https://your-production-react-storybook-url'
      },
      angular: {
        title: 'Composed Angular Storybook running in production',
        url: 'https://your-production-angular-storybook-url'
      }
    };
  }
};

export default config;
```

----------------------------------------

TITLE: Configuring Storybook Main File in TypeScript
DESCRIPTION: This TypeScript snippet configures the `.storybook/main.ts` file for Storybook, leveraging type safety with `StorybookConfig`. It specifies the `framework` for the UI library, defines the `stories` array to include MDX and various JavaScript/TypeScript story files, and configures `autodocs` generation by tag. This setup ensures Storybook correctly integrates with the project's components and documentation.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-docs-autodocs.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  docs: {
    autodocs: 'tag'
  }
};

export default config;
```

----------------------------------------

TITLE: Testing Button onClick Handler in Vue with Storybook
DESCRIPTION: This snippet demonstrates how to test the `onClick` handler of a Storybook component (Button) in a Vue environment. It uses `composeStory` to create a testable story, spies on the `onClick` function using `jest.fn()`, simulates a click event, and asserts that the handler was called. This requires `@testing-library/vue` and `@storybook/vue3-vite`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/portable-stories-jest-compose-story.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import { jest, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/vue';
import { composeStory } from '@storybook/vue3-vite';

import meta, { Primary as PrimaryStory } from './Button.stories';

test('onclick handler is called', () => {
  // Returns a story which already contains all annotations from story, meta and global levels
  const Primary = composeStory(PrimaryStory, meta);

  const onClickSpy = jest.fn();
  await Primary.run({ args: { ...Primary.args, onClick: onClickSpy } });

  const buttonElement = screen.getByRole('button');
  buttonElement.click();
  expect(onClickSpy).toHaveBeenCalled();
});
```

----------------------------------------

TITLE: Configuring Storybook Main in TypeScript
DESCRIPTION: This snippet provides the TypeScript equivalent for Storybook's `main.ts` configuration. It imports the `StorybookConfig` type for type safety, then defines the framework, story paths, and Webpack 5 builder options, similar to the JavaScript version. This setup ensures proper Storybook functionality with TypeScript.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-main-webpack-options.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-webpack5, nextjs, angular, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      }
    }
  }
};

export default config;
```

----------------------------------------

TITLE: Testing Vue Storybook Components with Jest
DESCRIPTION: This snippet illustrates how to test a Vue 3 component defined in Storybook using Jest and `@testing-library/vue`. It utilizes `composeStories` from `@storybook/vue3-vite` to make Storybook stories testable, showing how to render them with default arguments and prop overrides.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/portable-stories-jest-compose-stories.md#_snippet_1

LANGUAGE: typescript
CODE:
```
import { test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/vue';
import { composeStories } from '@storybook/vue3-vite';

// Import all stories and the component annotations from the stories file
import * as stories from './Button.stories';

// Every component that is returned maps 1:1 with the stories,
// but they already contain all annotations from story, meta, and project levels
const { Primary, Secondary } = composeStories(stories);

test('renders primary button with default args', () => {
  render(Primary);
  const buttonElement = screen.getByText('Text coming from args in stories file!');
  expect(buttonElement).not.toBeNull();
});

test('renders primary button with overridden props', () => {
  // You can override props and they will get merged with values from the story's args
  render(Primary, { props: { label: 'Hello world' } });
  const buttonElement = screen.getByText(/Hello world/i);
  expect(buttonElement).not.toBeNull();
});
```

----------------------------------------

TITLE: Configuring Storybook Main Settings with TypeScript
DESCRIPTION: This snippet defines the `StorybookConfig` object in TypeScript, setting up the framework, specifying the paths for story files (`.mdx` and `.stories.*`), and configuring TypeScript options. It uses `react-docgen-typescript` for documentation generation, with specific compiler options and a `propFilter` to exclude props from `node_modules` except for `@mui` packages.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-main-prop-filter.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Filter out third-party props from node_modules except @mui packages.
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
```

----------------------------------------

TITLE: Testing LoginForm Submission in Storybook (Angular)
DESCRIPTION: This Storybook story demonstrates how to test a `LoginForm` component in an Angular environment. It uses `storybook/test` utilities like `fn` to spy on the `onSubmit` argument and `userEvent` within the `play` function to simulate user input and form submission, followed by an assertion using `expect` to verify that `onSubmit` was called.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/interaction-test-fn-mock-spy.md#_snippet_0

LANGUAGE: typescript
CODE:
```
import type { Meta, StoryObj } from '@storybook/angular';
import { fn, expect } from 'storybook/test';

import { LoginForm } from './LoginForm.component';

const meta: Meta<LoginForm> = {
  component: LoginForm,
  args: {
    // 👇 Use `fn` to spy on the onSubmit arg
    onSubmit: fn(),
  },
};
export default meta;

type Story = StoryObj<LoginForm>;

export const FilledForm: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'email@provider.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'a-random-password');
    await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));

    // 👇 Now we can assert that the onSubmit arg was called
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
```

----------------------------------------

TITLE: Testing Primary Button with Overridden Storybook Props (TypeScript)
DESCRIPTION: This test demonstrates how to override story arguments when running a Storybook story for testing. It uses the `run` function's `context.args` to modify the `children` prop, then asserts that the button renders with the new text. This allows for testing specific prop combinations without altering the original story definition.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/portable-stories-csf-factory-run.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import { test, expect } from 'vitest';
import { screen } from '@testing-library/react';

// Import all stories from the stories file
import * as stories from './Button.stories';

const { Primary } = stories;

test('renders primary button with overridden props', async () => {
  // You can override props by passing them in the context argument of the run function
  await Primary.run({ args: { ...Primary.composed.args, children: 'Hello world' } });
  const buttonElement = screen.getByText(/Hello world/i);
  expect(buttonElement).not.toBeNull();
});
```

----------------------------------------

TITLE: Defining Storybook Meta for Common Frameworks (TypeScript)
DESCRIPTION: This TypeScript snippet provides a common `Meta` object configuration for Storybook stories across various frameworks. It imports `Meta` from a specified Storybook framework package and the component. The `meta` object defines the story's title, component, decorators, and parameters, leveraging TypeScript for type checking with `satisfies Meta<typeof MyComponent>`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/my-component-story-mandatory-export.md#_snippet_6

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Path/To/MyComponent',
  component: MyComponent,
  decorators: [
    /* ... */
  ],
  parameters: {
    /* ... */
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
```

----------------------------------------

TITLE: Storybook Stories for Web Components LoginForm (TypeScript)
DESCRIPTION: This TypeScript file defines Storybook stories for a `demo-login-form` Web Component. It utilizes `Meta` and `StoryObj` types, includes an `EmptyForm` story, and a `FilledForm` story with a `play` function. The `play` function simulates user interactions (typing into fields, clicking a button) and asserts a success message, showcasing type-safe interaction testing for Web Components.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/login-form-with-play-function.md#_snippet_12

LANGUAGE: TypeScript
CODE:
```
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { expect } from 'storybook/test';

const meta: Meta = {
  component: 'demo-login-form',
};
export default meta;

type Story = StoryObj;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');

    await userEvent.type(canvas.getByTestId('password'), 'a-random-password');

    // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button'));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!'
      )
    ).toBeInTheDocument();
  },
};
```

----------------------------------------

TITLE: Defining Primary Button Story in Angular (TypeScript)
DESCRIPTION: This snippet defines a basic Storybook story for a Button component in an Angular project using TypeScript. It imports `Meta` and `StoryObj` types from `@storybook/angular`, sets the component for the story, and exports a `Primary` story with `primary: true` argument.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/csf-3-example-starter.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
import type { Meta, StoryObj } from '@storybook/angular';

import { Button } from './button.component';

const meta: Meta<Button> = { component: Button };

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = { args: { primary: true } };
```

----------------------------------------

TITLE: Configuring Storybook Main File in TypeScript
DESCRIPTION: This TypeScript snippet illustrates the configuration for Storybook's `main.ts` file, leveraging the `StorybookConfig` type for improved type safety. It specifies the UI framework, story file locations, and provides an asynchronous hook for modifying the webpack configuration.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-main-simplified-config.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-webpack5, nextjs, angular, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  webpackFinal: async (config) => {
    config.plugins.push(/* ... */);
    return config;
  }
};

export default config;
```

----------------------------------------

TITLE: Simulating Form Submission in Storybook (TypeScript)
DESCRIPTION: This Storybook story defines a `FilledForm` state for a generic `RegistrationForm` component using TypeScript. The `play` function simulates user interaction by typing an email and password into input fields and clicking the submit button, demonstrating automated testing of form submission within Storybook. It depends on `@storybook/your-framework` and the `RegistrationForm` component.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/play-function.md#_snippet_6

LANGUAGE: typescript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { RegistrationForm } from './RegistrationForm';

const meta: Meta<typeof RegistrationForm> = {
  component: RegistrationForm,
};
export default meta;

type Story = StoryObj<typeof RegistrationForm>;

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvas to query the DOM
 */
export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const emailInput = canvas.getByLabelText('email', {
      selector: 'input',
    });

    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText('password', {
      selector: 'input',
    });

    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 100,
    });

    const submitButton = canvas.getByRole('button');
    await userEvent.click(submitButton);
  },
};
```

----------------------------------------

TITLE: Configuring Storybook with TypeScript
DESCRIPTION: This snippet provides the TypeScript equivalent of the main Storybook configuration, leveraging `StorybookConfig` type for enhanced type safety. It sets the UI framework, defines the paths for story files (MDX and various JS/TS formats), and specifies the logging level, ensuring Storybook correctly loads and displays your stories.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-log-level.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  logLevel: 'debug'
};

export default config;
```

----------------------------------------

TITLE: ArgTypes Configuration Object
DESCRIPTION: Defines the structure for configuring argTypes, allowing specification of control type, description, conditional display, mapping, name, options, table configuration, and data type for each argument.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/api/arg-types.mdx#_snippet_0

LANGUAGE: typescript
CODE:
```
{
  [key: string]: {
    control?: ControlType | { type: ControlType; /* See below for more */ } | false;
    description?: string;
    if?: Conditional;
    mapping?: { [key: string]: { [option: string]: any } };
    name?: string;
    options?: string[];
    table?: {
      category?: string;
      defaultValue?: { summary: string; detail?: string };
      disable?: boolean;
      subcategory?: string;
      type?: { summary?: string; detail?: string };
    },
    type?: SBType | SBScalarType['name'];
  }
}
```

----------------------------------------

TITLE: Compiling Storybook for Deployment - Shell
DESCRIPTION: This is the general syntax for the `storybook build` command, used to compile a Storybook instance into static files for deployment. It should be executed from the root directory of your project.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/api/cli-options.mdx#_snippet_15

LANGUAGE: shell
CODE:
```
storybook build [options]
```

----------------------------------------

TITLE: Defining Button Component Stories in Storybook (TypeScript)
DESCRIPTION: This TypeScript snippet defines a Storybook 'Meta' object for a 'Button' component, specifying its component type. It then creates an 'Example' story ('StoryObj') for the button, setting its 'primary' state to true and its 'label' to 'Button'. This demonstrates how to set up basic component stories with arguments for rendering in Storybook.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-baseline-with-satisfies-story-level.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example = {
  args: {
    primary: true,
    label: 'Button',
  },
} satisfies Story;
```

----------------------------------------

TITLE: Testing Dialog Open Behavior in Storybook (Common TypeScript)
DESCRIPTION: This Storybook story demonstrates testing a `Dialog` component's open behavior for generic frameworks (e.g., React, Vue) using TypeScript. The `play` function simulates a user interaction by clicking a button and then asserts the dialog's presence, ensuring the component functions as expected. It depends on `@storybook/your-framework` and `storybook/test`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/interaction-test-simple.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the name of your framework (e.g. react-vite, vue3-vite, etc.)
import type { Meta, StoryObj } from '@storybook/your-framework';
import { expect } from 'storybook/test';

import { Dialog } from './Dialog';

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Opens: Story = {
  play: async ({ canvas, userEvent }) => {
    // Click on a button and assert that a dialog appears
    const button = canvas.getByRole('button', { text: 'Open Modal' });
    await userEvent.click(button);
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();
  },
};
```

----------------------------------------

TITLE: Importing `expect` for Assertions - JavaScript
DESCRIPTION: This snippet demonstrates how to import the `expect` utility from `storybook/test`. The `expect` utility is crucial for making assertions in Storybook interaction tests, combining capabilities from Vitest's `expect` and `@testing-library/jest-dom`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/writing-tests/interaction-testing.mdx#_snippet_11

LANGUAGE: JavaScript
CODE:
```
import { expect } from 'storybook/test';
```

----------------------------------------

TITLE: Using CSF Format (Correct)
DESCRIPTION: This code demonstrates the correct way to define stories in Storybook using the CSF (Component Story Format). It exports a default object containing the component and then exports individual stories as named exports. This is the recommended approach for Storybook 5.2 and later.
SOURCE: https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/no-stories-of.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import Button from '../components/Button';

export default = {
  component: Button
}

export const Primary = () => <Button primary />
```

----------------------------------------

TITLE: Creating Storybook Project with npm (Shell)
DESCRIPTION: Use this command with npm to initialize a new Storybook project. It fetches the latest version of the create-storybook package and runs it interactively.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/create-command.md#_snippet_0

LANGUAGE: Shell
CODE:
```
npm create storybook@latest
```

----------------------------------------

TITLE: Mocking API Responses with MSW in Angular Storybook
DESCRIPTION: This snippet demonstrates how to configure Storybook stories for an Angular component using TypeScript, integrating Mock Service Worker (MSW) to mock both successful and error API responses. It defines a TestData object and uses http.get handlers to return JSON data or a 403 status for testing different API scenarios.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/msw-addon-configure-handlers-http.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
import type { Meta, StoryObj } from '@storybook/angular';

import { http, HttpResponse, delay } from 'msw';

import { DocumentScreen } from './YourPage.component';

const meta: Meta<DocumentScreen> = {
  component: DocumentScreen,
};

export default meta;
type Story = StoryObj<DocumentScreen>;

// 👇 The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://your-restful-endpoint/', () => {
          return HttpResponse.json(TestData);
        }),
      ],
    },
  },
};

export const MockedError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://your-restful-endpoint', async () => {
          await delay(800);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};

```

----------------------------------------

TITLE: Configuring Storybook Main File (TypeScript)
DESCRIPTION: This TypeScript snippet illustrates the configuration of the `.storybook/main.ts` file for a Storybook project. It imports `StorybookConfig` for type safety, sets the framework, defines story paths, and integrates the `@storybook/addon-a11y` for accessibility features.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/addon-a11y-register.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using (e.g., react-vite, vue3-vite, angular, etc.)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // Other Storybook addons
    '@storybook/addon-a11y' //👈 The a11y addon goes here
  ]
};

export default config;
```

----------------------------------------

TITLE: Testing LoginForm Submission in Storybook (Svelte, TypeScript CSF)
DESCRIPTION: This Storybook story demonstrates testing a `LoginForm` component in a Svelte environment using TypeScript Component Story Format (CSF). It sets up the story with `fn` to spy on `onSubmit` and uses the `play` function to simulate user input and form submission via `userEvent`, asserting that the `onSubmit` callback was successfully invoked.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/interaction-test-fn-mock-spy.md#_snippet_4

LANGUAGE: typescript
CODE:
```
// Replace your-framework with the framework you are using, e.g. sveltekit or svelte-vite
import type { Meta, StoryObj } from '@storybook/your-framework';
import { fn, expect } from 'storybook/test';

import { LoginForm } from './LoginForm.svelte';

const meta = {
  component: LoginForm,
  args: {
    // 👇 Use `fn` to spy on the onSubmit arg
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FilledForm: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'email@provider.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'a-random-password');
    await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));

    // 👇 Now we can assert that the onSubmit arg was called
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
```

----------------------------------------

TITLE: Configuring MSW Handlers for GraphQL
DESCRIPTION: This code configures MSW handlers to mock GraphQL requests for the document screen component. It defines two stories: one that fetches data successfully and another that simulates a failure.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/writing-stories/mocking-data-and-modules/mocking-network-requests.mdx#_snippet_7

LANGUAGE: javascript
CODE:
```
import React from 'react';
import { graphql } from 'msw';

import { DocumentScreen } from './DocumentScreen';

export default {
  title: 'DocumentScreen',
  component: DocumentScreen,
};

const Template = () => <DocumentScreen />;

export const Success = Template.bind({});
Success.parameters = {
  msw: {
    handlers: [
      graphql.query('GetDocument', (req, res, ctx) => {
        return res(
          ctx.data({
            document: {
              title: 'My Document',
              content: 'This is the content of my document.',
            },
          })
        );
      }),
    ],
  },
};

export const Failure = Template.bind({});
Failure.parameters = {
  msw: {
    handlers: [
      graphql.query('GetDocument', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};

```

----------------------------------------

TITLE: Initializing Storybook with yarn
DESCRIPTION: This command initializes Storybook version 7 or higher in a project using `yarn dlx`, which is yarn's equivalent to `npx`. It automates the setup of Storybook's configuration and dependencies.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-init-v7.md#_snippet_2

LANGUAGE: Shell
CODE:
```
yarn dlx storybook@^7 init
```

----------------------------------------

TITLE: Initializing Storybook with npm
DESCRIPTION: This command initializes Storybook version 7 or higher in a project using `npx`, the Node Package Execute utility bundled with npm. It sets up the necessary configuration and files for Storybook.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-init-v7.md#_snippet_0

LANGUAGE: Shell
CODE:
```
npx storybook@^7 init
```

----------------------------------------

TITLE: Initializing Apollo Client Wrapper Component (Vue/TypeScript)
DESCRIPTION: This Vue component, `WrapperComponent`, initializes and provides an Apollo Client instance for use throughout an application or within Storybook. It configures an `httpLink` to a GraphQL endpoint and sets up an `InMemoryCache`. The client is configured with `no-cache` fetch policies for queries and watch queries, making it suitable for mocking or testing environments.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/msw-addon-configure-handlers-graphql.md#_snippet_14

LANGUAGE: vue
CODE:
```
<template>
  <div><slot /></div>
</template>

<script>
  import { defineComponent, provide } from 'vue';
  import { DefaultApolloClient } from '@vue/apollo-composable';
  import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

  // Apollo client wrapper component that can be used within your app and Storybook
  export default defineComponent({
    name: 'WrapperComponent',
    setup() {
      const httpLink = createHttpLink({
        // You should use an absolute URL here
        uri: 'https://your-graphql-endpoint',
      });
      const cache = new InMemoryCache();

      const mockedClient = new ApolloClient({
        link: httpLink,
        cache,
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          },
          query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          },
        },
      });
      provide(DefaultApolloClient, mockedClient);
    },
  });
</script>
```

----------------------------------------

TITLE: Defining Default Storybook Story for Generic TS/TSX
DESCRIPTION: This snippet presents a common TypeScript CSF definition for a 'MyComponent', applicable to various frameworks like React, Next.js, or Vue. It defines the 'meta' object with 'component' and 'title', and exports a 'Default' story with 'args', ensuring type safety with 'satisfies Meta<typeof MyComponent>'.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-csf-3-auto-title-redundant.md#_snippet_6

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: MyComponent,
  title: 'components/MyComponent/MyComponent',
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    something: 'Something else',
  },
};

```

----------------------------------------

TITLE: Initializing Storybook Project with CLI (sh)
DESCRIPTION: This snippet demonstrates the process of initializing Storybook within an existing project using the `npx storybook@latest init` command. It first navigates into the target project directory (`my-app`) and then executes the Storybook CLI command to set up the necessary configuration and files, making the project ready for Storybook development.
SOURCE: https://github.com/storybookjs/storybook/blob/next/code/lib/cli-storybook/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
cd my-app
npx storybook@latest init
```

----------------------------------------

TITLE: Configuring Default Export for Storybook Component Stories (JavaScript)
DESCRIPTION: This snippet demonstrates the standard default export configuration for a Storybook component story file. It imports `MyComponent` and then exports an object defining the story's `title` (how it appears in the Storybook UI) and the `component` itself, which Storybook uses to render the stories.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/my-component-story.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { MyComponent } from './MyComponent';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MyComponent',
  component: MyComponent,
};

// Your stories
```

----------------------------------------

TITLE: Configuring Storybook Main in JavaScript
DESCRIPTION: This JavaScript snippet demonstrates the basic configuration for Storybook's `main.js` file. It exports an object defining the Storybook framework to be used (e.g., React, Vue) and the array of paths where Storybook should find your stories. This file is crucial for initializing Storybook within a project.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-main-configuration-src-dir.md#_snippet_0

LANGUAGE: js
CODE:
```
export default {
  // Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
  framework: '@storybook/your-framework',
  stories: ['../src'],
};
```

----------------------------------------

TITLE: Mocking Successful API Response in Storybook (JS)
DESCRIPTION: This Storybook story demonstrates how to mock a successful API response using Mock Service Worker (MSW) for a JavaScript component. It defines `TestData` to simulate a typical data structure and configures an `http.get` handler to return this data as a JSON response, allowing UI components to be tested with predictable successful data.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/msw-addon-configure-handlers-http.md#_snippet_6

LANGUAGE: js
CODE:
```
import { http, HttpResponse, delay } from 'msw';

export default {
  component: 'demo-document-screen',
};

// 👇 The mocked data that will be used in the story
const TestData = {
  user: {
    userID: 1,
    name: 'Someone',
  },
  document: {
    id: 1,
    userID: 1,
    title: 'Something',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'approved',
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: 'Something',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'approved',
    },
  ],
};

export const MockedSuccess = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://your-restful-endpoint/', () => {
          return HttpResponse.json(TestData);
        }),
      ],
    },
  },
};
```