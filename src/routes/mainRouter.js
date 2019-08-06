
const main = require('../controllers/mainController.js');


module.exports = (app) => {
  // form Routes
  app.route('/getAdmision')
    .get(main.getAdmision);

    app.route('/postAdmision')
    .post(main.postAdmision);
 
  app.route('/admision')
    .get(main.Admision);
 
};
