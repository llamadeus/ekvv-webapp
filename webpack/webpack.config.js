const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies


/**
 * Webpack config to enable aliases.
 *
 * @type {{resolve: {extensions: [string, string, string], alias: {app: *}}}}
 */
module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      app: path.resolve(__dirname, '..', 'src'),
    },
  },
};
