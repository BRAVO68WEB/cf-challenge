const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const moduleExports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async securityHeaders() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/*",
        headers: securityHeaders,
      },
    ];
  },
};
module.exports = moduleExports;
