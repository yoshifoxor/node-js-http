'use strict';

const http = require('http');
const jade = require('jade');
const server = http.createServer((req, res) => {
    //console.info('[' + new Date() + '] Requested by ' + req.connection.remoteAddress);
    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    //res.write(req.headers['user-agent']);

    switch (req.method) {
      case 'GET':
        //res.write('GET ' + req.url);
        //const fs = require('fs');
        //const rs = fs.createReadStream('./form.html');
        //rs.pipe(res);
        if (req.url === '/enquetes/yaki-shabu') {
          res.write(jade.renderFile('./form.jade', {
            path: req.url,
            firstItem: '焼き肉',
            secondItem: 'しゃぶしゃぶ'
          }));
        } else if (req.url === '/enquetes/rice-bread') {
          res.write(jade.renderFile('./form.jade', {
            path: req.url,
            firstItem: 'ごはん',
            secondItem: 'パン'
          }));
        }
        res.end();
        break;

      case 'POST':
        //res.write('POST ' + req.url);
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          //console.info('[' + now + '] Data posted: ' + body);
          const decoded = decodeURIComponent(body);
          console.info('[' + now + '] 投稿: ' + decoded);
          res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +
            decoded + 'が投稿されました</h1></body></html>');
          res.end();
        });
        break;

      default:
        break;
    }
    //res.end();
  })
  .on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
  }).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
  });

//const port = 8000;
const port = process.env.PORT || 8000;
server.listen(port, () => {
  //console.log('Listening on ' + port);
  console.info('[' + new Date() + ']Listening on ' + port);
});
