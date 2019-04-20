var mysql = require('mysql')
var Data  = require('./Data')


Data.callDataJson();
var djson = Data.getJson();
//console.log(djson);

var connection = mysql.createConnection({

      host     : djson.host,
      user     : djson.user,
      password : djson.password,
      database : djson.database,
      port     : djson.port


});



connection.connect(function (err){
  if (err) throw err;
    else {
        console.log('connected mysql');
    }

});
module.exports = connection;
