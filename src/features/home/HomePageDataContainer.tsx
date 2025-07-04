import { getContent } from "@/features/cms/getContent";
import { HomePage } from "@/features/home/HomePage";
import { homePageContent } from "@/features/home/schemas";

/**
 * Data container component for the HomePage
 *
 * This component handles data fetching and passes the content as props to the
 * presentation component. It follows the container/presentation pattern to
 * separate data fetching concerns from rendering logic.
 *
 * This component is designed to run on the server-side for optimal performance
 * and SEO, fetching content at build time or request time.
 */
export async function HomePageDataContainer() {
  // Fetch home content from CMS
  const content = await getContent("Portfolio/CMS/Home", homePageContent);

  // Pass content as props to the presentation component
  return <HomePage content={content} />;
}

export default HomePageDataContainer;
