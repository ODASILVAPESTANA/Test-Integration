const userDao = require('../../DataAccess/UserDao');

const executeCmd = (callback, user) => {
    userDao.CreateUser(function(response){
      return callback(response);
    }, user)
}

module.exports.execute = executeCmd;