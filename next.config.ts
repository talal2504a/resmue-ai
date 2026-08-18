import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/upload/:path*",
        destination: "http://localhost:8000/api/upload/:path*",
      },
    ];
  },
};

export default nextConfig;
