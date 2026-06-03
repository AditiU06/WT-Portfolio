var http = require('http');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "WTA1"
});

app.get('/send', function(req, res){
    var rr = "<html>";
    rr += "<body>";
    rr += "<form method = 'post' action = '/thank'>";
    rr += "Roll Number: " + "<input type='number' name= 'one' value= ' '><br><br>";
    rr += "Percentage: " + "<input type='number' name= 'two' value= ' '><br><br>";
    rr += "Name: " + "<input type='text' name= 'three' value= ' '><br><br>";
    rr += "<input type= 'submit' name= 't1' value= 'send'>";
    rr += "</form>";
    rr += "</body>";
    rr += "</html>";
    res.send(rr);
})

app.post('/thank', urlencodedParser, function(req, res){
    var reply = '';
    roll = req.body.one;
    per = req.body.two;
    name = req.body.three;
    var sql = "insert into student(roll, per, name) values(" +roll+ ", " +per+ ", " + "'"+name+"');"

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});

con.query(sql, function(err, result) { 
    if (err) throw err;
    res.write("Data Inserted Successfully");  
});

res.end();
}).listen(8081);

app.get('/students', function(req, res){
    var sql = "SELECT * FROM student";

    con.query(sql, function(err, result){
        if (err) throw err;

        var html = "<html>";
        html += "<body>";
        html += "<table border = '1' cellpadding = '10'>";
        html += "<tr><th>Roll Number</th><th>Percentage</th><th>Name</th></tr>";

        result.forEach(function(row){
            html += "<tr>";
            html += "<td>" + row.roll + "</td>";
            html += "<td>" + row.per + "</td>";
            html += "<td>" + row.name + "</td>";
            html += "</tr>";
        });
        html += "</table><br>";
        html += "<a href='/send'>Go Back to Form</a>";
        html += "</body>";
        html += "</html>";
        res.send(html);
    });
});