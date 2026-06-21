import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Canonicals and the sitemap use non-trailing URLs (e.g. /about), so keep
  // trailingSlash off to stay consistent and avoid duplicate-URL signals.
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
