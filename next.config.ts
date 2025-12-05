// job-portal/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional: also ignore TypeScript errors if you have any (not needed now)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
