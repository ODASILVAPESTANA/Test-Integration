const express       = require('express')

const app           = express()
const port          = 3000

var request         = require('request');
var sha1            = require('sha1');
var bodyParser      = require('body-parser')
var mysql           = require('mysql');
const propreader    = require('properties-reader');
const properties    = propreader('./database.properties');

app.use(bodyParser.json())

var connection = mysql.createConnection({
    host     : properties.get('HOST'),
    port     : properties.get('PORT'),
    user     : properties.get('USERNAME'),
    password : properties.get('PASSWORD')
  });

// Método GET que devuelve el JSON obtenido del link añadiendole un atributo "hash"
// que encripta con el método sha1 el string alojado en el atributo "title"
app.get('/admision', function (req, res) {
    request.get(
        {
            url:'http://jsonplaceholder.typicode.com/albums'
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                for (var i = 0; i < body.length; i++) {
                    body[i].hash = sha1(body[i].title);
                }
                res.send(body);
            } else {
                res.status(500);
                res.send({"Error": "GET request didnt work"});
                console.log("Error GET request didnt work");
            }
        }
    );  
});

// Método POST que añade a la base de datos la persona recibida
// en el body del request, en formato JSON
app.post('/admision', function (req, res) {
    addPerson(req, res);
});


// Validar la conexion al host de la base de datos
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Crear la base de datos sino existe
connection.query("CREATE DATABASE IF NOT EXISTS " + properties.get('DATABASE'), function (err, result) {
    if (err) throw err;
    console.log(result);
});

// Crear la tabla persona en caso de que no exista
let createPersona = `CREATE TABLE IF NOT EXISTS ` + properties.get('DATABASE') + `.persona(
    id INT AUTO_INCREMENT, 
    nombre VARCHAR(255), 
    apellido VARCHAR(255) NOT NULL, 
    correo VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
    )`;
connection.query(createPersona, function (err, result) {
    if (err) throw err;
    console.log(result);
});

// Función que se encarga de añadir a la persona
function addPerson(request, response){
    // Recibir los datos
    var person = {
      nombre: request.body.nombre,
      apellido: request.body.apellido,
      correo: request.body.correo
    }

    //Insertar los datos
    connection.query('INSERT INTO ' + properties.get('DATABASE') +'.persona SET ?', person, function(err, result) {
      if (err) throw err;    
    });

    //Mostrar los datos para verificar la ejecución
    connection.query('SELECT * FROM ' + properties.get('DATABASE') +'.persona', function (error, results, fields) {
      response.send(results);
    });
};

app.listen(port, () => console.log(`SYNERGY test expressjs app listening on port ${port}!`))