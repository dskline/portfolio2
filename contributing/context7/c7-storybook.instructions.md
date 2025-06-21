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

TITLE: Defining Button Stories for HTML in JavaScript
DESCRIPTION: This JavaScript snippet defines Storybook stories for a generic HTML Button component. It uses a `render` function to create the button from `args` and exports `Primary`, `Secondary`, and `Tertiary` stories, demonstrating how to pass properties and inherit arguments.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-using-args.md#_snippet_1

LANGUAGE: js
CODE:
```
import { createButton } from './Button';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary = {
  render: (args) => createButton(args),
  args: {
    backgroundColor: '#ff0',
    label: 'Button',
  },
};

export const Secondary = {
  render: (args) => createButton(args),
  args: {
    ...Primary.args,
    label: '😄👍😍💯',
  },
};

export const Tertiary = {
  render: (args) => createButton(args),
  args: {
    ...Primary.args,
    label: '📚📕📈🤓',
  },
};
```

----------------------------------------

TITLE: Starting Storybook in Development Mode
DESCRIPTION: This command starts the Storybook development server, making your stories accessible in the browser. It's typically run before executing tests with the test-runner to ensure Storybook is running.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/writing-tests/integrations/test-runner.mdx#_snippet_33

LANGUAGE: Shell
CODE:
```
npm run storybook
# or
yarn storybook
```

----------------------------------------

TITLE: Setting Storybook Environment Variables via CLI (Shell)
DESCRIPTION: This command demonstrates how to set multiple environment variables, `STORYBOOK_THEME` and `STORYBOOK_DATA_KEY`, directly when running Storybook from the command line. These variables will then be accessible within the Storybook environment, specifically in `process.env` (Webpack) or `import.meta.env` (Vite).
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/configure/environment-variables.mdx#_snippet_0

LANGUAGE: shell
CODE:
```
STORYBOOK_THEME=red STORYBOOK_DATA_KEY=12345 npm run storybook
```

----------------------------------------

TITLE: Configuring Storybook Docs Addon in main.js
DESCRIPTION: This JavaScript snippet shows how to register the `@storybook/addon-docs` addon in your `.storybook/main.js` configuration file. Adding it to the `addons` array enables the documentation features within Storybook.
SOURCE: https://github.com/storybookjs/storybook/blob/next/code/addons/docs/vue/README.md#_snippet_1

LANGUAGE: js
CODE:
```
export default {
  addons: ['@storybook/addon-docs'],
};
```

----------------------------------------

TITLE: Configuring Storybook Main File in JavaScript
DESCRIPTION: This snippet demonstrates how to configure the Storybook `main.js` file for a JavaScript project. It sets the framework, defines story file paths, and shows how to disable Storybook's telemetry feature.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-main-disable-telemetry.md#_snippet_0

LANGUAGE: js
CODE:
```
export default {
  // Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
};
```

----------------------------------------

TITLE: Configuring MDX Document Metadata with Meta Block
DESCRIPTION: The `Meta` Doc Block defines the document's placement in the Storybook sidebar and links it to a component's stories. It uses the `of` prop to reference the default export of a CSF file, ensuring proper rendering and navigation.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/writing-docs/mdx.mdx#_snippet_4

LANGUAGE: MDX
CODE:
```
<Meta of={CheckboxStories} />
```

----------------------------------------

TITLE: Testing Save Flow with Mocked Actions in Storybook (CommonJS/JavaScript)
DESCRIPTION: This Storybook story, structured in a CommonJS style, demonstrates testing a save flow for a `NoteUI` component. It defines a `SaveFlow` story where a user interaction (clicking a save button) is simulated, and the invocation of the `saveNote` mock function is asserted, validating the component's behavior. Dependencies include `storybook/test` and local mock files.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-test-fn-mock-spy.md#_snippet_3

LANGUAGE: js
CODE:
```
import { expect } from 'storybook/test';

import { saveNote } from '#app/actions.mock';
import { createNotes } from '#mocks/notes';

import NoteUI from './note-ui';

export default { component: NoteUI };

const notes = createNotes();

export const SaveFlow = {
  name: 'Save Flow ▶',
  args: {
    isEditing: true,
    note: notes[0],
  },
  play: async ({ canvas }) => {
    const saveButton = canvas.getByRole('menuitem', { name: /done/i });
    await userEvent.click(saveButton);
    // 👇 This is the mock function, so you can assert its behavior
    await expect(saveNote).toHaveBeenCalled();
  },
};
```

