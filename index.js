'use strict';

const http = require('http');
const server = http.createServer((req, res) =>
{
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200,
    {
        'Content-Type': 'text/plain; charset=utf8'
    });
    switch(req.method)
    {
        case 'GET':
            res.write(`GET ${req.url}`);
            break;
        case 'POST':
            res.write(`POST ${req.url}`);
            let body = '';
            req.on('data', (chunk)=>
            {
                body += chunk;
            }).on('end', ()=>
            {
                console.log(`[${now}] Data posted ${body}`);
            });
            break;
        default:
            break;
    }
    res.end();
})
.on('error', (e) => 
{
    console.error(`[${new Date()}] Server Error`, e);
})
.on('clientError', (e) => 
{
    console.error(`[${new Date()}] Client Error`, e);
});

const port = 30000;
server.listen(port, ()=> 
{
    console.log(`ポート${port}番でサーバーを起動しました`)
});
