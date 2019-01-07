//Dependencias: para conectar a Mysql.
const mysql = require('mysql');
//Datos para la conexion a la BD.
connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'sql9144354',
  password : '7TW2ccREF1',
  database : 'prueba_admision'
});
//creamos el modelo para la tabla persona.
let personModel = {};
//recibe como parametro el objeto personData con los datos de la persona.
personModel.postPerson = (personData, callback) => {
	//establecemos la conexion.
	connection.connect();
	//ejecutamos el query de insercion.
	connection.query('INSERT INTO persona (nombre, apellido, correo) VALUES ("'+personData.nombre+'", "'+personData.apellido+'", "'+personData.correo+'")', function (error, results, fields) {
		if (error) throw error;
		callback(null, results);
	});
	//cerramos la conexion.
	connection.end();
};
//exportamos personModel para ser usado por el resto de la API.
module.exports = personModel;