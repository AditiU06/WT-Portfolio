var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended:true});

app.get('/welcome', function(req, res) {
    var rr = "<h2 style='color: lightblue; text-align: center'> WELCOME ;) </h2>"; 
    res.send(rr);
})

app.get('/Login', function(req, res) {
    var rr = "<html>";
    rr += "<body>";
    rr += "<form method = 'post' action = '/operation'>";
    rr += "Username: " + "<input type = 'text' name = 'usn' value = ' ' ><br><br>";
    rr += "</form>";
    rr += "</body>";
    rr += "</html>";
    res.send(rr);
});