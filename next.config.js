module.exports = {
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
