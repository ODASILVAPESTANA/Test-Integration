const propertiesReader = require('properties-reader');
const props = propertiesReader('./database.properties');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : props.get('HOST'),
	port     : props.get('PORT'),
	user     : props.get('USERNAME'),
	password : props.get('PASSWORD'),
	database : props.get('DATABASE'),
});

connection.connect((err) => {
	if (err) throw err;
	console.log(`Conectado a la BD ${props.get('DATABASE')}`);
});

module.exports = connection;
