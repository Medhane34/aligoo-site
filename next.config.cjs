/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Match all paths under images.unsplash.com
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Match all paths under res.cloudinary.com
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**", // Match Sanity.io image paths
      },
    ],
  },
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on these directories during production builds
    ignoreDuringBuilds: true, // Allow builds to complete even with ESLint errors
  },
};

module.exports = nextConfig;