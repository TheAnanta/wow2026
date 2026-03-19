import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: false,
  env: {
    SECRET_AES_KEY_STRING: process.env.SECRET_AES_KEY_STRING,
  },
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/html/:slug.html",
      }
    ]
  },
};

export default nextConfig;
