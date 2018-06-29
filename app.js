// LLamado de las Dependencias
var express = require('express');
var consign = require('consign');

var app = express();

//Estructuración de la API de una manera sencilla de leer
//include ... las configuraciones de la app
//luego incluira las rutas
//por ultimo que ejecute el archivo encargado de arrancar la app
consign()
    .include('libs/middlewares.js')
    .then('routes/')
    .include('libs/boots.js')
    .into(app);