import { serverCache } from "@/features/cache/serverCache";
import type { components } from "./brandfetch";

export const getBrand = async (domain: string) => {
  const cachedResult = await serverCache.getValue(`brand:${domain}`);
  if (cachedResult) {
    return cachedResult;
  }
  const response = await fetch(
    `https://api.brandfetch.io/v2/brands/${domain}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BRANDFETCH_TOKEN}`,
      },
      next: {
        revalidate: 26784000, // 31 days (current brandfetch API rate limit refreshes every month)
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Error fetching brand: ${response.statusText}`);
  }
  const result = (await response.json()) as components["schemas"]["Brand"];
  serverCache.setValue(`brand:${domain}`, result);
  return result;
};
