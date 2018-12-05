'use strict';

var Persona = require('../models/appModel.js');
var Request = require("request");
var sha1 = require('sha1');

exports.listar_datos = function(req, res) {
    Request("http://jsonplaceholder.typicode.com/albums", (error, response, json) => {
        if (error)
            res.send(err);
        else{
            var j = JSON.parse(json);
            for(var object in j) {
                j[object].hash=sha1(j[object].title);
            }
            res.send(j);
        }
    });
};


exports.crear_una_persona = function(req, res) {
    var newPersona = new Persona(req.body);

    //handles null error 
    if(!newPersona.nombre || !newPersona.apellido || !newPersona.correo){
        res.status(400).send({ error:true, message: 'Por favor provea todos los datos de la persona' });
    }
    else{    
        Persona.crearPersona(newPersona, function(err, persona) {
            if (err) res.send(err);
            res.json(persona);
        });
    }
};
