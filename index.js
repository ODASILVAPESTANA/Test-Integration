const express = require('express');
const app = express();

app.listen(3000, () => {
	console.log('El servidor inicio en el puerto 3000');
});

app.get('/admision', (req, res) => {
	res.send('Prueba Express');
});
