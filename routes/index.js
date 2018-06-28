// Para que mi API entienda que recibira JSON'S
var http = require("http");
var mysql = require('mysql');

module.exports = app => {

// BD config
var PropertiesReader = require('properties-reader');
var databaseProperties = PropertiesReader('./BD Config/database.properties');

var hostname = databaseProperties.get('database.host');
var port = databaseProperties.get('database.port');
var user = databaseProperties.get('database.user');
var password = databaseProperties.get('database.password');
var database = databaseProperties.get('database.database');

var connection =  mysql.createConnection({
    host     : hostname,
    port     : port,
    user     : user,
    password : password,
    database: database   
});

	// Conexion a la BD
connection.connect(function(err) {
  if(err){
    console.log('Error de conexion con la base de datos');
    return;
  }
  console.log('Conexion establecida con la base de datos');
});

		// Metodo POST
	app.post('/admision', function (req, res) {
	  savePerson(req, res);
	});

		// Inserción en la BD
		function savePerson(request, response){
		  var person = {
		    nombre: request.body.nombre,
		    apellido: request.body.apellido,
		    correo: request.body.correo
		  }

		  //Inserción de la data dentro de la BD 
		  connection.query('INSERT INTO persona SET ?', person, function(err, result) {
		    if (err) throw err;    
		  });

		  //Selección de la data dentro de la BD
		  connection.query('SELECT * FROM `persona`', function (error, results, fields) {
		    response.send(results);
		  });
		};


};