// TODO: Implement ContentRenderer component (#SCOPE_3_a)
// This component maps frontmatter fields to React components
// Should handle component selection and prop passing dynamically

import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import type React from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { BaseContentRendererData } from "@/features/cms/renderer/schema";

interface ContentRendererProps<T extends BaseContentRendererData> {
  content: T;
  component?: React.ComponentType<T>;
}

// DOMPurify setup (server-safe)
const { window } = new JSDOM("");
const DOMPurify = createDOMPurify(window);

const defaultComponent = ({
  children,
  ...componentProps
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...componentProps}>{children}</div>
);

export const ContentRenderer = <T extends BaseContentRendererData>({
  content,
  component: Component = defaultComponent,
}: ContentRendererProps<T>) => {
  const { children, ...componentProps } = content;

  // Convert markdown to HTML and sanitize
  let sanitizedChildren: React.ReactNode = null;
  if (typeof children === "string") {
    const html = remark().use(remarkHtml).processSync(children).toString();
    sanitizedChildren = (
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized markdown HTML
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
    );
  }

  return <Component {...(componentProps as T)}>{sanitizedChildren}</Component>;
};

export default ContentRenderer;