----------------------------------------

TITLE: Initialize Storybook Project
DESCRIPTION: These commands initialize a new Storybook project in your current directory. They set up the necessary files and dependencies to start developing UI components with Storybook, supporting different package managers.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/create-command.md#_snippet_0

LANGUAGE: shell
CODE:
```
npm create storybook@latest
```

LANGUAGE: shell
CODE:
```
pnpm create storybook@latest
```

LANGUAGE: shell
CODE:
```
yarn create storybook
```

----------------------------------------

TITLE: Testing Storybook Svelte Components with composeStories
DESCRIPTION: This snippet illustrates unit testing a Storybook Svelte component using `vitest` and `@testing-library/svelte`. It covers composing stories, rendering a primary button with default arguments, and overriding its props for different test scenarios.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/portable-stories-vitest-compose-stories.md#_snippet_1

LANGUAGE: ts
CODE:
```
import { test, expect } from 'vitest';
import { screen } from '@testing-library/svelte';
// Replace your-framework with the framework you are using, e.g. sveltekit or svelte-vite
import { composeStories } from '@storybook/your-framework';

// Import all stories and the component annotations from the stories file
import * as stories from './Button.stories';

// Every component that is returned maps 1:1 with the stories,
// but they already contain all annotations from story, meta, and project levels
const { Primary, Secondary } = composeStories(stories);

test('renders primary button with default args', async () => {
  await Primary.run();
  const buttonElement = screen.getByText('Text coming from args in stories file!');
  expect(buttonElement).not.toBeNull();
});

test('renders primary button with overridden props', async () => {
  // You can override props by passing them in the context argument of the run function
  await Primary.run({ args: { ...Primary.args, children: 'Hello world' } });
  const buttonElement = screen.getByText(/Hello world/i);
  expect(buttonElement).not.toBeNull();
});
```

----------------------------------------

TITLE: Configuring Storybook Main File in TypeScript
DESCRIPTION: This snippet illustrates the configuration for Storybook's `main.ts` file in a TypeScript project, leveraging the `StorybookConfig` type for type safety. It sets the Storybook framework and defines the paths where story files are located, similar to the JavaScript version but with TypeScript specific syntax.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-main-js-md-files.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../my-project/src/components/*.@(js|md)'],
};

export default config;
```

----------------------------------------

TITLE: Defining TypeScript Stories with Play Function
DESCRIPTION: This TypeScript Component Story Format (CSF) example defines `EmptyForm` and `FilledForm` stories for a `LoginForm` component, leveraging Storybook's `play` function for interactive testing. The `FilledForm` story simulates user input and button clicks, then asserts the DOM to verify the component's behavior.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/login-form-with-play-function.md#_snippet_8

LANGUAGE: ts
CODE:
```
// Replace your-framework with svelte-vite or sveltekit
import type { Meta, StoryObj } from '@storybook/your-framework';

import { expect, userEvent, within } from 'storybook/test';

import LoginForm from './LoginForm.svelte';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

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

TITLE: Configuring Storybook Test Runner for Accessibility (TypeScript)
DESCRIPTION: This TypeScript snippet provides the configuration for the Storybook test runner to integrate accessibility checks. It uses the `preVisit` hook to inject `axe-playwright` and the `postVisit` hook to fetch story context, apply custom Axe rules defined in story parameters, and execute `checkA11y` to produce a detailed HTML accessibility report. This setup leverages `@storybook/test-runner` and `axe-playwright`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/test-runner-a11y-configure.md#_snippet_1

LANGUAGE: ts
CODE:
```
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';

import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

/*
 * See https://storybook.js.org/docs/writing-tests/integrations/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });

    const element = storyContext.parameters?.a11y?.element ?? 'body';
    await checkA11y(page, element, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;
```

----------------------------------------

TITLE: Creating an MDX Documentation File (MDX)
DESCRIPTION: This MDX example demonstrates how to create a rich documentation file. It imports components like `Meta`, `Story`, and `ArgsTable` to define story metadata, embed interactive stories, and display a component's props table directly within Markdown.
SOURCE: https://github.com/storybookjs/storybook/blob/next/code/addons/docs/react/README.md#_snippet_5

