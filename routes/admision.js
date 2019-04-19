var express = require('express');
var app = express();

/* GET home page. */
app.get('/admision', function(req, res) {
  res.render('admision');
});

//module.exports = router;
