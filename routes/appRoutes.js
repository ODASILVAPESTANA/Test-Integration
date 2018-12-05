'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/appController.js');

  app.get("/", function(req, res) {
    res.status(200).send("Bienvenido a el Test-Integration API");
  });

  app.route('/datos')
    .get(todoList.listar_datos);

  // api para crear
  app.route('/persona')
    .post(todoList.crear_una_persona);

};