LANGUAGE: md
CODE:
```
import { Meta, Story, ArgsTable } from '@storybook/addon-docs';
import { Button } from './Button';

<Meta title='Button' component={Button} />

# Button

Some **markdown** description, or whatever you want.

<Story name='basic' height='400px'>
  <Button>Label</Button>
</Story>

## ArgsTable

<ArgsTable of={Button} />
```

----------------------------------------

TITLE: Defining Button Stories with Storybook for React (TypeScript)
DESCRIPTION: This snippet defines a basic Storybook story for a React Button component using TypeScript. It imports `Meta` and `StoryObj` types, suggesting a framework-specific import, and sets up a default export for the component's metadata, along with a 'Text' story with no initial arguments.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-click-handler-simplificated.md#_snippet_2

LANGUAGE: TypeScript
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

export const Text: Story = {
  args: {},
};
```

----------------------------------------

TITLE: Defining Primary Story for Vue Component in TypeScript
DESCRIPTION: This TypeScript snippet defines a primary Storybook story for a Vue 'Button' component, leveraging 'Meta' and 'StoryObj' for type safety. It uses a 'render' function to dynamically render the component with provided arguments, setting 'primary' and 'label' props.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-with-args.md#_snippet_14

LANGUAGE: TypeScript
CODE:
```
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from './Button.vue';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" />',
  }),
  args: {
    primary: true,
    label: 'Button',
  },
};
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

TITLE: Initializing Storybook with npm
DESCRIPTION: This command initializes a Storybook project using npm's package runner, 'npx'. It sets up the necessary files and configurations for Storybook in the current directory, typically used for new projects or adding Storybook to existing ones.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/init-command-custom-version.md#_snippet_0

LANGUAGE: Shell
CODE:
```
npx storybook@8.2 init
```

----------------------------------------

TITLE: Configuring Storybook Main File (TypeScript)
DESCRIPTION: This snippet defines the main Storybook configuration object. It specifies the UI framework to be used (e.g., React, Vue), the glob patterns for locating story files (MDX and various JS/TS formats), and TypeScript-specific settings such as `reactDocgen` for prop table generation. This configuration is essential for Storybook to correctly load and display components.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-typescript-react-docgen.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
```

----------------------------------------

TITLE: Configuring Storybook Main File in JavaScript
DESCRIPTION: This snippet demonstrates how to configure the Storybook `main.js` file using JavaScript. It sets the framework, defines paths for story files and MDX documentation, includes optional addons like `addon-docs`, and specifies a directory for static assets. The `autodocs` setting is configured to generate documentation based on tags.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-typical.md#_snippet_0

LANGUAGE: js
CODE:
```
const config = {
  // Required
  // Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Optional
  addons: ['@storybook/addon-docs'],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};
export default config;
```

----------------------------------------

TITLE: Testing React Component Locale with `composeStory`
DESCRIPTION: This snippet demonstrates how to test a React Storybook component's rendering in English and Spanish using `composeStory`. It overrides the global `locale` annotation to simulate different internationalization settings for testing purposes.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/portable-stories-vitest-override-globals.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import { test } from 'vitest';
import { render } from '@testing-library/react';
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { composeStory } from '@storybook/your-framework';

import meta, { Primary as PrimaryStory } from './Button.stories';

test('renders in English', async () => {
  const Primary = composeStory(
    PrimaryStory,
    meta,
    { globals: { locale: 'en' } } // 👈 Project annotations to override the locale
  );

  await Primary.run();
});

test('renders in Spanish', async () => {
  const Primary = composeStory(PrimaryStory, meta, { globals: { locale: 'es' } });

  await Primary.run();
});
```

----------------------------------------

TITLE: Testing LoginForm Submission in Storybook (Svelte CSF, TypeScript)
DESCRIPTION: This Storybook story shows how to test a `LoginForm` component using Svelte Component Story Format (CSF) with TypeScript. It defines the story using `defineMeta` and includes a `play` function that simulates user interaction with `userEvent` to fill the form and click the login button, verifying that the `onSubmit` argument was called using `expect`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/interaction-test-fn-mock-spy.md#_snippet_3

