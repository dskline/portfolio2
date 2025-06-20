---
applyTo: '**/*.tsx'
---
TITLE: Creating a Reusable React Component with Tailwind CSS
DESCRIPTION: Demonstrates how to build a reusable React component (`VacationCard`) using Tailwind CSS utility classes for styling. Shows how props can be used to make the component dynamic, allowing for easy reuse with different content.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_30

LANGUAGE: jsx
CODE:
```
export function VacationCard({ img, imgAlt, eyebrow, title, pricing, url }) {
  return (
    <div>
      <img className="rounded-lg" src={img} alt={imgAlt} />
      <div className="mt-4">
        <div className="text-xs font-bold text-sky-500">{eyebrow}</div>
        <div className="mt-1 font-bold text-gray-700">
          <a href={url} className="hover:underline">
            {title}
          </a>
        </div>
        <div className="mt-2 text-sm text-gray-600">{pricing}</div>
      </div>
    </div>
  );
}
```

----------------------------------------

TITLE: Installing Tailwind CSS v4.0
DESCRIPTION: Three-step installation process for Tailwind CSS v4.0, showing how to install the package, add the PostCSS plugin, and import Tailwind in your CSS file.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx#2025-04-22_snippet_1

LANGUAGE: shell
CODE:
```
npm i tailwindcss @tailwindcss/postcss;
```

LANGUAGE: javascript
CODE:
```
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

LANGUAGE: css
CODE:
```
@import "tailwindcss";
```

----------------------------------------

TITLE: Basic Background Color Example
DESCRIPTION: Demonstrates the basic usage of background color utilities with three different colored buttons
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/background-color.mdx#2025-04-22_snippet_1

LANGUAGE: html
CODE:
```
<button class="bg-blue-500 ...">Button A</button>
<button class="bg-cyan-500 ...">Button B</button>
<button class="bg-pink-500 ...">Button C</button>
```

----------------------------------------

TITLE: Basic Text Color Example - HTML
DESCRIPTION: Demonstrates basic text color utility usage with blue and sky color variants, including dark mode support.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/color.mdx#2025-04-22_snippet_1

LANGUAGE: html
CODE:
```
<p class="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
```

----------------------------------------

TITLE: Building Component with Tailwind Utilities (HTML)
DESCRIPTION: Demonstrates building a responsive component using Tailwind CSS utility classes in pure HTML. It shows responsive variants (sm:), spacing (gap), layout (flex, items-center), and state variants (hover:, active:) for styling, serving as the HTML equivalent of the React example.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_3

LANGUAGE: html
CODE:
```
<!-- [!code classes:sm:flex-row,sm:py-4,sm:gap-6,sm:mx-0,sm:shrink-0,sm:text-left,sm:items-center] -->
<!-- [!code classes:hover:text-white,hover:bg-purple-600,hover:border-transparent,active:bg-purple-700] -->
<div class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
  <img class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg" alt="" />
  <div class="space-y-2 text-center sm:text-left">
    <div class="space-y-0.5">
      <p class="text-lg font-semibold text-black">Erin Lindford</p>
      <p class="font-medium text-gray-500">Product Engineer</p>
    </div>
    <!-- prettier-ignore -->
    <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
      Message
    </button>
  </div>
</div>
```

----------------------------------------

TITLE: Using the New Line-Height Shorthand in Tailwind CSS
DESCRIPTION: This HTML snippet demonstrates the new line-height shorthand syntax in Tailwind CSS, allowing you to set both font-size and line-height with a single utility class. It shows the transition from the old `text-lg leading-7` syntax to the new `text-lg/7` syntax.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-3/index.mdx#_snippet_30

LANGUAGE: HTML
CODE:
```
<p class="text-lg leading-7 ..."><!-- [!code --] --><p class="text-lg/7 ..."><!-- [!code ++] -->
  So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way
  past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living
  things but I tell you Jerry at that moment, I <em>was</em> a marine biologist.
