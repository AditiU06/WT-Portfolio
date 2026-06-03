var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h2 style="color: lightpink; text-align: center">Hallo</h2> <h2 style="color: gold; text-align: center"> ;) </h2>');
    res.end('<h3 style="text-align: center"> Gut Morgen </h3>');
}).listen(8080);