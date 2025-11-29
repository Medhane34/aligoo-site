/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdfmake'],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  eslint: { dirs: ['pages', 'utils'], ignoreDuringBuilds: true },
};

module.exports = nextConfig; // Use module.exports instead of export default