</p>
```

----------------------------------------

TITLE: Basic Padding Example in Tailwind CSS
DESCRIPTION: Demonstrates the usage of the 'p-8' utility class to add padding to all sides of an element.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/padding.mdx#2025-04-22_snippet_2

LANGUAGE: html
CODE:
```
<!-- [!code classes:p-8] -->
<div class="p-8 ...">p-8</div>
```

----------------------------------------

TITLE: Defining Grid Column Spanning in HTML with Tailwind CSS
DESCRIPTION: This HTML snippet demonstrates how to use Tailwind CSS classes to create a grid layout with columns spanning multiple grid cells. It uses classes like 'grid', 'grid-cols-3', and 'col-span-2' to control the layout.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/grid-column.mdx#2025-04-22_snippet_1

LANGUAGE: html
CODE:
```
<div class="grid grid-cols-3 gap-4">
  <div class="...">01</div>
  <div class="...">02</div>
  <div class="...">03</div>
  <div class="col-span-2 ...">04</div>
  <div class="...">05</div>
  <div class="...">06</div>
  <div class="col-span-2 ...">07</div>
</div>
```

----------------------------------------

TITLE: Using Flex Display Utility in Tailwind CSS
DESCRIPTION: HTML example showing how to use the flex utility to create a block-level flex container, enabling flexible box layout for arranging items like profile cards with images and text.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/display.mdx#2025-04-22_snippet_3

LANGUAGE: html
CODE:
```
<!-- [!code classes:flex] -->
<div class="flex items-center">
  <img src="path/to/image.jpg" />
  <div>
    <strong>Andrew Alfred</strong>
    <span>Technical advisor</span>
  </div>
</div>
```

----------------------------------------

TITLE: CSS-First Theme Configuration
DESCRIPTION: Demonstrates the new CSS-based configuration approach using @theme directive to define custom properties like fonts, breakpoints, colors, and animation easings.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx#2025-04-22_snippet_6

LANGUAGE: css
CODE:
```
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 1920px;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* ... */
}
```

----------------------------------------

TITLE: Horizontal Padding Example in Tailwind CSS
DESCRIPTION: Demonstrates the use of the 'px-8' utility to add horizontal padding to an element.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/padding.mdx#2025-04-22_snippet_4

LANGUAGE: html
CODE:
```
<!-- [!code classes:px-8] -->
<div class="px-8 ...">px-8</div>
```

----------------------------------------

TITLE: Implementing Dark Mode Toggle with System Theme Support in JavaScript
DESCRIPTION: This JavaScript snippet shows how to implement a dark mode toggle that supports light mode, dark mode, and system theme preference using localStorage and the matchMedia API.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/dark-mode.mdx#2025-04-22_snippet_5

LANGUAGE: JavaScript
CODE:
```
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
);

// Whenever the user explicitly chooses light mode
localStorage.theme = "light";

// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```

----------------------------------------

TITLE: Responsive Image Width Example
DESCRIPTION: Demonstrates using responsive utility classes to adjust image width across different breakpoints. Width starts at 16 units, increases to 32 at medium screens, and 48 at large screens.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx#2025-04-22_snippet_1

LANGUAGE: html
CODE:
```
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

----------------------------------------

TITLE: Updating Tailwind CLI Commands
DESCRIPTION: Updated CLI commands using the new @tailwindcss/cli package for building CSS.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx#2025-04-22_snippet_3

LANGUAGE: sh
CODE:
```
npx @tailwindcss/cli -i input.css -o output.css
```

----------------------------------------

TITLE: Creating Bidirectional Image Galleries with React and Tailwind CSS
DESCRIPTION: React JSX implementation of scrollable image galleries that support both left-to-right and right-to-left text directions using Tailwind CSS logical properties for scroll margins.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/scroll-margin.mdx#2025-04-22_snippet_4

LANGUAGE: jsx
CODE:
```
<>
  <p className="mb-4 pt-8 pl-6 text-sm font-medium">Left-to-right</p>
  <div className="flex w-full snap-x gap-12 overflow-x-auto pb-10" dir="ltr">
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pr-[calc(100%-21.5rem)]">
      <Stripes border className="absolute start-0 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pr-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pr-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pr-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pr-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
  </div>
  <p className="mt-4 mb-4 pl-6 text-sm font-medium">Right-to-left</p>
  <div className="flex w-full snap-x gap-12 overflow-x-auto pb-10" dir="rtl">
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pl-[calc(100%-21.5rem)]">
      <Stripes border className="absolute start-0 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pl-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pl-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pl-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
    <div className="relative shrink-0 snap-start scroll-ms-6 first:ps-6 last:pl-[calc(100%-21.5rem)]">
      <Stripes border className="absolute -start-6 top-0 bottom-0 w-6" />
      <img
        className="relative h-40 w-80 shrink-0 rounded-lg bg-white"
        src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
      />
    </div>
  </div>
