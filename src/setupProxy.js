const proxy = require('http-proxy-middleware');
const url = require('url');


const EKVV_PROTOCOL = 'https';
const EKVV_HOST = 'ekvv.uni-bielefeld.de';
const EKVV_URL = `${EKVV_PROTOCOL}://${EKVV_HOST}`;

module.exports = function (app) {
  app.use('/api', proxy({
    target: EKVV_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
    cookiePathRewrite: '/api',
    onProxyRes(proxyRes, req) {
      if ([201, 301, 302, 307, 308].indexOf(proxyRes.statusCode) >= 0 && proxyRes.headers['location']) {
        const target = url.parse(EKVV_URL);
        const location = url.parse(proxyRes.headers['location']);

        if (location.pathname[0] === '.') {
          return;
        }

        if (target.host === EKVV_HOST) {
          location.pathname = `/api${location.pathname}`;
        }

        if (target.host === location.host) {
          location.host = req.headers.host;
        }

        proxyRes.headers['location'] = location.format();
      }
    },
  }));
};
