//Dependencias: para usar el metodo fetch de javascript en node y para usar los metodos de encriptado 
const fetch = require('node-fetch');
const crypto = require('crypto');
//creamos el modelo para la informacion de los albumnes.
let albumModel = {};
//metodo para obtener los datos.
albumModel.getAlbum = (callback) => { 
	//creamos un arreglo vacio.
	var albumsSha1 = [];
	//utilizamos el metodo fetch para obtener los datos de la url.
    fetch('http://jsonplaceholder.typicode.com/albums')
    .then(res => res.json())
    .then(function(albums){
    	//recorremos el arreglo proveniente de la url, por cada album se crea una fila en el arreglo vacio.
    	albums.forEach((a) =>{
    		var hash;
    		var hashNew = crypto.createHash('sha1');
    			hashNew.update(a.title);
    			hash = hashNew.digest('hex');
    			//se agrega el parametro hash, con el title enctriptado con SHA1
    		albumsSha1.push({"userId":a.userId, "id":a.id, "title":a.title, "hash":hash});
    	});
    	//devolvemos el arreglo con el nuevo parametro hash en el callback del metodo.
    	callback(null, albumsSha1);
    });
};
//exportamos albumModel para ser usado por el resto de la API.
module.exports = albumModel;