</>
```

----------------------------------------

TITLE: HTML Variant Comparison in Tailwind CSS v4
DESCRIPTION: Demonstrates the new composable variants feature in Tailwind CSS v4.0, showing how to replace custom selectors like 'group-has-[&:focus]' with simpler variants like 'group-has-focus' that compose naturally.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4-alpha/index.mdx#2025-04-22_snippet_1

LANGUAGE: html
CODE:
```
<div class="group">
  <div class="group-has-[&:focus]:opacity-100"> <!-- [!code --] -->
  <div class="group-has-focus:opacity-100"> <!-- [!code ++] -->
      <!-- ... -->
    </div>
  </div>
</div>
```

----------------------------------------

TITLE: Basic Container Query Usage in TailwindCSS
DESCRIPTION: Demonstrates the basic syntax for using container queries with TailwindCSS, using the new @ prefix to differentiate from media queries.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-2/index.mdx#2025-04-22_snippet_12

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="block @lg:flex">
    <!-- ... -->
  </div>
</div>
```

----------------------------------------

TITLE: Rendering Percentage Width Example with Example Component (JSX)
DESCRIPTION: Uses the `Example` and `Figure` components to render a visual demonstration of percentage-based width utilities (`w-1/2`, `w-2/5`, `w-full`, etc.). The inner JSX uses flex containers (`flex`) to arrange `div` elements styled with different `w-<fraction>` classes, showing how they occupy portions of their parent container. Responsive classes (`sm:flex`) hide some rows on smaller screens.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/width.mdx#2025-04-22_snippet_5

LANGUAGE: jsx
CODE:
```
<Figure>

<Example>
  {
    <div className="space-y-4 font-mono text-xs font-bold text-white">
      <div className="flex gap-x-4">
        <div className="w-1/2 rounded-lg bg-violet-500 px-4 py-2 text-center">w-1/2</div>
        <div className="w-1/2 rounded-lg bg-violet-500 px-4 py-2 text-center">w-1/2</div>
      </div>
      <div className="flex gap-x-4">
        <div className="w-2/5 rounded-lg bg-violet-500 px-4 py-2 text-center">w-2/5</div>
        <div className="w-3/5 rounded-lg bg-violet-500 px-4 py-2 text-center">w-3/5</div>
      </div>
      <div className="flex gap-x-4">
        <div className="w-1/3 rounded-lg bg-violet-500 px-4 py-2 text-center">w-1/3</div>
        <div className="w-2/3 rounded-lg bg-violet-500 px-4 py-2 text-center">w-2/3</div>
      </div>
      <div className="hidden gap-x-4 sm:flex">
        <div className="w-1/4 rounded-lg bg-violet-500 px-4 py-2 text-center">w-1/4</div>
        <div className="w-3/4 rounded-lg bg-violet-500 px-4 py-2 text-center">w-3/4</div>
      </div>
      <div className="hidden gap-x-4 sm:flex">
        <div className="w-1/5 rounded-lg bg-violet-500 px-4 py-2 text-center">w-1/5</div>
        <div className="w-4/5 rounded-lg bg-violet-500 px-4 py-2 text-center">w-4/5</div>
      </div>
      <div className="hidden gap-x-4 sm:flex">
        <div className="w-1/6 rounded-lg bg-violet-500 px-4 py-2 text-center">w-1/6</div>
        <div className="w-5/6 rounded-lg bg-violet-500 px-4 py-2 text-center">w-5/6</div>
      </div>
      <div className="w-full rounded-lg bg-violet-500 px-4 py-2 text-center font-mono text-white">w-full</div>
    </div>
  }
</Example>
```

----------------------------------------

TITLE: Responsive Grid Layout with Tailwind CSS and Breakpoints (JSX)
DESCRIPTION: This JSX snippet demonstrates a responsive grid layout using Tailwind CSS utility classes within a React component context. The grid changes from 2 columns to 3 columns at the `@sm` breakpoint using the `@sm:grid-cols-3` class. This requires Tailwind CSS configured with container queries or standard breakpoints.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_9

LANGUAGE: JSX
CODE:
```
<div className="grid grid-cols-2 gap-4 text-center font-mono font-medium text-white @sm:grid-cols-3">
  <div className="rounded-lg bg-sky-500 p-4">01</div>
  <div className="rounded-lg bg-sky-500 p-4">02</div>
  <div className="rounded-lg bg-sky-500 p-4">03</div>
  <div className="rounded-lg bg-sky-500 p-4">04</div>
  <div className="rounded-lg bg-sky-500 p-4">05</div>
  <div className="rounded-lg bg-sky-500 p-4">06</div>
</div>
```

