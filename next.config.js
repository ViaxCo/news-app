/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");

const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/page/1",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/viaxco/image/fetch/**",
      },
    ],
  },
});

module.exports = nextConfig;
