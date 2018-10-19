const express = require('express')
const request = require('request')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const sha1 = require('sha1')
const app = express()
const port = process.env.PORT || 3000;
var PropertiesReader = require('properties-reader');


app.use(bodyParser.json())

app.get('/admision', function (req, res) {

	url = 'http://jsonplaceholder.typicode.com/albums';

	request(url, function (error, response, body) {
		
		var json = JSON.parse(body)

		if (response.statusCode == 200 ){

			for (var [object] in json){
				json[object].hash = sha1(json[object].title)
			}

		res.send(json)	

		}
		if (error){res.send(error)}

	});
})

app.post('/admision', function (req, res) {

	var properties = PropertiesReader('database.properties');

	var connection = mysql.createConnection({
		host		: properties.get('host'),
		port		: properties.get('Port'),
		user		: properties.get('Username'),
		password	: properties.get('Password'),
		database	: properties.get('database'),
	})

	connection.connect ()

	var insert = "INSERT INTO persona SET ?";
	var select = "SELECT * FROM persona WHERE apellido = ?"
	var deletes = "DELETE FROM persona WHERE apellido = ?"

	connection.query(insert, req.body, function (err, result){
		if (err) { console.log("Error al insertar a la BD" + err) };
		console.log("Se ha insertado correctamente en la base de datos")
	})
	
	var apellido = "Liguori"
	/*connection.query(deletes, apellido, function (err, result){
		if (err) { console.log("Error al buscar a la BD" + err) };
			res.json(result)
	});*/

	connection.query(select, apellido, function (err, result){
		if (err) { console.log("Error al buscar a la BD" + err) };
			console.log("Se ha buscado exitosamente en la base de datos")
			res.send(result)
	});




	connection.end()

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))