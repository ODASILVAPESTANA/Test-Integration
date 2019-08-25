const express = require('express');
const app = express();
const connection = require('./mysqldb');

require('./api/admision')(app, connection);
app.listen(3000, () => {
	console.log('El servidor inicio en el puerto 3000');
});
