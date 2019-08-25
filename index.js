const express = require('express');
const request = require('request');
const sha1 = require('sha1');
const app = express();

app.listen(3000, () => {
	console.log('El servidor inicio en el puerto 3000');
});

app.get('/admision', (req, res) => {
	request('http://jsonplaceholder.typicode.com/albums', (error, response, body) => {
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
