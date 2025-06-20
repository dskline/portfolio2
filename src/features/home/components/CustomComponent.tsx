// TODO: Implement Custom component (#EPIC_3_c)
// This component handles generic content rendering with configurable props
// Should be flexible enough to render various content types

import React, { type ComponentPropsWithoutRef, type ElementType } from "react";

interface CustomComponentProps<T extends ElementType> {
  content?: React.ReactNode;
  tag?: T; // Optional tag for custom HTML elements
}

export const CustomComponent = <T extends ElementType = "div">({
  content,
  tag = "div" as T, // Default to 'div' if no tag is specified
  ...additionalProps
}: CustomComponentProps<T> & ComponentPropsWithoutRef<T>) => {
  const allowedProps = ["src", "alt", "style"];
  const sanitizedProps = Object.keys(additionalProps)
    .filter((key) => allowedProps.some((allowed) => key === allowed))
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = additionalProps[key];
      return acc;
    }, {});
  return React.createElement(tag, sanitizedProps, content);
};

export default CustomComponent;
