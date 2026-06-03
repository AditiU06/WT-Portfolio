var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.get('/values', function(req, res) {
    var rr = "<html>";
    rr += "<body>";
    rr += "<form method = 'post' action = 'addition'>";
    rr += "First Number: "+"<input type = 'text' name = 'one' value =' '><br><br>";
    rr += "Second Number: "+"<input type = 'text' name = 'two' value =' '><br><br>";
    rr += "<input type = 'submit' name = 't1' value ='Add'><br><br>";
    rr += "</form>";
    rr += "</body>";
    rr += "</html>";
    res.send(rr);
})

app.get('/welcome', function(req, res){
    var rr = "<h1>Hello World 😒</h1>";
    rr += "<h3>WELCOME</h3>";
    res.send(rr);
});

app.post('/addition', urlencodedParser, function(req, res) {
    var a = parseInt(req.body.one);
    var b = parseInt(req.body.two);
    var c = a + b;
    res.send("The sum is: " + c);
}).listen(9000);