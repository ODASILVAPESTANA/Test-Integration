const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

    host: 'db4free.net',
    user: 'sql9144354',
    password:'7TW2ccREF1',
    database:'prueba_admision'
    

});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('Db is connected');
    }

});

module.exports = mysqlConnection;