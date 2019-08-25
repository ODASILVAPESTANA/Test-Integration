const express = require('express');
const request = require('request');
const app = express();

app.listen(3000, () => {
	console.log('El servidor inicio en el puerto 3000');
});

app.get('/admision', (req, res) => {
	request('http://jsonplaceholder.typicode.com/albums', (error, response, body) => res.send(body));
});
