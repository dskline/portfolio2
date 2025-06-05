---
applyTo: '**/*.stories.*'
---
TITLE: Initializing Storybook with npm
DESCRIPTION: This command initializes Storybook version 7 or higher in a project using `npx`, the Node Package Execute utility bundled with npm. It sets up the necessary configuration and files for Storybook.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-init-v7.md#_snippet_0

LANGUAGE: Shell
CODE:
```
npx storybook@^7 init
```

----------------------------------------

TITLE: Configuring Storybook Main File in JavaScript
DESCRIPTION: This JavaScript configuration defines the core settings for Storybook, including the chosen framework, the paths to story files (MDX and component stories), and options for the `@storybook/addon-docs` addon. It provides a basic setup for Storybook's main configuration.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/addon-docs-options.md#_snippet_1

LANGUAGE: JavaScript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.

export default {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: null,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
  ],
};
```

----------------------------------------

TITLE: Mounting Component with Mock Data in React Storybook (TypeScript)
DESCRIPTION: This snippet demonstrates how to create a Storybook story for a React component using TypeScript. It showcases the `play` function to programmatically interact with the component, including creating mock data via `db.note.create`, mounting the `Page` component with dynamically generated `id` from the mock data, and simulating user interaction with `userEvent.click`. It also configures `argTypes` to disable control for the `params` prop, as its value is set within the `play` function.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/mount-advanced.md#_snippet_0

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g., react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

// 👇 Must include the `.mock` portion of filename to have mocks typed correctly
import db from '#lib/db.mock';
import { Page } from './Page';

const meta = { component: Page } satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ mount, args, userEvent }) => {
    const note = await db.note.create({
      data: { title: 'Mount inside of play' },
    });

    const canvas = await mount(
      // 👇 Pass data that is created inside of the play function to the component
      //   For example, a just-generated UUID
      <Page {...args} params={{ id: String(note.id) }} />
    );

    await userEvent.click(await canvas.findByRole('menuitem', { name: /login to add/i }));
  },
  argTypes: {
    // 👇 Make the params prop un-controllable, as the value is always overriden in the play function.
    params: { control: { disable: true } },
  },
};
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

TITLE: Testing Event Form Submission in Storybook (JavaScript, Svelte)
DESCRIPTION: This Storybook story, written in JavaScript, tests the `EventForm` component's submission behavior for Svelte applications. It defines `args` to mock `getUsers` and `onSubmit`, sets up `getUsers` to return mock user data in `beforeEach`, and then uses the `play` function to simulate user interaction (typing, clicking) and verify that `onSubmit` is called with the expected form data.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/interaction-test-complex.md#_snippet_6

LANGUAGE: JavaScript
CODE:
```
import { fn, expect } from 'storybook/test';

import { users } from '#mocks';
import { EventForm } from './EventForm.svelte';

export default {
  component: EventForm,
};

