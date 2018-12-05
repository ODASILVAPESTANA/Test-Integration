'user strict';

var mysql = require('mysql');

//db connection
var connection = mysql.createConnection({
    host     : 'db4free.net',
    port     : '3306',
    user     : 'sql9144354',
    password : '7TW2ccREF1',
    database : 'prueba_admision'
});

connection.connect(function(err) {
    if (err) {
        console.log("Hubo un error en la conexion: ", err);
        throw err;
    }
});

module.exports = connection;