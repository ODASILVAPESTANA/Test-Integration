'use strict';

const express       = require('express');
const connection    = require('./app/utils/db');

const app           = express();
const port          = 8000;

require('./app/routes')(app, connection);
app.listen(port, () => {
    
    console.log('We are live on ' + port);
});