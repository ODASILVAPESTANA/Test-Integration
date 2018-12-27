// Inicializacion de paquetes de NODE 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 9000;


// Consola 
app.listen(port);
console.log('Prueba de admisión corriendo en el puerto N° ' + port);

// Declaración de variables de base de datos 
var mysql = require('mysql');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./database.properties');
var connection = mysql.createConnection({
    host: properties.get('Host'),
    port: properties.get('Port'),
    user: properties.get('User'),
    password: properties.get('Password'),
    database: properties.get('Database')
});    

// Peticion POST
var request = require('request');
app.use(bodyParser.json());
app.post('/send',function(req,res){
    console.log('Peticion POST recibida de parte de '+req.body.nombre+'. Procesando...'); 
    console.log('Haciendo conexión a la BD '+properties.get('Database')+' en el puerto '+properties.get('Port')+' por favor espere...');
    connection.connect(function(err) {  
        if(err){
          console.log('Error de conexion con la base de datos '+err);
          return;
        } 
        console.log('Conexion establecida con la base de datos');
    });
    var registro = req.body;
    connection.query("INSERT INTO persona SET ?", registro, function (err) {
        if (err) {
            console.error("Error al insertar en la base de datos:" + err);
            res.send('Ocurrió un error al insertar su petición en la base de datos. Por favor intente mas tarde');
        }else{
            console.log('Petición proceada con éxito');
            res.send('Petición procesada con éxito. Se anexó el registro perteneciente a '+req.body.nombre); 
        }
    });
});

