const SERVERPORT = process.env.NODE_PORT || 3000;
const URLALBUM = 'http://jsonplaceholder.typicode.com/albums';   

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var methodOverride = require('method-override');
var sha1 = require('sha1');
var propertiesReader = require('properties-reader');
var mysql = require('mysql');
var logger = require('winston');

var app = express();
var now = new Date();
var properties = propertiesReader('database.properties');

// Set log level (default : info)
logger.level = process.env.LOG_LEVEL || 'info';

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());

// DataBase connection
var db = mysql.createConnection({
    host : properties.get('db.host'),
    port : properties.get('db.port'),
    database : properties.get('db.database_name'),
    user : properties.get('db.username'),
    password : properties.get('db.password')
});

db.connect(function(error){
    if(error){
        logger.error('%s - No se pudo conectar a la base de datos %s', now.toISOString(), error);
        process.exit(1);
    }
})

var router = express.Router();

// Define home page route
router.get('/', function(req, res) { 
  res.send('Test Integración - Nelo R. Tovar');
});

// Define GET route 
router.get('/admision', function(req, res) { 
    logger.info( now.toISOString(), ' - GET admision');
    request.get(URLALBUM, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var dataParsed = JSON.parse(body);
            dataParsed.forEach( function(album, index){
                album.hash = sha1(album.title);
            });
            res.json(dataParsed);
        }else{
            if (error) {
                res.status(500).send('No se estableción conexion con el servidor.');
                logger.error('%s - %s ', now.toISOString(), error);
            }else{
                res.status(response.statusCode).send('Error : No se pudo procesar la petición.');
                logger.error('%s - statusCode = %s', now.toISOString(), response.statusCode);
            }
        };
    });
});

// Define POST route
router.post('/admision', function(req, res) { 
    logger.info(now.toISOString(), ' - POST admision');
    if (req.is('json')){
        db.query('INSERT INTO persona SET ?', req.body, function(error, result){
            if (error) {
                logger.error('%s - Datos no insertados', now.toISOString());
                res.status(500).json({"error":"Datos no insertados"});
            }else{
                logger.info('%s - Datos insertados', now.toISOString());
                res.status(200).json({"result":"OK"});
            }
        });
    }else{
        logger.error('%s - Formato de datos incorrecto', now.toISOString());
        res.send('Error en el formato de los datos');
    }
});

app.use(router);

// Start server
app.listen(SERVERPORT, function() {
  logger.info('%s - Test de Integración ejecutando en  http://localhost: %s', now.toISOString(), SERVERPORT);
});


// Handle CTRL-C for exit successfully
process.on( 'SIGINT', function () {
    logger.info('%s - Finalizando Test de Integración', now.toISOString());
    db.end();
    process.exit(0);
});

