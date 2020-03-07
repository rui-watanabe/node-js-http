'use strict';

const http = require('http');
const pug = require('pug');

const server = http.createServer((req, res) =>
{
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200,
    {
        'Content-Type': 'text/html; charset=utf8'
    });
    switch(req.method)
    {
        case 'GET':
            if(req.url === '/enquetes/yaki-shabu')
            {
                res.write(pug.renderFile('./form.pug', 
                {
                    path: req.url,
                    firstItem: "焼き肉",
                    secondItem: "しゃぶしゃぶ"
                }));
            }
            else if(req.url === '/enquetes/rice-bread')
            {
                res.write(pug.renderFile('./form.pug', 
                {
                    path: req.url,
                    firstItem: "ご飯",
                    secondItem: "パン"
                }));
            }
            
            res.end();
            break;
        case 'POST':
            let body = '';
            req.on('data', (chunk)=>
            {
                body += chunk;
            }).on('end', ()=>
            {
                const decoded = decodeURIComponent(body);
                console.info(`[${now}] 投稿： ${decoded}`);
                res.write(`<h1>${decoded}が登録されました</h1>`)
                res.end();
            });
            break;
        default:
            break;
    }
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
