const express = require('express');
const request = require('request');
const propertiesReader = require('properties-reader');
const props = propertiesReader('./database.properties');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
	host     : props.get('HOST'),
	port     : props.get('PORT'),
	user     : props.get('USERNAME'),
	password : props.get('PASSWORD'),
	database : props.get('DATABASE'),
});

app.listen(3000, () => {
	console.log('El servidor inicio en el puerto 3000');

	connection.connect((err) => {
		if (err) throw err;
		console.log('connected');
	});
});

app.get('/admision', (req, res) => {
	request('http://jsonplaceholder.typicode.com/albums', (response, body) => {
		if (response.statusCode === 200) {
			body = JSON.parse(body);
			body.forEach((album) => {
				album.hash = sha1(album.title);
			});
			res.send(body);
		} else {
			res.status(404);
			res.send({
				msg : 'Ha ocurrido un error en el servidor',
			});
		}
	});
});

app.post('/admision', (req, res) => {
	const user = {
		nombre   : req.body.nombre,
		apellido : req.body.apellido,
		correo   : req.body.correo,
	};

	connection.query('INSERT INTO persona SET ?', user, (err, result) => {
		if (err) throw err;
		console.log(result);
	});

	connection.query('SELECT p.nombre, p.apellido, p.correo FROM persona p', (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});
