var url = require('url');
var http = require('http');

function add(a, b){
    return a + b;
}

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    var q = url.parse(req.url, true).query;
    var a = q.a;
    var b = q.b;

    a = parseInt(a);
    b = parseInt(b);

    var sum = add(a, b);

    res.write("Sum = "+sum);
    res.end();
}).listen(8080);