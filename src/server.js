const express = require('express');
const rateLimit = require('express-rate-limit');
const https = require('https'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');
const setupProxy = require('./setupProxy');


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  max: 50,
}));
app.use('/feedback', rateLimit({
  windowMs: 2 * 60 * 60 * 1000,
  max: 3,
}));
setupProxy(app);
app.get('/service-worker.js', (req, res) => {
  res.set('Cache-Control', 'max-age=0, no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '..', 'build', 'service-worker.js'));
});
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const onListen = () => {
  // eslint-disable-next-line no-console
  console.log(`eKVV Proxy server listening on port ${PORT}!`);
};

if (process.env.NODE_ENV === 'development') {
  const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
  const certificate = fs.readFileSync('sslcert/server.cert', 'utf8');
  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  https.createServer(credentials, app).listen(PORT, onListen);
}
else {
  app.listen(
    process.env.SERVER_PORT || 3000,
    process.env.SERVER_HOST || '127.0.0.1',
    onListen,
  );
}
