import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aura-finance-dashboard",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
