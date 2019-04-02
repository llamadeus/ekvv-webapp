const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const setupProxy = require('./setupProxy');


const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    const sslUrl = ['https://', req.hostname, req.url].join('');

    return res.redirect(sslUrl);
  }

  return next();
});
setupProxy(app);
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
  app.listen(PORT, onListen);
}
