// LLamado de las Dependencias
var express = require('express');
var http = require("http");
var mysql = require('mysql');
var sha1 = require('sha1');
var bodyParser = require('body-parser');

var app = express();

// Cuerpos codificados de los JSON 
app.use(bodyParser.json()); 

// Cuerpos codificados
app.use(bodyParser.urlencoded({ extended: true }));

// BD config
var PropertiesReader = require('properties-reader');
var databaseProperties = PropertiesReader('./BD Config/database.properties');

var hostname = databaseProperties.get('database.host');
var port = databaseProperties.get('database.port');
var user = databaseProperties.get('database.user');
var password = databaseProperties.get('database.password')

var connection =  mysql.createConnection({
    host     : hostname,
    port     : port,
    user     : user,
    password : password   
});

// Conexion a la BD
connection.connect(function(err) {
  if(err){
    console.log('Error al conectar a la base de datos');
    return;
  }
  console.log('Conexion establecida con la base de datos');
});

// Metodo GET
app.get('/admision', function (req, res) {
  getAdmisionData(res);
});

// Metodo POST
app.post('/admision', function (req, res) {
  savePerson(req, res);
});

// Conexión a  un puerto sencillo '8010'
app.listen(8010, function () {
  console.log('Escuchando por el puerto 8010');
});

// Función getAdmisionData declarada en el Metodo GET
function getAdmisionData(response) {
  var url = 'http://jsonplaceholder.typicode.com/albums';
  var albums = '';
  get(url, function(result, res){
      var body = '';
          // Resultado simple del JSON
      result.on('data', function(chunk){
          body += chunk;
      });
          // Resultado modificado con el SHA1
      result.on('end', function(){
        albums = JSON.parse(body);
        for (album in albums){
          albums[album].hash = sha1(albums[album].title);
        }
        response.json(albums);
      });
  }).on('error', function(e){
        response.send("Ha ocurrido un error: ", e);
  });
}

// Inserción en la BD
function savePerson(request, response){
  var person = {
    nombre: request.body.nombre,
    apellido: request.body.apellido,
    correo: request.body.correo
  }

  //Seteo de la data dentro de la BD 
  connection.query('INSERT INTO persona SET ?', person, function(err, result) {
    if (err) throw err;    
  });

  //Selección de la data dentro de la BD
  connection.query('SELECT * FROM `persona`', function (error, results, fields) {
    response.send(results);
  });
}