LANGUAGE: typescript
CODE:
```
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import LoginForm from './LoginForm.svelte';

  const { Story } = defineMeta({
    component: LoginForm,
    args: {
      // 👇 Use `fn` to spy on the onSubmit arg
      onSubmit: fn(),
    },
  });
</script>

<Story
  name="FilledForm"
  play={async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'email@provider.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'a-random-password');
    await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));

    // 👇 Now we can assert that the onSubmit arg was called
    await expect(args.onSubmit).toHaveBeenCalled();
  }}
/>
```

----------------------------------------

TITLE: Simulating Form Submission in Storybook Play Function
DESCRIPTION: This snippet illustrates how to simulate user interactions for a form submission within a Storybook `play` function. It leverages `@storybook/test` utilities like `userEvent.type` to input text into email and password fields and `userEvent.click` to trigger the form submission button. The `step` utility is used to logically group these interactions, enhancing readability and debugging for automated interaction tests.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-interactions-step-function.md#_snippet_0

LANGUAGE: js
CODE:
```
// ...rest of story file

export const Submitted = {
  play: async ({ args, canvas, step }) => {
    await step('Enter email and password', async () => {
      await userEvent.type(canvas.getByTestId('email'), 'hi@example.com');
      await userEvent.type(canvas.getByTestId('password'), 'supersecret');
    });

    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
  },
};
```

LANGUAGE: ts
CODE:
```
// ...rest of story file

export const Submitted: Story = {
  play: async ({ args, canvas, step }) => {
    await step('Enter email and password', async () => {
      await userEvent.type(canvas.getByTestId('email'), 'hi@example.com');
      await userEvent.type(canvas.getByTestId('password'), 'supersecret');
    });

    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
  },
};
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

TITLE: Testing Form Submission in Storybook (TypeScript, Common Frameworks)
DESCRIPTION: This TypeScript snippet provides a Storybook story for a generic form component, applicable to frameworks like React or Vue. It uses a `play` function to simulate user interaction by typing into form fields and clicking the submit button. The snippet then asserts that the `onSubmit` callback, instrumented with `fn()`, was successfully invoked, validating the form's submission logic.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-interactions-play-function.md#_snippet_5

LANGUAGE: TypeScript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { expect, fn, waitFor } from 'storybook/test';

import { Form } from './Form';

const meta = {
  component: Form,
  args: {
    // 👇 Use `fn` to spy on the onSubmit arg
    onSubmit: fn()
  }
} satisfies Meta<typeof Form>;
export default meta;

type Story = StoryObj<typeof meta>;

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvas to query the DOM
 */
export const Submitted: Story = {
  play: async ({ args, canvas, step, userEvent }) => {
    await step('Enter credentials', async () => {
      await userEvent.type(canvas.getByTestId('email'), 'hi@example.com');
      await userEvent.type(canvas.getByTestId('password'), 'supersecret');
    });

    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });

    // 👇 Now we can assert that the onSubmit arg was called
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  }
};
```

----------------------------------------

TITLE: Initializing Storybook with npm
DESCRIPTION: This command initializes a new Storybook project using `npx` and the `npm` package manager. It sets up the necessary files and configurations for Storybook in the current directory.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/init-command.md#_snippet_0

LANGUAGE: shell
CODE:
```
npx storybook@next init
```

----------------------------------------

TITLE: Testing EventForm Submission in Storybook (Common TypeScript)
DESCRIPTION: This Storybook story demonstrates testing the `EventForm` component's submission for a generic framework using TypeScript. It sets up mock functions for `getUsers` and `onSubmit`, provides mock user data, simulates typing an event title and clicking submit, then verifies the `onSubmit` callback received the expected payload.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/interaction-test-complex.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
// Replace your-framework with the name of your framework (e.g. react-vite, vue3-vite, etc.)
import type { Meta, StoryObj } from '@storybook/your-framework';
import { fn, expect } from 'storybook/test';

import { users } from '#mocks';
import { EventForm } from './EventForm';