export const Submits = {
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

TITLE: Defining JavaScript Stories with Play Function
DESCRIPTION: This JavaScript Component Story Format (CSF) example defines `EmptyForm` and `FilledForm` stories for a `LoginForm` component. The `FilledForm` story uses a `play` function to simulate user input and button clicks, followed by an assertion to verify the DOM structure after interaction.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/login-form-with-play-function.md#_snippet_6

LANGUAGE: js
CODE:
```
import { expect, userEvent, within } from 'storybook/test';

import LoginForm from './LoginForm.svelte';

export default {
  component: LoginForm,
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

TITLE: Defining Storybook Preview Configuration with definePreview (TypeScript/JavaScript)
DESCRIPTION: This snippet illustrates how to define the Storybook preview configuration using `definePreview`. It enables type-safe configuration of addons and parameters, providing autocompletion and type checking for project-wide story settings.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/api/csf/csf-factories.mdx#_snippet_1

LANGUAGE: typescript
CODE:
```
// Replace your-framework with the framework you are using (e.g., react-vite, nextjs, nextjs-vite)
import { definePreview } from '@storybook/your-framework';
import addonA11y from '@storybook/addon-a11y';

export default definePreview({
  // 👇 Add your addons here
  addons: [addonA11y()],
  parameters: {
    // type-safe!
    a11y: {
      options: { xpath: true },
    },
  },
});
```

----------------------------------------

TITLE: Configuring TypeScript Storybook ArgTypes with Conditional Logic for Common Frameworks
DESCRIPTION: This TypeScript CSF example demonstrates how to define 'argTypes' for a component in Storybook, using the standard 'Meta' type for common frameworks. It showcases various conditional display rules for controls based on argument existence, truthiness, and specific values, including conditions tied to global types.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/arg-types-if.md#_snippet_6

LANGUAGE: TypeScript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta } from '@storybook/your-framework';

import { Example } from './Example';

const meta = {
  component: Example,
  argTypes: {
    parent: { control: 'select', options: ['one', 'two', 'three'] },

    // 👇 Only shown when `parent` arg exists
    parentExists: { if: { arg: 'parent', exists: true } },

    // 👇 Only shown when `parent` arg does not exist
    parentDoesNotExist: { if: { arg: 'parent', exists: false } },

    // 👇 Only shown when `parent` arg value is truthy
    parentIsTruthy: { if: { arg: 'parent' } },
    parentIsTruthyVerbose: { if: { arg: 'parent', truthy: true } },

    // 👇 Only shown when `parent` arg value is not truthy
    parentIsNotTruthy: { if: { arg: 'parent', truthy: false } },

    // 👇 Only shown when `parent` arg value is 'three'
    parentIsEqToValue: { if: { arg: 'parent', eq: 'three' } },

    // 👇 Only shown when `parent` arg value is not 'three'
    parentIsNotEqToValue: { if: { arg: 'parent', neq: 'three' } },

    // Each of the above can also be conditional on the value of a globalType, e.g.:

    // 👇 Only shown when `theme` global exists
    parentExists: { if: { global: 'theme', exists: true } },
  },
} satisfies Meta<typeof Example>;

export default meta;
```

----------------------------------------

TITLE: Configuring Storybook Main File (TS)
DESCRIPTION: This TypeScript snippet configures the main Storybook file, leveraging `StorybookConfig` type for better type safety. It defines the framework, story paths, and addons, similar to the JavaScript version. It's crucial to replace `your-framework` with the specific framework being used for proper integration.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-auto-docs-main-mdx-config.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
  framework: '@storybook/your-framework',
  stories: [
    //👇 Your documentation written in MDX along with your stories goes here
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
};

export default config;
```

----------------------------------------

TITLE: Defining ArgTypes with Conditional Controls in Svelte (TS)
DESCRIPTION: This snippet demonstrates defining `argTypes` for a Storybook component in a Svelte project using standard TypeScript CSF. It imports `Meta` from a framework-specific Storybook package and uses `satisfies Meta<typeof Button>` for type safety, configuring conditional control visibility for `margin`, `padding`, and `cornerRadius` based on the `advanced` argument.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/component-story-conditional-controls-toggle.md#_snippet_6

LANGUAGE: ts
CODE:
```
// Replace your-framework with svelte-vite or sveltekit
import type { Meta } from '@storybook/your-framework';

import Button from './Button.svelte';

const meta = {
  component: Button,
  argTypes: {
    label: { control: 'text' }, // Always shows the control
    advanced: { control: 'boolean' },
    // Only enabled if advanced is true
    margin: { control: 'number', if: { arg: 'advanced' } },
    padding: { control: 'number', if: { arg: 'advanced' } },
    cornerRadius: { control: 'number', if: { arg: 'advanced' } },
  },
} satisfies Meta<typeof Button>;

export default meta;
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

TITLE: Configuring Storybook Test Runner with Jest Image Snapshots (TypeScript)
DESCRIPTION: This TypeScript configuration, similar to its JavaScript counterpart, sets up the Storybook test runner for visual regression testing. It leverages `jest-image-snapshot` by extending Jest's `expect` and implements a `postVisit` hook to take screenshots of stories, ensuring the page is fully loaded before capturing, and then compares them to existing snapshots.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/test-runner-waitpageready.md#_snippet_1

LANGUAGE: ts
CODE:
```
import type { TestRunnerConfig } from '@storybook/test-runner';

import { waitForPageReady } from '@storybook/test-runner';

import { toMatchImageSnapshot } from 'jest-image-snapshot';

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    // Awaits for the page to be loaded and available including assets (e.g., fonts)
    await waitForPageReady(page);

    // Generates a snapshot file based on the story identifier
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
    });
  },
};

export default config;
```

----------------------------------------

TITLE: Running create-storybook
DESCRIPTION: Executes the create-storybook command with an optional version specifier.  Package managers like npm, pnpm, and Yarn will execute this command when running `create storybook`. You can specify a version (e.g., `@latest`, `@8`, `@next`) or it will default to the latest version.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/api/cli-options.mdx#_snippet_117

LANGUAGE: Shell
CODE:
```
create storybook[@version] [options]
```

----------------------------------------

TITLE: Testing Event Form Submission in Storybook (Svelte Component Story)
DESCRIPTION: This Svelte component story defines a Storybook test case for the `EventForm` using Svelte's Component Story Format. It uses `defineMeta` for component metadata and sets up `args` to mock `getUsers` and `onSubmit`. The `beforeEach` hook resolves `getUsers` with mock data, and the `play` function simulates user input and form submission, asserting that the `onSubmit` callback receives the correct data.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/interaction-test-complex.md#_snippet_5

LANGUAGE: JavaScript
CODE:
```
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn, expect } from 'storybook/test';

  import { users } from '#mocks';
  import { EventForm } from './EventForm.svelte';

  const { Story } = defineMeta({
    component: EventForm,
  });
</script>

<Story
  name="Submits"
  args={{
    // Mock functions so we can manipulate and spy on them
    getUsers: fn(),
    onSubmit: fn(),
  }}
  beforeEach={async ({ args }) => {
    // Manipulate `getUsers` mock to return mocked value
    args.getUsers.mockResolvedValue(users);
  }}
  play={async ({ args, canvas, userEvent }) => {
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
  }}
/>
```

----------------------------------------

TITLE: Configuring Storybook Main File with JavaScript
DESCRIPTION: This JavaScript snippet configures the `.storybook/main.js` file for Storybook. It sets the UI framework, defines the glob patterns for story files (MDX and various JS/TS formats), and includes essential addons like `@storybook/addon-docs` and `@storybook/addon-styling-webpack`. The styling addon is configured to process CSS files using `style-loader`, `css-loader`, and `postcss-loader`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-addons.md#_snippet_0

LANGUAGE: js
CODE:
```
export default {
  // Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  implementation: require.resolve('postcss')
                }
              }
            ]
          }
        ]
      }
    }
  ]
};
```

----------------------------------------

TITLE: Configuring Storybook Main File in TypeScript
DESCRIPTION: This snippet illustrates configuring the Storybook `main.ts` file using TypeScript, leveraging the `StorybookConfig` type for strong typing. It specifies the framework, story file locations, includes the `addon-docs` for documentation generation, and points to a static assets directory. The `autodocs` option is set to 'tag' for automatic documentation generation.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-typical.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // Required
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

TITLE: Testing NoteUI Save Flow with Storybook (Common Framework, TypeScript)
DESCRIPTION: This Storybook story defines a 'Save Flow' for the NoteUI component, demonstrating how to simulate user interaction and assert the behavior of a mocked function. It uses storybook/test utilities to click a save button and verify that the saveNote mock function is called, ensuring the component's interaction with external actions is correctly tested. It's configured for a generic framework.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/storybook-test-fn-mock-spy.md#_snippet_6

LANGUAGE: TypeScript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { expect } from 'storybook/test';

// 👇 Must include the `.mock` portion of filename to have mocks typed correctly
import { saveNote } from '#app/actions.mock';
import { createNotes } from '#mocks/notes';

import NoteUI from './note-ui';

const meta = { component: NoteUI } satisfies Meta<typeof NoteUI>;
export default meta;

type Story = StoryObj<typeof meta>;

const notes = createNotes();

export const SaveFlow: Story = {
  name: 'Save Flow ▶',
  args: {
    isEditing: true,
    note: notes[0],
  },
  play: async ({ canvas, userEvent }) => {
    const saveButton = canvas.getByRole('menuitem', { name: /done/i });
    await userEvent.click(saveButton);
    // 👇 This is the mock function, so you can assert its behavior
    await expect(saveNote).toHaveBeenCalled();
  },
};
```

----------------------------------------

TITLE: Configuring Storybook Main File in TypeScript
DESCRIPTION: This snippet illustrates how to configure the Storybook `main.ts` file using TypeScript. It imports `StorybookConfig` for type safety, sets the framework, specifies story file locations (MDX and various JS/TS formats), and disables the `project.json` feature in the core settings. This configuration is essential for Storybook's setup.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-core-disable-project-json.md#_snippet_1

LANGUAGE: typescript
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableProjectJson: true,
  },
};

export default config;
```

----------------------------------------

TITLE: Defining Storybook ArgTypes with Diverse Controls - JavaScript
DESCRIPTION: This snippet illustrates how to define `argTypes` within a Storybook `meta` object, mapping component properties to various UI controls. It includes examples for object, file upload, radio buttons, checkboxes, select dropdowns, text input, color pickers, and date pickers, enabling interactive property manipulation in Storybook's Args table.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/gizmo-story-controls-customization.md#_snippet_4

LANGUAGE: JavaScript
CODE:
```
      control: 'object',
    },
    texture: {
      control: {
        type: 'file',
        accept: '.png',
      },
    },
    position: {
      control: 'radio',
      options: ['left', 'right', 'center'],
    },
    rotationAxis: {
      control: 'check',
      options: ['x', 'y', 'z'],
    },
    scaling: {
      control: 'select',
      options: [10, 50, 75, 100, 200],
    },
    label: {
      control: 'text',
    },
    meshColors: {
      control: {
        type: 'color',
        presetColors: ['#ff0000', '#00ff00', '#0000ff'],
      },
    },
    revisionDate: {
      control: 'date',
    },
  },
};

export default meta;
```

----------------------------------------

TITLE: Automating Storybook Component Snapshot Tests with Vitest
DESCRIPTION: This TypeScript code provides a complete setup for running automated snapshot tests on Storybook components using Vitest. It dynamically discovers all story files, composes individual stories, and then iterates through each to render it in a JSDOM environment. A snapshot of the rendered component's DOM (`document.body.firstChild`) is then taken, ensuring visual consistency. It includes error handling for story composition and a small delay to ensure full rendering before snapshot capture.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/snapshot-tests-portable-stories.md#_snippet_3

LANGUAGE: TypeScript
CODE:
```
// @vitest-environment jsdom

// Replace your-framework with one of the supported Storybook frameworks (react, vue3)
import type { Meta, StoryFn } from '@storybook/your-framework';

import path from 'path';
import { describe, expect, test } from 'vitest';

// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import { composeStories } from '@storybook/your-framework';

type StoryFile = {
  default: Meta;
  [name: string]: StoryFn | Meta;
};

const compose = (entry: StoryFile): ReturnType<typeof composeStories<StoryFile>> => {
  try {
    return composeStories(entry);
  } catch (e) {
    throw new Error(
      `There was an issue composing stories for the module: ${JSON.stringify(entry)}, ${e}`
    );
  }
};

function getAllStoryFiles() {
  // Place the glob you want to match your story files
  const storyFiles = Object.entries(
    import.meta.glob<StoryFile>('./stories/**/*.(stories|story).@(js|jsx|mjs|ts|tsx)', {
      eager: true,
    })
  );

  return storyFiles.map(([filePath, storyFile]) => {
    const storyDir = path.dirname(filePath);
    const componentName = path.basename(filePath).replace(/\.(stories|story)\.[^/.]+$/, '');
    return { filePath, storyFile, componentName, storyDir };
  });
}

describe('Stories Snapshots', () => {
  getAllStoryFiles().forEach(({ storyFile, componentName }) => {
    const meta = storyFile.default;
    const title = meta.title || componentName;

    describe(title, () => {
      const stories = Object.entries(compose(storyFile)).map(([name, story]) => ({ name, story }));

      if (stories.length <= 0) {
        throw new Error(
          `No stories found for this module: ${title}. Make sure there is at least one valid story for this module.`
        );
      }

      stories.forEach(({ name, story }) => {
        test(name, async () => {
          await story.run();
          // Ensures a consistent snapshot by waiting for the component to render by adding a delay of 1 ms before taking the snapshot.
          await new Promise((resolve) => setTimeout(resolve, 1));
          expect(document.body.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
```

----------------------------------------

TITLE: Defining Svelte Storybook Story (JS CSF) with Play Function
DESCRIPTION: This Svelte snippet defines a Storybook story using JavaScript Component Story Format (CSF) within a `<script module>` block. It imports `defineMeta` from `@storybook/addon-svelte-csf` to set up the component. The `Story` component is used to define `ExampleStory`, which includes a `play` function to simulate user interactions like typing and clicking on elements.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/play-function-with-canvas.md#_snippet_1

LANGUAGE: javascript
CODE:
```
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import MyComponent from './MyComponent.svelte';

  const { Story } = defineMeta({
    component: MyComponent,
  });
</script>

<Story
  name="ExampleStory"
  play={async ({ canvas, userEvent }) => {
    // Starts querying from the component's root element
    await userEvent.type(canvas.getByTestId('example-element'), 'something');
    await userEvent.click(canvas.getByRole('button'));
  }} />
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

TITLE: Defining Storybook Meta for Button (Common TypeScript)
DESCRIPTION: This TypeScript snippet defines Storybook metadata for a generic `Button` component, suitable for common TypeScript-based frameworks like React or Vue. It uses the `satisfies Meta<typeof Button>` assertion for type safety and imports `Meta` from a framework-specific Storybook package, setting `title` and `component`.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-default-export.md#_snippet_5

LANGUAGE: ts
CODE:
```
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
```

----------------------------------------

TITLE: Defining Primary Button Story in Solid (TypeScript)
DESCRIPTION: This snippet defines a basic Storybook story for a Button component in a SolidJS project using TypeScript. It imports `Meta` and `StoryObj` types from `storybook-solidjs`, sets the component for the story, and exports a `Primary` story with `primary: true` argument.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/csf-3-example-starter.md#_snippet_3

LANGUAGE: TypeScript
CODE:
```
import type { Meta, StoryObj } from 'storybook-solidjs';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { primary: true } };
```

----------------------------------------

TITLE: Defining Basic Button Story in Solid (TypeScript)
DESCRIPTION: This snippet defines a basic Storybook story for a SolidJS Button component using TypeScript. It sets the component, defines a 'Basic' story, and renders the Button with a label and an onClick action, using satisfies Meta for type safety.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/button-story-click-handler.md#_snippet_4

LANGUAGE: tsx
CODE:
```
import type { Meta, StoryObj } from 'storybook-solidjs';

import { action } from 'storybook/actions';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Button label="Hello" onClick={action('clicked')} />,
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

TITLE: Configuring Storybook with JavaScript
DESCRIPTION: This snippet defines the main Storybook configuration in JavaScript, specifying the UI framework, the location of story files (MDX and various JS/TS formats), and the logging level. It's essential for Storybook to find and render your components.
SOURCE: https://github.com/storybookjs/storybook/blob/next/docs/_snippets/main-config-log-level.md#_snippet_0

LANGUAGE: js
CODE:
```
export default {
  // Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  logLevel: 'debug'
};
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

TITLE: Using CSF Format with Args (Correct)
DESCRIPTION: This code demonstrates another correct way to define stories in Storybook using the CSF (Component Story Format) with args. It exports a default object containing the component and then exports individual stories as named exports with args defined. This allows for more control over the component's properties.
SOURCE: https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/no-stories-of.md#_snippet_2

LANGUAGE: javascript
CODE:
```
import Button from '../components/Button';

export default = {
  component: Button
}

export const Primary = {
  args: {
    primary: true
  }
}
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