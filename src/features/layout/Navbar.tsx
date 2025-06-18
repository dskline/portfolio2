"use client";

import Link from "next/link";
import { toggleDarkTheme } from "@/features/theme/dark";

export const Navbar = () => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800">
      <ul className="flex items-center justify-center">
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/projects">Projects</NavbarLink>
        <NavbarLink href="/toolbox">Toolbox</NavbarLink>
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

const NavbarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="rounded-none border-x-transparent border-t-transparent"
      >
        {children}
      </Link>
    </li>
  );
};
