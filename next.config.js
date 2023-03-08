/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  reactStrictMode: true,
  experimental: {
    runtime: "edge-experimental",
  },
};

module.exports = nextConfig;
