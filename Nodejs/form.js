var mysql = require('mysql');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
//------------------------------------------------------------------//

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "WTA"
});
//----------------------------------------------------------------//

app.get('/send',function(req,res){
    var rr="<html>";
    rr= rr+"<body>";
    rr= rr+"<form method='post' action='thank'>";
    rr= rr+"Roll number: "+"<input type='number' name='one' value=' '><br><br>";
    rr= rr+"Percentage: "+"<input type='number' name='two' value=' '><br><br>";
    rr= rr+"Name: "+"<input type='text' name='three' value=' '><br><br>";
    rr= rr+"<input type='submit' name='t1' value='send'>";
    rr= rr+"</form>";
    rr= rr+"</body>";
    rr= rr+"</html>";
    res.send(rr);
})
app.post('/thank',urlencodedParser,function(req,res){
    //var reply='';
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
        res.write("Rec inserted");
    });

res.write("Record inserted");
res.end();
}).listen(9000);
//----------------------------------------------------------------//

app.get('/students',function(req,res){
    var sql = "SELECT * FROM student";
    con.query(sql,function(err,result){
        if(err) throw err;
        var html = "<html><body>";
        html+="<h2>All students</h2>";
        html+="<table border='1' cellpadding='5'>";
        html+="<tr><th>Roll</th><th>Percentage</th><th>Person</th></tr>";
        
        result.forEach(function(row){
            html+="<tr>";
            html+="<td>"+ row.roll+ "</td>";
            html+="<td>"+ row.per+ "</td>";
            html+="<td>"+ row.name+ "</td>";
            html+="</tr>";
        });

        html+= "</table><br><br>";
        html+="<a href='/send'>Go back to form</a>";
        html+= "</body></html>";
        res.send(html);  
    });
});
//----------------------------------------------------------------//
