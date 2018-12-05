'user strict';
var sql = require('../mySQLDb.js');

//Persona object constructor
var Persona = function(persona){
    this.nombre = persona.nombre;
    this.apellido = persona.apellido;
    this.correo = persona.correo;
};

Persona.crearPersona = function crearUsuario(newPersona, result) {
    sql.query("INSERT INTO persona set ?", newPersona, function (err, res){

        if(err){
            console.log("Error en la inserción: ", err);
            result(err, null);
        }
        else {
            exito = 'Se insertó exitosamete un registro en la tabla persona con los siguientes valores: ' + JSON.stringify(newPersona);
            console.log(exito);
            result(null, exito);
        }

        sql.end();
    });
};

module.exports= Persona;
