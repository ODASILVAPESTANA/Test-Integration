var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var request = require('request');
var sha1 = require('sha1');
var propertiesreader = require('properties-reader')
var properties = propertiesreader('database.properties')
var mysql = require('mysql')
var bodyParser = require('body-parser');

var Host = properties.get('Host')
var Port = properties.get('Port')
var Username = properties.get('Username')
var Password = properties.get('Password')
var Database = properties.get('Database')

var connection = mysql.createConnection({
    host: Host,
    user: Username,
    password: Password,
    database: Database,
    port: Port
})



app.use(bodyParser.json())

app.get('/', function (req, res) {

    url = 'http://jsonplaceholder.typicode.com/albums';

    request(url, function(error, response, json){

	var j = JSON.parse(json)

	for(var object in j) {
		j[object].hash=sha1(j[object].title)
	}

	res.send(j)

    })


});

app.get('/post', function(req, res) {
    var requestData = {
        "nombre": "Rosmel",
	"apellido": "Gomez",
	"correo": "rosmelgabrielgomez@gmail.com"
    }

    request({
        url: 'http://localhost:3000/post',
        method: "POST",
    	json: requestData,
        multipart: {
            chunked: false,
            data: [
                {
                    'content-type': 'application/json',
                    body: requestData
                }
            ]
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('request ok')
        }
        else {
            console.log("error: " + error)

        }
    })

    res.send('success inserting persona')


});

app.post('/post', function (req, res) {


  	var query = "INSERT INTO persona (nombre, apellido, correo) VALUES (req.body.nombre, req.body.apellido, req.body.correo)";
	connection.query(query, function (err, result) {
    		console.log("data inserted into persona");
  	});

   	res.send(req.body);
});

app.listen(port);
console.log('Server started! At http://localhost:3000')
