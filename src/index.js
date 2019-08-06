const express = require('express');
const app = express();

//settings
const port = 3000;
//middlewares-Esto para que entienda los json
app.use(express.json())
//routes
const routes = require('./routes/mainRouter');

//staring the server
routes(app);
app.listen(port, () => {
  console.log('Corriendo en puerto: 3000');
});

