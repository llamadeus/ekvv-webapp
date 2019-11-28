const {
  override,
  addWebpackAlias,
  adjustWorkbox,
  disableEsLint,
} = require('customize-cra');
const webpackConfig = require('./webpack/webpack.config');


module.exports = override(
  addWebpackAlias(webpackConfig.resolve.alias),
  disableEsLint(),
  adjustWorkbox(wb => Object.assign(wb, {
    skipWaiting: true,
  })),
);
