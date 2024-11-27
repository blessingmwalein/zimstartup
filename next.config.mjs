/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Disable type checking during builds
  },
};

export default nextConfig;
