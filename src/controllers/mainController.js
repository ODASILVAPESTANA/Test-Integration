const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const crypto = require('crypto');
var request = require("request");


exports.Admision = (req, res) => {


	request("http://jsonplaceholder.typicode.com/albums", function(error, response, body) {
		 if(!error){
		 	var json = JSON.parse(response.body)
		 	json.forEach(function(obj) { 
		   let sha1 = crypto.createHash('sha1').update(obj.title).digest('hex');
		    obj.hash = sha1
		 	});
            res.json(json);
        }else{
            console.log(error);
        }
});
};
exports.getAdmision = (req, res) => {
mysqlConnection.query('SELECT * FROM persona', (err, rows, fields) => {
			if(!err){
				res.json(rows);
			}else{
				console.log(err);
			}
		});
};

exports.postAdmision = (req, res) => {
	const {nombre, apellido, correo}= req.body;
    const query = 'insert into persona (nombre,apellido,correo) VALUES (?, ?, ?)';
	mysqlConnection.query(query, [nombre, apellido, correo],(err, rows, fields)=>{
        if(!err){
            res.json({status:'Persona Salvada'});
        }else{
            console.log(err);
        }
    });
	};