const meta = {
  component: EventForm,
} satisfies Meta<typeof EventForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Submits: Story = {
  // Mock functions so we can manipulate and spy on them
  args: {
    getUsers: fn(),
    onSubmit: fn(),
  },
  beforeEach: async ({ args }) => {
    // Manipulate `getUsers` mock to return mocked value
    args.getUsers.mockResolvedValue(users);
  },
  play: async ({ args, canvas, userEvent }) => {
    const usersList = canvas.getAllByRole('listitem');
    await expect(usersList).toHaveLength(4);
    await expect(canvas.getAllByText('VIP')).toHaveLength(2);

    const titleInput = await canvas.findByLabelText('Enter a title for your event');
    await userEvent.type(titleInput, 'Holiday party');

    const submitButton = canvas.getByRole('button', { text: 'Plan event' });
    await userEvent.click(submitButton);

    // Spy on `onSubmit` to verify that it is called correctly
    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: 'Holiday party',
      userCount: 4,
      data: expect.anything(),
    });
  },
};
```

----------------------------------------

TITLE: Storybook Stories for Web Components LoginForm (JavaScript)
DESCRIPTION: This JavaScript file defines Storybook stories for a `demo-login-form` Web Component. It includes an `EmptyForm` story and a `FilledForm` story with a `play` function. The `play` function simulates user input for email and password fields, clicks a button, and asserts a success message, providing an example of interaction testing for Web Components.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/login-form-with-play-function.md#_snippet_11

LANGUAGE: JavaScript
CODE:
```
import { expect } from 'storybook/test';

export default {
  component: 'demo-login-form',
};

export const EmptyForm = {};

export const FilledForm = {
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

TITLE: Defining Default Export for Storybook Component in JavaScript
DESCRIPTION: This snippet exports a default object, specifying the 'Button' component as the primary component for the stories defined in this Storybook file. This is a fundamental configuration in Component Story Format (CSF) v3, enabling Storybook to correctly identify and display the component's stories. It acts as the root configuration for all subsequent stories.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/csf-3-example-auto-title.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
export default { component: Button };
```

----------------------------------------

TITLE: Defining Storybook Meta for Svelte Button Component (TypeScript CSF)
DESCRIPTION: This TypeScript snippet defines the Storybook meta object for a Svelte `Button` component, using `satisfies Meta<typeof Button>` for type inference. It imports `Meta` from a Storybook framework package and the `Button.svelte` component. The `title` and `component` properties are set, allowing Storybook to organize and display stories for the Svelte component with strong typing.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-grouped.md#_snippet_5

LANGUAGE: ts
CODE:
```
// Replace your-framework with svelte-vite or sveltekit
import type { Meta } from '@storybook/your-framework';

import Button from './Button.svelte';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Design System/Atoms/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
```

----------------------------------------

TITLE: Configuring React Button Story in TypeScript
DESCRIPTION: This snippet illustrates how to define a Storybook story for a React Button component using TypeScript. It imports `Meta` and `StoryObj` from `@storybook/your-framework`, sets the component, and defines a `Primary` story with `label` and `primary` arguments, and a custom display name. It uses `satisfies Meta<typeof Button>` for type safety.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-rename-story.md#_snippet_4

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
  // 👇 Rename this story
  name: 'I am the primary',
  args: {
    label: 'Button',
    primary: true,
  },
};
```

----------------------------------------

TITLE: Configuring Storybook Main Settings with Vite (JavaScript)
DESCRIPTION: This configuration object defines the core settings for a Storybook project. It specifies the UI framework, the glob patterns for locating story files (MDX and various JavaScript/TypeScript formats), and integrates with the Vite builder. The `viteFinal` function allows for custom Vite configuration merging based on the `configType` (DEVELOPMENT or PRODUCTION), enabling environment-specific build adjustments.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-vite-final-env.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
export default {
  // Replace your-framework with the framework you are using, e.g. react-vite, nextjs-vite, vue3-vite, etc.
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    if (configType === 'DEVELOPMENT') {
      // Your development configuration goes here
    }
    if (configType === 'PRODUCTION') {
      // Your production configuration goes here.
    }
    return mergeConfig(config, {
      // Your environment configuration here
    });
  },
};
```

----------------------------------------

TITLE: Running Storybook with npm
DESCRIPTION: This command uses npm to execute the 'storybook' script defined in the project's 'package.json' file, typically used for common JavaScript projects.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-run-dev.md#_snippet_1

LANGUAGE: Shell
CODE:
```
npm run storybook
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

