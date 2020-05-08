const { withPlugins } = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

// next.js configuration
const nextConfig = {
  env: {
    STRIPE_PUBLIC_KEY: "your_stripe_public_key",
    API_URL: process.env.REACT_APP_API_URL,
  },
  webpack: (config, options) => {
    config.devtool = "eval-source-map";
    config.resolve.modules.push(__dirname);
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = withPlugins([withOptimizedImages], nextConfig);
