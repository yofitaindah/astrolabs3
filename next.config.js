const path = require('path');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },
  serverRuntimeConfig: {
    secretKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    uploadsDir: process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads'),
  },
};

module.exports = nextConfig;