----------------------------------------

TITLE: Data Attribute Targeting Example
DESCRIPTION: Demonstrates targeting custom boolean data attributes without configuration.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx#2025-04-22_snippet_9

LANGUAGE: html
CODE:
```
<div data-current class="opacity-75 data-current:opacity-100">
  <!-- ... -->
</div>
```

----------------------------------------

TITLE: Using Grid Display Utility in Tailwind CSS
DESCRIPTION: HTML example showing how to use the grid utility to create a CSS grid container, which is useful for two-dimensional layouts with rows and columns.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/display.mdx#2025-04-22_snippet_5

LANGUAGE: html
CODE:
```
<!-- [!code classes:grid] -->
<div class="grid grid-cols-3 grid-rows-3 gap-4">
  <!-- ... -->
</div>
```

----------------------------------------

TITLE: Conditionally Applying Tailwind Classes in React to Avoid Conflicts
DESCRIPTION: Provides an example in React/JSX showing how to use conditional logic (a ternary operator) to apply only one of two potentially conflicting Tailwind classes (`grid` or `flex`) based on a component prop (`gridLayout`). This is a common pattern in component-based frameworks to prevent style conflicts.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_33

LANGUAGE: jsx
CODE:
```
// [!code filename:example.jsx]
// [!code word:gridLayout\ \?\ "grid"\ \:\ "flex"]
export function Example({ gridLayout }) {
  return <div className={gridLayout ? "grid" : "flex"}>{/* ... */}</div>;
}
```

----------------------------------------

TITLE: Implementing Headless Checkbox (React/JSX)
DESCRIPTION: Illustrates the usage of the new `Checkbox` component along with `Field`, `Label`, and `Description` to create a custom-styled checkbox input with proper accessibility attributes. It shows how state (`data-checked`, `data-focus`) can be used for styling via CSS classes.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/headless-ui-v2/index.mdx#_snippet_2

LANGUAGE: jsx
CODE:
```
import { Checkbox, Description, Field, Label } from "@headlessui/react";
import { CheckmarkIcon } from "./icons/checkmark";
import clsx from "clsx";

function Example() {
  return (
    <Field>
      // [!code highlight:11]
      <Checkbox
        defaultChecked
        className={clsx(
          "size-4 rounded border bg-white dark:bg-white/5",
          "data-[checked]:border-transparent data-[checked]:bg-blue-500",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500",
        )}
      >
        <CheckmarkIcon className="stroke-white opacity-0 group-data-[checked]:opacity-100" />
      </Checkbox>
      <div>
        <Label>Enable beta features</Label>
        <Description>This will give you early access to any awesome new features we're developing.</Description>
      </div>
    </Field>
  );
}
```

----------------------------------------

TITLE: Building Component with Tailwind Utilities (React)
DESCRIPTION: Demonstrates building a responsive component using Tailwind CSS utility classes within a React/JSX context. It showcases responsive variants (@sm:), spacing (space-y, gap-x), layout (flex, items-center), and state variants (hover:, active:) for styling.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_2

LANGUAGE: javascript
CODE:
```
<div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg ring ring-black/5 @sm:flex @sm:items-center @sm:space-y-0 @sm:gap-x-6 @sm:py-4">
  <img
    className="mx-auto block h-24 rounded-full @sm:mx-0 @sm:shrink-0"
    src={erinLindford.src}
    alt="Woman's Face"
  />
  <div className="space-y-2 text-center @sm:text-left">
    <div className="space-y-0.5">
      <p className="text-lg font-semibold text-black">Erin Lindford</p>
      <p className="font-medium text-gray-500">Product Engineer</p>
    </div>
    <button className="rounded-full border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">
      Message
    </button>
  </div>
</div>
```

----------------------------------------

TITLE: Styling Hover State with Tailwind (HTML)
DESCRIPTION: Shows how to apply styles to an element's hover state using Tailwind CSS state variants in pure HTML. The `hover:` prefix is used before a utility class (e.g., `hover:bg-sky-700`) to apply that style only when the element is hovered, serving as the HTML equivalent of the React example.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_5

