//importamos el modelo person con los datos y metodo de conexion MySQL, el modelo album.
const person = require('../models/database.properties');
const album = require('../models/json.properties');

module.exports = function(app){
	//Metodo GET
	app.get('/admision', (req, res) =>{
	  	album.getAlbum((err, data) =>{
			if(data){
				res.status(201).json(data);
			}
			else{
				res.status(401).json(err);
			}
		});
	});
	//Metodo POST
	app.post('/admision', (req, res) =>{
	   //creamos el objeto que sera enviado al metodo postPerson del modelo person, con los datos provenientes del body.
	   let dataPerson = {
	   	nombre: req.body.name,
	   	apellido: req.body.lastname,
	   	correo: req.body.mail
	   };
	   person.postPerson(dataPerson, (err, data)=>{
		   	if(data){
		   		res.status(201).json({success: true,data:data});
		   	}
		   	else{
		   		res.status(401).json({success: false,data:err});
		   	}
	   });
	});
}
