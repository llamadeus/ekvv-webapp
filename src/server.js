const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const setupProxy = require('./setupProxy');


const app = express();
const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.cert', 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate,
};

setupProxy(app);
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

https.createServer(credentials, app).listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('eKVV Proxy server listening on port 3000!');
});
