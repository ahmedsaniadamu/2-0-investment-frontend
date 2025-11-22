/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
  turbo: {
    rules: {
      ignore: [
        "**/node_modules/**",
        "**/.next/**",
        "**/.git/**",
        "**/public/**",
      ],
    },
  },
}

}

export default nextConfig
