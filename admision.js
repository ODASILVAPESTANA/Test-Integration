const PropertiesReader  = require('properties-reader');
const mysql             = require('mysql')
const bodyParser        = require('body-parser');
const express           = require('express');
const request           = require('request');
const sha1              = require('sha1');
const app               = express();
const port              = process.env.PORT || 3004;

app.use(bodyParser.json());
                                                             /*GET ADMISION*/
/*Adicionalmente, debe agregar un atributo llamado hash que sea el resultado de aplicarle el algoritmo de SHA1 al campo title*/
app.get('/', function (req, res) {
    
    request.get('http://jsonplaceholder.typicode.com/albums', function (error, response, body) {
          if (!error && response.statusCode == 200){
            var data = JSON.parse(body);
            var i;
            for (i in data){
                data[i].hash = sha1(data[i].title);
            }
            res.send(JSON.stringify(data));
        }
    });
});

                                                             /*POST ADMISION*/
/*Debe almacenar en base de datos tus datos personales. Para ello, debes enviar en el body de la petición el siguiente JSON con tus datos*/
app.post('/', function (req, res) {
    var properties = PropertiesReader('./src/config/database.properties');
    var connection = mysql.createConnection({
        host     : properties.get('Host'),
        port     : properties.get('Port'),
        user     : properties.get('Username'),
        password : properties.get('Password'),
        database : properties.get('Database')
    });

    connection.connect()
    var insert = "INSERT INTO persona SET ?"
    var select = "SELECT * FROM persona"
    var delete_user = "DELETE FROM persona WHERE nombre=leonela AND apellido=lanz AND correo=leolanzmariel@gmail.com"

    console.log(req.body);
    connection.query(insert, req.body, function (error, results, fields) {
        if (error) {
            console.error("Error al insertar en la base de datos:" + error)
        };
    });
    connection.query(select, function (error, results, fields) {
        if (error) {
            console.error("Error al consultar en la base de datos:" + error)
 };

res.send(results)
    }); 
    connection.end()
});
app.listen(port, () => {
    console.log(`Servicio web Rest corriendo en http://localhost:${port}`);
});