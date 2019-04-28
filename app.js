const express = require('express')

const app = express()
const port = 3000

var request = require('request');
var sha1 = require('sha1');


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
                console.log("Maybe theres no internet you know... this place is full of incompetent commies");
            }
        }
    );
    
  })

app.listen(port, () => console.log(`SYNERGY test expressjs app listening on port ${port}!`))