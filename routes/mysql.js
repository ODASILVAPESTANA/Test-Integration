var express = require('express');
var mysql=require('mysql');
var router = express.Router();

const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('./database.properties');

var connection=mysql.createConnection({
  host: prop.get('database.host'),
  port: prop.get('database.port'),
  user: prop.get('database.user'),
  password: prop.get('database.password'),
  database: prop.get('database.database')
});
  
// GET data
router.get('/', function(req, res, next) { 
  connection.query('select * from persona', function(err, rows, fileds){
    if(err) throw err;
    console.log('El resultado es: ', rows[0]);
    res.json(rows);
  }) 
});


// POST data
router.post('/', function(req, res) {
    var nombre='Pedro'; //req.body.nombre;
    var apellido='Gomez'; //req.body.apellido;
    var correo='pedro.gomez@gmail.com'; //req.body.correo;
    
   connection.query("INSERT INTO persona (nombre, apellido, correo) VALUES (?,?,?)", [ nombre.toString(), apellido.toString(), correo.toString()] , function(err, result){
        if(err) throw err;
            console.log('Ha sido insertada 1 fila sin problemas');
        });
    res.send('Ha sido insertada 1 fila');
});

module.exports = router;
