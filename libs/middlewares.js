// LLamado de las Dependencias
var mysql = require('mysql');
var http = require("http");
var bodyParser = require('body-parser');
var sha1 = require('sha1');


module.exports = app => {

	// Para dar un formato mas limpio al JSON
	app.set('json spaces', 4);
	// Config del puerto
	app.set('port', process.env.PORT || 8010);


	// Para que mi API entienda que recibira JSON'S
	app.use(bodyParser.json()); 
	app.use(bodyParser.urlencoded({ extended: true }));
	//JSON formateado "Para que se vea bonito el JSON"
	

	// Metodo GET
	app.get('/admision', function (req, res) {
	  getAdmisionData(res);
	});

	// Función getAdmisionData declarada en el Metodo GET
	function getAdmisionData(response) {
	  var url = 'http://jsonplaceholder.typicode.com/albums';
	  var albums = '';
	  http.get(url, function(result, res){
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
	  });
	};


};

