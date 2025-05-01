import type { components } from "./brandfetch";

export const getBrand = async (domain: string) => {
  const response = await fetch(
    `https://api.brandfetch.io/v2/brands/${domain}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BRANDFETCH_TOKEN}`,
      },
      next: {
        revalidate: 864000, // 10 days (current brandfetch API rate limit refreshes every 10 days)
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Error fetching brand: ${response.statusText}`);
  }
  return (await response.json()) as components["schemas"]["Brand"];
};
