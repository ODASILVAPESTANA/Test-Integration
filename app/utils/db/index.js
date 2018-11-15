const propreader    = require('properties-reader');
const properties    = propreader('./app/database.properties');
const mysql         = require('mysql');

var con = mysql.createConnection({
    host: properties.get('MYSQL_HOST'),
    user: properties.get('MYSQL_USER'),
    password: properties.get('MYSQL_PASS'),
    database: properties.get('MYSQL_DBNAME'),
    port: properties.get('MYSQL_PORT')
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connection successfully");
});

module.exports = con;