LANGUAGE: html
CODE:
```
<!-- [!code word:hover\:bg-sky-700] -->
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

----------------------------------------

TITLE: Generating an ESM Config File
DESCRIPTION: This shell command generates an ES Module (ESM) config file for Tailwind CSS. The `--esm` flag tells the `tailwindcss init` command to create the configuration file using ES module syntax.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-3/index.mdx#_snippet_3

LANGUAGE: Shell
CODE:
```
npx tailwindcss init --esm
```

----------------------------------------

TITLE: Applying Simultaneous Width/Height Utilities in HTML
DESCRIPTION: HTML code snippet demonstrating the use of Tailwind's `size-*` utility classes (`size-16`, `size-20`, `size-24`, `size-32`, `size-40`). These classes set both the `width` and `height` properties of the `div` elements simultaneously, typically based on the spacing scale. The comment indicates which classes are being demonstrated.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/width.mdx#2025-04-22_snippet_12

LANGUAGE: html
CODE:
```
<!-- [!code classes:size-16,size-20,size-24,size-32,size-40] -->
<div class="size-16 ...">size-16</div>
<div class="size-20 ...">size-20</div>
<div class="size-24 ...">size-24</div>
<div class="size-32 ...">size-32</div>
<div class="size-40 ...">size-40</div>
```

----------------------------------------

TITLE: Basic Container Query Implementation
DESCRIPTION: Demonstrates basic usage of container queries with Tailwind's @container class and responsive variants.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx#2025-04-22_snippet_12

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

----------------------------------------

TITLE: Using CSS Variables Instead of theme() Function in Tailwind CSS v4
DESCRIPTION: Demonstrates the recommended approach of using CSS variables instead of the theme() function for accessing theme values in Tailwind CSS v4.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx#2025-04-22_snippet_17

LANGUAGE: CSS
CODE:
```
.my-class {
  background-color: theme(colors.red.500);
  background-color: var(--color-red-500);
}
```

----------------------------------------

TITLE: Adding Horizontal Space Between Flex Children in HTML with Tailwind CSS
DESCRIPTION: This snippet demonstrates how to use the 'space-x-4' utility class to add horizontal spacing between flex child elements.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/margin.mdx#2025-04-22_snippet_7

LANGUAGE: html
CODE:
```
<div class="flex space-x-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

----------------------------------------

TITLE: Rendering Simultaneous Width/Height Example with Example Component (JSX)
DESCRIPTION: Uses the `Example` and `Figure` components to display a visual demonstration of `size-*` utilities (`size-16`, `size-20`, `size-24`, `size-32`, `size-40`). The inner JSX creates several `div` elements styled with these classes, setting both their width and height simultaneously based on the spacing scale. Responsive classes (`sm:grid`, `md:grid`) hide some elements on smaller screens.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/width.mdx#2025-04-22_snippet_11

LANGUAGE: jsx
CODE:
```
<Figure>

<Example>
  {
    <div className="grid grid-flow-col justify-center gap-4 text-center font-mono text-xs font-bold text-white">
      <div className="grid size-16 items-center justify-center rounded-lg bg-indigo-500">size-16</div>
      <div className="grid size-20 items-center justify-center rounded-lg bg-indigo-500">size-20</div>
      <div className="grid size-24 items-center justify-center rounded-lg bg-indigo-500">size-24</div>
      <div className="hidden size-32 items-center justify-center rounded-lg bg-indigo-500 sm:grid">size-32</div>
      <div className="hidden size-40 items-center justify-center rounded-lg bg-indigo-500 md:grid">size-40</div>
    </div>
  }
</Example>
```

----------------------------------------

TITLE: Applying Dark Mode Classes in HTML with Tailwind CSS
DESCRIPTION: This snippet demonstrates how to use Tailwind CSS classes to style elements differently in dark mode. It includes classes for background color and text color changes.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/dark-mode.mdx#2025-04-22_snippet_0

LANGUAGE: HTML
CODE:
```
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg class="h-6 w-6 stroke-white" ...>
        <!-- ... -->
      </svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

----------------------------------------

TITLE: Container Query Examples
DESCRIPTION: Demonstrates the new built-in container query support including min, max and range queries.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx#2025-04-22_snippet_11

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">
    <!-- ... -->
  </div>
</div>
```

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="grid grid-cols-3 @max-md:grid-cols-1">
    <!-- ... -->
  </div>
</div>
```

LANGUAGE: html
CODE:
```
<div class="@container">
  <div class="flex @min-md:@max-xl:hidden">
    <!-- ... -->
  </div>
