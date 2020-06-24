require('dotenv').config();
const withTM = require('next-transpile-modules');
const singleInstanceModules = require('./singleInstanceModules');

module.exports = withTM({
  transpileModules: ['bp-components'],
  distDir: 'build',
  env: {
    SERVER_ADDRESS: process.env.SERVER_ADDRESS,
    ORG_ID: process.env.ORG_ID,

  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 8,
  },
  // We can use next.js global css support to load typeface-x fonts
  // We are also wainting for postcss support https://github.com/zeit/next.js/issues/8983#issuecomment-539169860
  // experimental: {
  // css: true,
  // },
  webpack: (config, { isServer }) => {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
    // read aliases from tsconfig paths
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    // only one version of react, react-dom, etc will be loaded
    config.resolve.alias = {
      ...config.resolve.alias,
      ...singleInstanceModules,
    };

    // https://github.com/martpie/next-transpile-modules/issues/50#issuecomment-558318688
    if (isServer) {
      config.externals = config.externals.concat(Object.keys(singleInstanceModules));
    }

    return config;
  },
});
