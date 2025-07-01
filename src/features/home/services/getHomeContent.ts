import { getFiles } from "@/features/cms/getFiles";
import {
  type HomeFrontmatterData,
  homeFrontmatterSchema,
} from "@/features/home/schemas/frontmatter";

/**
 * Fetches and validates home page content from the CMS.
 *
 * This function integrates with the existing CMS system to retrieve markdown files
 * that define the home page structure and content. Each file represents a content
 * block with frontmatter defining component type and configuration.
 *
 * @returns Promise<HomeContentItem[]> Array of validated content items sorted by lexorank
 *
 * @throws No exceptions are thrown - errors are logged and empty array is returned
 *
 * @example
 * ```typescript
 * const content = await getHomeContent();
 * // Returns array of content items like:
 * // [
 * //   {
 * //     component: "HeroSection",
 * //     title: "Welcome",
 * //     subtitle: "Portfolio subtitle",
 * //     lexorank: "a",
 * //     content: "Raw markdown content..."
 * //   }
 * // ]
 * ```
 */
export async function getHomeContent(): Promise<HomeFrontmatterData[]> {
  try {
    // Fetch markdown files from CMS
    const files = await getFiles("Portfolio/CMS/Home");

    // Parse and validate each file
    const contentItems = files
      .map((file) => {
        const fileData = {
          ...file.data,
          content: file.content, // Raw markdown content
        };
        // Validate frontmatter against schema
        const validation = homeFrontmatterSchema.safeParse(fileData);
        return validation.success
          ? { ...validation.data, content: file.content }
          : null;
      })
      .filter((item): item is HomeFrontmatterData => item !== null);

    // Sort by lexorank if available, otherwise maintain file order
    return contentItems.sort((a, b) => {
      if (!a.lexorank && !b.lexorank) return 0;
      if (!a.lexorank) return 1;
      if (!b.lexorank) return -1;
      return a.lexorank.localeCompare(b.lexorank);
    });
  } catch (error) {
    console.error("Failed to fetch home content:", error);
    return [];
  }
}
