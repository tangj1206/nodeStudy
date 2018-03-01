var http = require('http');

var server = http.createServer();

server.on('error', function (err) {
    console.log(err);
});

server.on('listening',function(){
    console.log('listening....');
});


server.on('request',function (req, res) {
    console.log('有客户端请求了');
    res.setHeader('ceshi','ceshi');
    res.writeHead(200,'ok',{
        'content-type':'text/plain'
    });
    res.write('<h1>hello</h1>');
    res.end();
});
server.listen(8080);
