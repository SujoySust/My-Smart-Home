const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    }
  ]
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