</div>
```

----------------------------------------

TITLE: Styling Based on Parent State (group-hover)
DESCRIPTION: Illustrates how to use the `group-hover` variant to style a child element when a specific parent element is hovered. The parent needs the `group` class.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/styling-with-utility-classes.mdx#_snippet_22

LANGUAGE: HTML
CODE:
```
<!-- [!code filename:HTML] -->
<!-- [!code classes:group,group-hover:underline] -->
<a href="#" class="group rounded-lg p-8">
  <!-- ... -->
  <span class="group-hover:underline">Read more…</span>
</a>
```

LANGUAGE: CSS
CODE:
```
/* [!code filename:Simplified CSS] */
@media (hover: hover) {
  a:hover span {
    text-decoration-line: underline;
  }
}
```

----------------------------------------

TITLE: Migrating Space Utilities to Flex Gap in HTML
DESCRIPTION: Shows how to replace space utilities with flex layout and gap properties.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx#2025-04-22_snippet_10

LANGUAGE: html
CODE:
```
<div class="space-y-4 p-4">
<div class="flex flex-col gap-4 p-4">
  <label for="name">Name</label>
  <input type="text" name="name" />
</div>
```

----------------------------------------

TITLE: Styling Input Wrapper with :has() in React
DESCRIPTION: React component example demonstrating how to style a wrapper element based on the disabled state of its child input element using the :has() selector in Tailwind CSS.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-4/index.mdx#2025-04-22_snippet_5

LANGUAGE: jsx
CODE:
```
export function Input({ ... }) {
  return (
    <span className="has-[:disabled]:opacity-50 ...">
      <input ... />
    </span>
  )
}
```

----------------------------------------

TITLE: Styling Radio Button Parent with :has() in HTML
DESCRIPTION: Example showing how to style a label element based on the checked state of its radio button input using Tailwind CSS :has() variant classes.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-4/index.mdx#2025-04-22_snippet_4

LANGUAGE: html
CODE:
```
<label class="has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-500 ...">
  <svg fill="currentColor">
    <!-- ... -->
  </svg>
  Google Pay
  <input type="radio" class="accent-indigo-500 ..." />
</label>
```

----------------------------------------

TITLE: Blog Post Metadata Structure in Next.js with MDX
DESCRIPTION: Implementation of post metadata in MDX files using an exported meta object that contains information like title, description, publish date, authors, and Open Graph image details.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/building-the-tailwind-blog/index.mdx#2025-04-22_snippet_2

LANGUAGE: javascript
CODE:
```
import { bradlc } from "@/app/blog/authors";
import openGraphImage from "./card.jpeg";

export const meta = {
  title: "Introducing linting for Tailwind CSS IntelliSense",
  description: `Today we're releasing a new version of the Tailwind CSS IntelliSense extension for Visual Studio Code that adds Tailwind-specific linting to both your CSS and your markup.`,
  date: "2020-06-23T18:52:03Z",
  authors: [bradlc],
  image: openGraphImage,
  discussion: "https://github.com/tailwindcss/tailwindcss/discussions/1956",
};

// Post content goes here
```

----------------------------------------

TITLE: Correct Static Class Mapping in React
DESCRIPTION: Properly formatted React component that maps props to complete class names, allowing Tailwind to detect and generate all necessary utilities.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/detecting-classes-in-source-files.mdx#2025-04-22_snippet_4

LANGUAGE: jsx
CODE:
```
function Button({ color, children }) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
  };

  return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

----------------------------------------

TITLE: Resetting Border Styles in Preflight
DESCRIPTION: This CSS code shows how Preflight resets border styles for all elements to make it easy to add borders using Tailwind classes.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/preflight.mdx#2025-04-22_snippet_2

LANGUAGE: CSS
CODE:
```
*,
::after,
::before,
::backdrop,
::file-selector-button {
  box-sizing: border-box;
  border: 0 solid;
}
```

----------------------------------------

TITLE: Using size-* Utilities for Equal Dimensions
DESCRIPTION: Demonstrates the new size-* utility that sets both width and height simultaneously, simplifying common sizing patterns.
SOURCE: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v3-4/index.mdx#2025-04-22_snippet_8

LANGUAGE: html
CODE:
```
<div>
  <img class="size-10" ...>
  <img class="size-12" ...>
  <img class="size-14" ...>
</div>
```