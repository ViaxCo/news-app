module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/page/1",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
