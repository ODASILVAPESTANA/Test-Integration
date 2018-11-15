const admisionRoutes = require('./admision_routes');


module.exports = function(app, db){
    admisionRoutes(app, db);
};