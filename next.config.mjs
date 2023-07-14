/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_URL

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  // output: 'export',
  images: { unoptimized: true },
  basePath,
}

export default nextConfig
