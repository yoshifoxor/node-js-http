'use strict';

const http = require('http');
const jade = require('jade');
const auth = require('http-auth');
const basic = auth.basic({
    realm: 'Enter username and password.'
  },
  (username, password, callback) => {
    callback(username === 'guest' && password === 'xaXZJQmE');
  });

//const server = http.createServer((req, res) => {
const server = http.createServer(basic, (req, res) => {
    //console.info('[' + new Date() + '] Requested by ' + req.connection.remoteAddress);
    //const now = new Date();
    console.info('Requested by ' + req.connection.remoteAddress);

    if (req.url === '/logout') {
      res.writeHead(401, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end('ログアウトしました');
      return;
    }

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
        let urls = ['/yaki-shabu', '/rice-bread', '/sushi-pizza'];
        let firstItems = ['焼き肉', 'ごはん', '寿司'];
        let secondItems = ['しゃぶしゃぶ', 'パン', 'ピザ'];

        for (let i = 0; i < urls.length; i++) {
          if (req.url === '/enquetes' + urls[i]) {
            res.write(jade.renderFile('./form.jade', {
              path: req.url,
              firstItem: firstItems[i],
              secondItem: secondItems[i]
            }));
            break;
          }
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
          console.info('投稿: ' + decoded);
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
    console.error('Server Error', e);
  }).on('clientError', (e) => {
    console.error('Client Error', e);
  });

//const port = 8000;
const port = process.env.PORT || 8000;
server.listen(port, () => {
  //console.log('Listening on ' + port);
  console.info('Listening on ' + port);
});
