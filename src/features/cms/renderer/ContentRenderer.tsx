import type React from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { BaseContentRendererData } from "@/features/cms/renderer/schema";

interface ContentRendererProps<T extends BaseContentRendererData> {
  content: T;
  component?: React.ComponentType<T>;
}

async function getPurify() {
  if (typeof window === "undefined") {
    const { default: DOMPurify } = await import("dompurify");
    const { JSDOM } = await import("jsdom");
    return DOMPurify(new JSDOM("").window);
  } else {
    const { default: DOMPurify } = await import("dompurify");
    return DOMPurify;
  }
}
const defaultComponent = ({
  children,
  ...componentProps
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...componentProps}>{children}</div>
);

export const ContentRenderer = async <T extends BaseContentRendererData>({
  content,
  component: Component = defaultComponent,
}: ContentRendererProps<T>) => {
  const { children, ...componentProps } = content;

  // Convert markdown to HTML and sanitize
  let sanitizedChildren: React.ReactNode = null;
  if (typeof children === "string") {
    const html = remark().use(remarkHtml).processSync(children).toString();
    sanitizedChildren = (
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized markdown HTML
        dangerouslySetInnerHTML={{ __html: (await getPurify()).sanitize(html) }}
      />
    );
  }

  return <Component {...(componentProps as T)}>{sanitizedChildren}</Component>;
};

export default ContentRenderer;
