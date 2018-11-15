var express = require('express')
var http = require('http')
var Request = require("request");
var app = express()
var getJSON = require('get-json')


app.get('/admision', (req, res) => {  
  	/*Request.get("http://jsonplaceholder.typicode.com/albums", (error, response, body) => {
    	if(error) {
        	return console.dir(error);
    	}
    	//console.dir(JSON.parse(body));
    	resultado=JSON.stringify(body);
    	//res.send(JSON.parse(body));
    	var getJSON = require('get-json')

	});*/
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

app.post('/admision', (req, res) => {
  	var username = req.query.username
  	var lastname = req.query.lastname
  	var email =req.query.email
  	res.send("Hola: " + username + " " + lastname+", tu correo:"+email)
})


http.createServer(app).listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});


