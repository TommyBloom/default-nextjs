/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  reactStrictMode: true,
  experimental: {
    runtime: "experimental-edge",
  },
};

module.exports = nextConfig;
