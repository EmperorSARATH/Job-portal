// job-portal/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',   // ← THIS LINE IS REQUIRED FOR .next/standalone
};

module.exports = nextConfig;
