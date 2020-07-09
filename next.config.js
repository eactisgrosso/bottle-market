const { withPlugins } = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withTM = require('next-transpile-modules')(['@bottle-market/common']);

// next.js configuration
const nextConfig = {
  env: {
    STRIPE_PUBLIC_KEY: 'your_stripe_public_key',
    API_URL: process.env.REACT_APP_API_URL,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
    AUTH0_CALLBACK: process.env.AUTH0_CALLBACK,
    REACT_APP_MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY,
  },
  webpack: (config, options) => {
    config.devtool = 'eval-source-map';
    config.resolve.modules.push(__dirname);
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = withPlugins([withTM, withOptimizedImages], nextConfig);
