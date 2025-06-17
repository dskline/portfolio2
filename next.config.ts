import { withNextDevtools } from "@next-devtools/core/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = withNextDevtools({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
});

export default nextConfig;
