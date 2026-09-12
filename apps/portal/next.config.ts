import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@seal/protocol", "@seal/design-system"],
};

export default nextConfig;
