var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended:true});


// DATABASE CONNECTION

var con = mysql.createConnection({

    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"TrainDB"

});

con.connect(function(err){

    if(err) throw err;

    console.log("Connected");

});



// LOGIN PAGE

app.get('/',function(req,res){

    var rr="";

    rr+="<html>";

    rr+="<body style='font-family:Arial;background-color:lightblue'>";

    rr+="<h2 style='color:blue;text-align:center'>Login Page</h2>";

    rr+="<form method='post' action='/login'>";

    rr+="Username : ";
    rr+="<input type='text' name='uname'><br><br>";

    rr+="Password : ";
    rr+="<input type='password' name='pass'><br><br>";

    rr+="<input type='submit' value='Login'>";

    rr+="</form>";

    rr+="</body>";

    rr+="</html>";

    res.send(rr);

});




// LOGIN VALIDATION

app.post('/login',urlencodedParser,function(req,res){

    var u=req.body.uname;

    var p=req.body.pass;

    if(u=="admin" && p=="1234"){

        var html="";

        html+="<html>";

        html+="<body style='font-family:Arial'>";

        html+="<h2>Passenger Booking Form</h2>";

        html+="<form method='post' action='/insert'>";

        html+="Name : ";
        html+="<input type='text' name='name'><br><br>";

        html+="Gender : ";
        html+="<input type='text' name='gender'><br><br>";

        html+="Source : ";
        html+="<input type='text' name='source'><br><br>";

        html+="Destination : ";
        html+="<input type='text' name='dest'><br><br>";

        html+="<input type='submit' value='Submit'>";

        html+="</form>";

        html+="</body>";

        html+="</html>";

        res.send(html);

    }

    else{

        res.send("Invalid Login");

    }

});




// INSERT + VALIDATION

app.post('/insert',urlencodedParser,function(req,res){

    var name=req.body.name;

    var gender=req.body.gender;

    var source=req.body.source;

    var dest=req.body.dest;


    // VALIDATION

    if(name==""){

        res.send("Name cannot be empty");

        return;

    }

    if(source==""){

        res.send("Source required");

        return;

    }


    var sql="INSERT INTO passenger(name,gender,source,destination) VALUES('"

    +name+"','"

    +gender+"','"

    +source+"','"

    +dest+"')";


    con.query(sql,function(err,result){

        if(err) throw err;

        res.send("Record Inserted Successfully <br><br><a href='/display'>Display Data</a>");

    });

});




// DISPLAY ALL RECORDS

app.get('/display',function(req,res){

    var sql="SELECT * FROM passenger";

    con.query(sql,function(err,rows){

        if(err) throw err;

        var html="";

        html+="<html>";

        html+="<body>";

        html+="<h2>Passenger Details</h2>";

        html+="<table border='1' cellpadding='10'>";

        html+="<tr>";

        html+="<th>Name</th>";

        html+="<th>Gender</th>";

        html+="<th>Source</th>";

        html+="<th>Destination</th>";

        html+="</tr>";


        rows.forEach(function(row){

            html+="<tr>";

            html+="<td>"+row.name+"</td>";

            html+="<td>"+row.gender+"</td>";

            html+="<td>"+row.source+"</td>";

            html+="<td>"+row.destination+"</td>";

            html+="</tr>";

        });

        html+="</table>";

        html+="</body>";

        html+="</html>";

        res.send(html);

    });

});




// FILTER EXAMPLE

app.get('/female',function(req,res){

    var sql="SELECT * FROM passenger WHERE gender='Female'";

    con.query(sql,function(err,rows){

        if(err) throw err;

        res.send(rows);

    });

});




// UPDATE EXAMPLE

app.get('/update',function(req,res){

    var sql="UPDATE passenger SET destination='Delhi' WHERE name='Aditi'";

    con.query(sql,function(err,result){

        if(err) throw err;

        res.send("Record Updated");

    });

});




// DELETE EXAMPLE

app.get('/delete',function(req,res){

    var sql="DELETE FROM passenger WHERE name='Aditi'";

    con.query(sql,function(err,result){

        if(err) throw err;

        res.send("Record Deleted");

    });

});



app.listen(8081,function(){

    console.log("Server Running");

});