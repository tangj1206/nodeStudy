var http = require('http');
var server = http.createServer();
var url = require('url');

server.on('request', function (req, res) {
    var urlStr = url.parse(req.url);
    console.log(urlStr);
    switch (urlStr.pathname) {
        case '/':
            //首页
            res.writeHead(200, 'ok',{
                'content-type':'text/html;charset=utf-8'
            });
            res.end('<h1>这是首页</h1>');
            break;
        case '/user':
            //用户首页
            break;
        default:
            break;
    }
    res.end();
});

server.listen(8080, 'localhost');