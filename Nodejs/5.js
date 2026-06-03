var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "WTA"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    var sql = "INSERT INTO student (roll,per,name) VALUES (101,66,'Sam')";
     con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 Record Inserted");
    });
});