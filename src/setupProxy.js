const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const url = require('url'); // eslint-disable-line import/no-extraneous-dependencies
const database = require('./mysql');


const EKVV_PROTOCOL = 'https';
const EKVV_HOST = 'ekvv.uni-bielefeld.de';
const EKVV_URL = `${EKVV_PROTOCOL}://${EKVV_HOST}`;

module.exports = function setupProxy(app) {
  app.use(bodyParser.json());
  app.use('/api', proxy({
    target: EKVV_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
    cookiePathRewrite: '/api',
    onProxyRes(proxyRes, req) {
      if ([201, 301, 302, 307, 308].indexOf(proxyRes.statusCode) >= 0 && proxyRes.headers.location) {
        const target = url.parse(EKVV_URL);
        const location = url.parse(proxyRes.headers.location);

        if (location.pathname[0] === '.') {
          return;
        }

        if (target.host === EKVV_HOST) {
          location.pathname = `/api${location.pathname}`;
        }

        if (target.host === location.host) {
          location.host = req.headers.host;
        }

        // eslint-disable-next-line no-param-reassign
        proxyRes.headers.location = location.format();
      }
    },
  }));
  app.post('/feedback', [
    check('title').isLength({ max: 100 }).trim(),
    check('description').isLength({ max: 5000 }).trim(),
    check('name').optional().isLength({ max: 100 }).trim(),
    check('email')
      .optional()
      .isEmail()
      .isLength({ max: 255 })
      .trim(),
  ], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });

      return;
    }

    const {
      title,
      description,
      name = null,
      email = null,
    } = req.body;

    database.execute(
      'INSERT INTO `feedbacks` (`title`, `description`, `name`, `email`) VALUES (?, ?, ?, ?)',
      [title, description, name, email],
      (err) => {
        if (!err) {
          res.status(200).json({ message: 'Thank you for your feedback!' });
        }
      },
    );
  });
};
