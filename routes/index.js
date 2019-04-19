var express = require('express');
var router = express.Router();
const request = require("request");
var crypto = require('crypto');
var mysql = require('mysql')
var connection = mysql.createConnection({
      host     : 'db4free.net',
      user     : 'dbuser',
      password : 'sql9144354',
      database : 'prueba_admision'

});

let objJson;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// it's send json data to view browser
router.get('/admision', function(req, res, next) {
   try {
    getJsonUrl(function(err, data) {
            if (err){
             return next(err);
            }else
              res.status(200).send( JSON.stringify(data, null, 4));
    });
   }catch (error){
      console.log(error);
   }
});

// function callbacks for send json data to router
var  getJsonUrl = function  (callback ){
  request.get('http://jsonplaceholder.typicode.com/albums', { json: true  }, (err, res, datos) => {
    if (err) { throw new Error ("¡Request url json data not found!");

    }else {
      objJson = JSON.parse(JSON.stringify(datos));
      for (var i=0;i<objJson.length;i++){
         objJson[i].hash= crypto.createHash("sha1").update(objJson[i].title).digest("hex");
      }
      return callback(null,objJson);
    }
  });
}

module.exports = router;
