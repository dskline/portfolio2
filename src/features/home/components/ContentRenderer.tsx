// TODO: Implement ContentRenderer component (#SCOPE_3_a)
// This component maps frontmatter fields to React components
// Should handle component selection and prop passing dynamically

import type React from "react";
import { HeroSection } from "./HeroSection";

interface ContentItem {
  component: string;
  lexorank?: string;
  [key: string]: unknown; // Additional props from frontmatter
}

interface ContentRendererProps {
  content: ContentItem[];
}

// Component mapping - TODO: Make this more flexible (#SCOPE_3_d)
const componentMap = {
  HeroSection,
} as const;

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
}) => {
  // TODO: Implement component ordering based on lexorank values (#SCOPE_3_d)
  // TODO: Validate component types and props (#SCOPE_3_e)
  // TODO: Handle error cases when component type is not found

  return (
    <div>
      {content.map((item, i) => {
        const ComponentToRender =
          componentMap[item.component as keyof typeof componentMap];
        const itemKey = `${item.component}-${i}`;

        if (!ComponentToRender) {
          // TODO: Implement proper error handling
          return <div key={itemKey}>Unknown component: {item.component}</div>;
        }

        // TODO: Pass HTML content as children properly
        // TODO: Fix type safety for component props (#SCOPE_3_e)
        const { component: _component, ...componentProps } = item;

        return (
          // @ts-expect-error - TODO: Fix type safety for dynamic component props (#SCOPE_3_e)
          <ComponentToRender key={itemKey} {...componentProps} />
        );
      })}
    </div>
  );
};

export default ContentRenderer;
