var dt = require('./mymodule');
var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    var q = url.parse(req.url, true).query;
    var a = q.a;
    var b = q.b;

    a = parseInt(a);
    b = parseInt(b);

    res.write("Sum: " +dt.add(a, b) + '<br/>');
    res.write("Difference: " +dt.sub(a, b) + '<br/>');
    res.write("Product: " +dt.mul(a, b) + '<br/>');
    res.write("Division: " +dt.div(a, b) + '<br/>');
    res.end();
}).listen(8081);