const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');



const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json() );

module.exports = app;