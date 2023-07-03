/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
