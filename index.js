var express = require('express'),
app = express(),
bodyParser = require('body-parser');
port = process.env.PORT || 3000;
app.listen(port);
console.log('Prueba de admisión corriendo en el puerto N° ' + port);
