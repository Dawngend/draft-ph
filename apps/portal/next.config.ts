import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@draft-ph/protocol", "@draft-ph/design-system"],
};

export default nextConfig;
