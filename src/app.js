const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.set('port', process.env.PORT || 3000);


//routs
require('./routs/admisionRouts')(app);

app.listen(app.get('port'), () => {
	console.log('app run');
});