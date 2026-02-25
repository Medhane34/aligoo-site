/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdfmake'],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      { protocol: "https", hostname: "heroui.com", pathname: "/**" },
    ],
  },
  eslint: { dirs: ['pages', 'utils'], ignoreDuringBuilds: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
        ],
      },
    ];
  },
};
module.exports = nextConfig; // Use module.exports instead of export default