TITLE: Testing React Components with composeStories in JavaScript
DESCRIPTION: This snippet demonstrates how to test a React component using `@testing-library/react` and `composeStories` from Storybook. It shows how to render a composed story and assert against its `args` property, ensuring test values are consistent with story definitions.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/reuse-args-test.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import { render, screen } from '@testing-library/react';

// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { composeStories } from '@storybook/your-framework';

import * as stories from './Button.stories';

const { Primary } = composeStories(stories);

test('reuses args from composed story', () => {
  render(<Primary />);

  const buttonElement = screen.getByRole('button');
  // Testing against values coming from the story itself! No need for duplication
  expect(buttonElement.textContent).toEqual(Primary.args.label);
});
```

----------------------------------------

TITLE: Configuring Common TS/TSX Component Stories in Storybook
DESCRIPTION: This snippet illustrates defining a Storybook story for a component using TypeScript or TSX, adaptable for various frameworks. It imports types, links the component, and uses `satisfies Meta` for type safety, setting up a default story with an environment variable argument.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/my-component-env-var-config.md#_snippet_2

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    exampleProp: process.env.EXAMPLE_VAR,
  },
};
```

----------------------------------------

TITLE: Integrate Storybook ESLint Plugin with Flat Config
DESCRIPTION: Integrate the Storybook ESLint plugin using the flat config style in eslint.config.js by spreading "storybook.configs['flat/recommended']", which is the default for ESLint v9 and supported from v8.57.0.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/configure/integration/eslint-plugin.mdx#_snippet_4

LANGUAGE: javascript
CODE:
```
import storybook from 'eslint-plugin-storybook';

export default [
  // Add more generic rulesets here, such as:
  // js.configs.recommended,
  ...storybook.configs['flat/recommended'],

  // ...
];
```

----------------------------------------

TITLE: Configuring Storybook Main File with TypeScript
DESCRIPTION: This snippet illustrates the configuration for Storybook's `main.ts` file using TypeScript, leveraging the `StorybookConfig` type for enhanced type safety. It sets the UI framework, specifies the paths for story files and MDX documentation, and includes a list of Storybook addons. It also demonstrates how to disable specific addons for test builds, ensuring a consistent testing environment.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-test-disable-disableaddons.md#_snippet_1

LANGUAGE: ts
CODE:
```
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-vitest'],
  build: {
    test: {
      disabledAddons: ['@storybook/addon-a11y']
    }
  }
};

export default config;
```

----------------------------------------

TITLE: Configuring Solid Button Story in TypeScript
DESCRIPTION: This snippet illustrates how to define a Storybook story for a SolidJS Button component using TypeScript. It imports `Meta` and `StoryObj` from `storybook-solidjs`, sets the component, and defines a `Primary` story with `label` and `primary` arguments, and a custom display name. It uses `satisfies Meta<typeof Button>` for type safety.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-rename-story.md#_snippet_6

LANGUAGE: ts
CODE:
```
import type { Meta, StoryObj } from 'storybook-solidjs';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  // 👇 Rename this story
  name: 'I am the primary',
  args: {
    label: 'Button',
    primary: true,
  },
};
```

----------------------------------------

TITLE: Configuring A11y Testing in Common Storybook (JavaScript)
DESCRIPTION: This snippet configures accessibility testing for framework-agnostic Storybook stories using JavaScript. It sets a file-level default `a11y: { test: 'error' }` to fail on violations. It also shows how to override this for `NoA11yFail` to only show warnings (`a11y: { test: 'todo' }`).
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/addon-a11y-parameter-example.md#_snippet_2

LANGUAGE: js
CODE:
```
import { Button } from './Button';

export default {
  component: Button,
  parameters: {
    // 👇 Applies to all stories in this file
    a11y: { test: 'error' },
  },
};

// 👇 This story will use the 'error' value and fail on accessibility violations
export const Primary = {
  args: { primary: true },
};

// 👇 This story will not fail on accessibility violations
//    (but will still run the tests and show warnings)
export const NoA11yFail = {
  parameters: {
    a11y: { test: 'todo' },
  },
};
```