'use strict'
var express     = require('express');
var router      = express.Router();
const request   = require("request");
const fs        = require('fs');
var crypto      = require('crypto');
var mysql       = require('mysql');
var conn        = require('../conect')
var body_parser = require('body-parser')
var Data  = require('../Data')
let objJson;

router.use(body_parser.json())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// this is retrived  json data to view browser
router.get('/admision', function(req, res, next) {
   try {
    getJsonUrl(function(err, data) {
            if (err){
             return next(err);
            }else
              res.send(JSON.stringify(data,null,4));
              // res.status(200).send( JSON.stringify(data, null, 4));
    });
   }catch (error){
      console.log(error);
   }
});

// function callbacks for send json data to router admision
var  getJsonUrl = function  (callback ){
  request.get('http://jsonplaceholder.typicode.com/albums', { json: true  }, (err, res, datos) => {
    if (err) { throw new Error ("Request url json data not found!");

    }else {
      objJson = JSON.parse(JSON.stringify(datos));
      for (var i=0;i<objJson.length;i++){
         objJson[i].hash= crypto.createHash("sha1").update(objJson[i].title).digest("hex");
      }
      return callback(null,objJson);
    }
  });
}



router.post('/admision',function(req,res){
var valor;
var responseJson;
      // console.log (req.body);
    if (JSON.stringify(req.body) === '{}'){
        console.log("no hay información");
    }else {

      Data.callDataJson();
      var djson = Data.getJson();
        //console.log(djson.database);
        valor = {
            "nombre" :req.body.nombre,
            "apellido" :req.body.apellido,
            "correo" :req.body.correo,
            //"database": djson.database
        };

      conn.query('INSERT INTO persona set ?',valor ,function(err, result){
        //conn.query('INSERT INTO persona (nombre, apellido, correo, database) VALUES ("'+data[0]['nombre']+'","'+data[0]['apellido']+'", "'+data[0]['correo']+'","'+data[0]['namedatabase']+'")' ,function(err, result){
         if (err) throw err;
         else {
           responseJson = {'response':"registro con exito", persona:valor};
           console.log(responseJson);
           res.send(responseJson);
        }
      });

   }

});

router.get('/personal',function(req,res){
   res.render('form_admision', { title: 'Express' });
});


//getJsonPersonalFile();

module.exports = router;
