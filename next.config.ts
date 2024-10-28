import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["gdlbinnbghlgzhwlhwfn.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gdlbinnbghlgzhwlhwfn.supabase.co",
        port: "*",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
