import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with a minimal server.js and only the traced
  // node_modules. Azure App Service runs that instead of `next start`, so no
  // npm install happens on the server.
  output: "standalone",
};

export default nextConfig;
