import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use webpack instead of Turbopack for broader compatibility
  allowedDevOrigins: ["*"],
};

export default nextConfig;
