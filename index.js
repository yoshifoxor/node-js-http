'use strict';
const http = require('http');
const html = `
<!DOCTYPE html>
<html lang="ja">
  <body>
    <h1>HTMLの一番大きい見出しを表示します</h1>
  </body>
</html>
`;
const server = http.createServer((req, res) => {
    console.info(`[${new Date()}] Requested by ${req.socket.remoteAddress}`);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.write(html);
    res.end();
  }).on('error', e => {
    console.error(`[${new Date()}] Server Error`, e);
  }).on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
  });
const port = 8000;

server.listen(port, () => {
  console.info(`[${new Date()}] Listening on port:${port}`);
});
