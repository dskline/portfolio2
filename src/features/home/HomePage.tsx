// TODO: Create HomePage component to orchestrate content fetching and rendering (#SCOPE_4_a)
// This component should integrate all the pieces: data fetching, validation, and rendering

import type React from "react";
import { ContentRenderer } from "@/features/cms/renderer/ContentRenderer";
import HeroSection from "@/features/home/components/HeroSection";
import type { HomePageContent } from "@/features/home/schemas";

const componentsMap = {
  HeroSection,
  // Add other components here as needed
} as const;

export const HomePage: React.FC<{ content: HomePageContent[] }> = ({
  content,
}) => {
  // TODO: Add error boundaries for graceful failure handling (#SCOPE_4_c)
  // TODO: Handle loading states

  return (
    <main className="flex flex-col items-center gap-6 px-10 ">
      {content.map((item, index) => {
        return (
          <ContentRenderer
            key={`${item.component}-${index}`}
            content={item}
            component={componentsMap[item.component]}
          />
        );
      })}
    </main>
  );
};

export default HomePage;
