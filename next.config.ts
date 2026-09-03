import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      module: {
        browser: "./src/lib/empty-module-shim.ts",
      },
    },
  },
};

export default nextConfig;
