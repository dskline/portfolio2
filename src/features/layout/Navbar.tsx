"use client";

import { toggleDarkTheme } from "../theme/dark";

export const Navbar = () => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800">
      <ul className="flex justify-center gap-4 p-4">
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
            onClick={() => toggleDarkTheme()}
            data-testid="theme-toggle-button"
          >
            Toggle
          </button>
        </li>
      </ul>
    </nav>
  );
};
