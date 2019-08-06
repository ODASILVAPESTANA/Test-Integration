/* ### GET `admision`*/
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const crypto = require('crypto');
var request = require("request");


router.get('/admision',(req, res) => {
	request("http://jsonplaceholder.typicode.com/albums", function(error, response, body) {
		 if(!error){
		 	var sha1= crypto.createHash('sha1').update(body.title).digest('hex');

            res.json(body);
  console.log(body);
        }else{
            console.log(error);
        }

});
  });
