/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @vercel/blob → undici con campos privados (#); evita que Webpack intente parsearlo mal
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob', 'undici'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig

