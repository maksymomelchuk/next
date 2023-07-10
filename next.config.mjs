/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_URL

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  basePath,
}

export default nextConfig
