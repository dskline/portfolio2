---
applyTo: '*.tsx'
---

# Tailwind CSS Formatting Guidelines

This document outlines the recommended formatting practices for Tailwind CSS to ensure consistency and maintainability across the project.

## Class Order

The order of Tailwind CSS classes should follow a consistent and logical structure. Biome automatically handles class sorting according to its default configuration, which is the standard we will adhere to.

**General Principles:**

1.  **Group Related Classes:** Keep classes that modify similar CSS properties together. For example, all flexbox-related classes should be grouped, all padding/margin classes together, etc.
2.  **Order by Importance/Specificity (Conceptual):** While Biome handles the exact order, think from general layout to specific styling. For instance, layout (display, position), box model (margin, padding, border, width, height), then typography, backgrounds, and finally states (hover, focus).
3.  **Readability:** The primary goal of a consistent order is to make the HTML templates easier to read and understand at a glance.

**Biome-Managed Order:**

Biome sorts classes based on a predefined order that generally follows these categories (similar to the `prettier-plugin-tailwindcss` logic it often integrates or emulates):

*   **Layout & Display:** `block`, `flex`, `grid`, `hidden`, `static`, `fixed`, `absolute`, `relative`, `sticky`, etc.
*   **Flexbox & Grid:** `flex-row`, `items-center`, `justify-between`, `gap-4`, `col-span-2`, etc.
*   **Spacing:** `p-4`, `m-2`, `space-x-4`, etc.
*   **Sizing:** `w-full`, `h-screen`, `min-w-0`, etc.
*   **Typography:** `font-bold`, `text-lg`, `text-red-500`, `leading-tight`, `tracking-wider`, etc.
*   **Backgrounds:** `bg-blue-500`, `bg-opacity-50`, `bg-gradient-to-r`, etc.
*   **Borders:** `border`, `border-gray-300`, `rounded-lg`, etc.
*   **Effects & Filters:** `shadow-lg`, `opacity-75`, `blur-sm`, etc.
*   **Transitions & Animations:** `transition`, `duration-300`, `ease-in-out`, `animate-pulse`, etc.
*   **Interactivity & States:** `hover:bg-blue-700`, `focus:ring-2`, `disabled:opacity-50`, `group-hover:text-white`, etc.

**Example:**

*Before (potentially unsorted):*
`<button class="text-white p-2 bg-blue-500 rounded font-bold hover:bg-blue-700 m-1">`

*After (sorted by Biome):*
`<button class="m-1 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700">`
*(Note: The exact output order of Biome might vary slightly based on its internal logic and version, but it will be consistent.)*

## Responsive Design: Container Queries over Viewport Breakpoints

When designing responsive layouts, **prefer Tailwind CSS's container queries (`@container`) over traditional viewport-based breakpoints (`sm:`, `md:`, `lg:`, etc.)** whenever the component's layout depends on the size of its parent container rather than the overall viewport. This approach leads to more modular and reusable components.

**Key Principles for Container Queries:**

1.  **Identify Container-Dependent Components:** Use container queries for components whose layout or styling should adapt based on the width or height of their direct or a named ancestor container.
2.  **Define a Named Container Context:** Apply the `@container/{name}` utility to the parent element that will serve as the container. Assigning a descriptive name (e.g., `@container/sidebar`, `@container/productCard`, `@container/Toolbox`) is highly recommended for readability and maintainability, especially in complex layouts or when nesting containers.
    ```html
    <div class="@container/productCard">
      {/* Child elements will respond to this 'productCard' container's size */}
      <div class="block @md/productCard:flex"> {/* Styles apply when 'productCard' container is >= @md breakpoint */}
        {/* ... */}
      </div>
    </div>
    ```
3.  **Use Container-Specific Breakpoints with Names:** When applying responsive styles to child elements, reference the named container. Tailwind provides container-specific variants (e.g., `@sm/{name}`, `@md/{name}`, `@lg/{name}`) that apply to the named container's dimensions.
    ```html
    <div class="@container/gallery">
      <div class="grid grid-cols-1 @sm/gallery:grid-cols-2 @lg/gallery:grid-cols-4">
        {/* Columns adjust based on the 'gallery' container's width */}
      </div>
    </div>
    ```
    For instance, if you have a main content area named `contentArea` and a sidebar within it named `sidebarNav`, you might style them like so:
    ```html
    <div class="@container/contentArea">
      {/* ... other content ... */}
      <nav class="@container/sidebarNav w-full @md/contentArea:w-1/4">
        {/* Sidebar content */}
        <ul class="flex flex-col @xs/sidebarNav:flex-row">
          {/* Nav items adjust based on sidebarNav's width */}
        </ul>
      </nav>
    </div>
    ```
4.  **Unnamed Containers (Use Sparingly):** While you can use anonymous containers (`@container` without a name), this is generally discouraged in favor of named containers for clarity. Anonymous containers can be acceptable for very simple, localized scenarios where the relationship is obvious and naming would be overly verbose.
5.  **Min, Max, and Range Queries with Names:** Utilize `@min-*`, `@max-*`, and range syntax with named containers for more precise control.
    *   `@max-md/{name}:<class>`: Applies `<class>` if the named container `{name}` is *smaller than* its `md` breakpoint.
    *   `@min-md/{name}:@max-xl/{name}:<class>`: Applies `<class>` if the named container `{name}` is *between* its `md` and `xl` breakpoints.

**When to Still Use Viewport Breakpoints:**

*   **Global Layout Changes:** For adjustments that genuinely depend on the overall browser window size (e.g., main page structure, navigation bars that change significantly based on viewport).
*   **Full-Page Components:** When a component inherently occupies the full viewport width or a significant, predictable portion of it.
*   **Legacy Code or Simplicity:** In some simpler cases or when refactoring incrementally, viewport breakpoints might still be used, but aim to transition to container queries where appropriate for new development.

**Example: Preferring Container Query**

*Instead of this (viewport-based):*
```html
<div class="w-full p-2 sm:p-4 md:w-1/2 lg:flex lg:items-center">
  {/* This component's responsiveness is tied to the viewport */}
</div>
```

*Prefer this (named container-based):*
```html
<div class="@container/card"> {/* Named container */}
  <div class="w-full p-2 @sm/card:p-4 @md/card:w-1/2 @lg/card:flex @lg/card:items-center">
    {/* This component's responsiveness is tied to its 'card' parent container */}
  </div>
</div>
```
This makes the inner `div` more reusable and the responsive logic clearer, especially in complex UIs.

## States

State modifiers like `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:`, etc., should be placed at the end of the class list or immediately after the class they modify if it enhances readability for a specific case. Biome will also handle the consistent placement of these.

**Example:**
`<button class="bg-blue-500 p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">`

## Custom Classes

When custom CSS classes are necessary (e.g., for complex animations or when Tailwind doesn't offer a utility), they should be clearly named and documented. If used alongside Tailwind utilities, their placement should be logical, though Biome will primarily sort utility classes.

## Linting and Formatting

Ensure that your editor is configured to use Biome. This will automate the formatting process on save or commit, enforcing these guidelines.

By adhering to these guidelines, we can maintain a clean, readable, and consistent codebase.