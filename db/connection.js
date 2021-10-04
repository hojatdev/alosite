const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alosite',
    multipleStatements:true
});

con.connect(function (err){
    if (err) throw err ;
});

exports.connection = con;