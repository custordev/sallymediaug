import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  api: {
    bodyParser: false,
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io", // UploadThing's file storage domain
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
