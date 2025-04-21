const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    dirs: ['app', 'components', 'lib', 'hooks', 'utils'],
    ignoreDuringBuilds: false,
  },
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Clear cache on hot reload
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = withPWA(nextConfig);
