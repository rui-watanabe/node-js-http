'use strict';

const http = require('http');
const server = http.createServer((req, res) =>
{
    res.writeHead(200,
    {
        'Content-Type': 'text/plain; charset=utf8'
    });
    res.write(req.headers['user-agent']);
    res.end();
});

const port = 30000;
server.listen(port, ()=> 
{
    console.log(`ポート${port}番でサーバーを起動しました`)
});
