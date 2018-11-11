const mysql = require('mysql');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(__dirname + '/database.properties');

var connection = mysql.createConnection({
    host: properties.path().database.data.host,
    user: properties.path().database.data.username,
    password: properties.path().database.data.password,
    database: properties.path().database.data.databasename,
    port: properties.path().database.data.port
})

connection.connect(function(error){
    if(error)
        console.log('Connection error' + error.message + 
        ' host ' + connection.config.host +
        ' user ' + connection.config.user +
        ' password ' + connection.config.password +
        ' database ' + connection.config.database +
        ' port ' + connection.config.port);
    else
        console.log('Connection stablished');
})

const CreateNewUser = (callback, user) => {
    connection.query(
        `insert into persona values ('${user.name}', '${user.lastname}', '${user.email}')`,
        function(error, rows, field){
            return callback(rows);
    })
}

module.exports.CreateUser = CreateNewUser;