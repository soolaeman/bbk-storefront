import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  serverExternalPackages: ['@libsql/client'],
  outputFileTracingIncludes: {
    '/**': ['./data/bbk.db'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/catalog',
        destination: '/katalog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
