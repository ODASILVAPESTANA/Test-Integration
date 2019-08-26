const request = require('request');
const bodyParser = require('body-parser');
const sha1 = require('sha1');

admision = (app, connection) => {
	app.use(bodyParser.json());

	app.get('/admision', (req, res) => {
		const url = 'http://jsonplaceholder.typicode.com/albums';

		request(
			{
				url  : url,
				json : true,
			},
			(error, response, body) => {
				if (response.statusCode == 200 && !error) {
					body.forEach((album) => {
						album.hash = sha1(album.title); //CREATED HASH KEY AND ADDED TO JSON FILE
					});
					res.send(body);
				} else {
					res.status(404);
					res.send({
						msg : 'Ha ocurrido un error en el servidor',
					});
				}
			},
		);
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
};

module.exports = admision;
