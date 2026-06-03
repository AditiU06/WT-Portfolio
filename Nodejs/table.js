var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "WTA1"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");

    var sql = "CREATE TABLE student (roll INT(5), per INT(5), name VARCHAR(30))";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table Created");
    });
});