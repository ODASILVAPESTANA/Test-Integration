var express = require('express')
var app = express()
var http = require('http')
var getJSON = require('get-json')


const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('database.properties');



app.get('/admision', (req, res) => {    	
	getJSON('http://jsonplaceholder.typicode.com/albums')
		    .then(function(response) {
		      //console.log(response);		      
			response.forEach(function(element) {
					//delete element['userId'];
					var sha1 = require('sha1'); 					
					element.sha1 = sha1(element['title']);
  					console.log(element);
			});     
		    res.send(JSON.stringify(response));
		    }).catch(function(error) {
		      console.log(error);
		    });

})

app.post('/admision', (req,  res, next) => {
	  	var username = req.query.username
	  	var lastname = req.query.lastname
	  	var email =req.query.email

		var mysql      = require('mysql');
		
		var connection = mysql.createConnection({
		  host     : prop.get('database.host'),
		  port     : prop.get('database.port'),
		  user     : prop.get('database.user'),
		  password : Buffer.from(prop.get('database.password').toString()),
		  database:  prop.get('database.database')
		});

		connection.connect();			 
		connection.query('INSERT INTO persona (username, lastname, email) VALUES (?, ?, ?) ', [username, lastname, email], function(err, result) {
	                //if(err) throw err
	                if (err) {
	                    console.log('error', err)                    
	                } else {                
	                    console.log('success', 'Data added successfully!')  
	                    res.send("Data added successfully!<br>Hello: " + username + " " + lastname+", tu correo:"+email)                  
	                }
	            })
		connection.end();
})




http.createServer(app).listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});


