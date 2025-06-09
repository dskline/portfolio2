"use client";

import { toggleDarkTheme } from "@/features/theme/dark";

export const Navbar = () => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800">
      <ul className="flex items-center justify-center">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/projects">Projects</a>
        </li>
        <li>
          <a href="/toolbox">Toolbox</a>
        </li>
        <li>
          <button
            type="button"
            onClick={toggleDarkTheme}
            aria-label="Toggle theme"
          >
            Toggle
          </button>
        </li>
      </ul>
    </nav>
  );
};
