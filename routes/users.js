var express = require('express');
var router = express.Router();
var request = require('request');

// This responds a GET request for the data page.
router.get('/', function (req, res, next) {

  console.log("GET request for remote data"); 
  
  request('http://jsonplaceholder.typicode.com/albums', function (error, response, body) {
  if (!error && response.statusCode == 200) {
      let objJson = JSON.parse(body)
      for(var myKey in objJson) {
          var crypto = require('crypto')
          , text = objJson[myKey].title
          , key = myKey
          
          hash = crypto.createHmac('sha1', key).update(text).digest('hex')
          
          objJson[myKey].hash = hash;
          //console.log(hash);
          //console.log(objJson[myKey].title);            
      }        
      console.log(objJson);
      res.send(objJson);
  }
 })
})

module.exports = router;
