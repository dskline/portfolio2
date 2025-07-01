// TODO: Create HomePage component to orchestrate content fetching and rendering (#SCOPE_4_a)
// This component should integrate all the pieces: data fetching, validation, and rendering

import type React from "react";
import { ContentRenderer } from "@/features/home/components/ContentRenderer";
import type { HomeFrontmatterData } from "@/features/home/schemas/frontmatter";

export const HomePage: React.FC<{ content: HomeFrontmatterData[] }> = ({
  content,
}) => {
  // TODO: Add error boundaries for graceful failure handling (#SCOPE_4_c)
  // TODO: Handle loading states

  return (
    <main>
      {/* TODO: Add proper error boundaries */}
      {/* Display content as JSON for debugging (SCOPE_2_c implementation) */}
      <div className="p-8">
        <h1 className="mb-4 font-bold text-2xl">Home Content (Debug View)</h1>
        <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
      <ContentRenderer content={content} />
    </main>
  );
};

export default HomePage;
