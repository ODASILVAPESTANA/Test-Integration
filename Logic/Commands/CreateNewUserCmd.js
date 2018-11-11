const userDao = require('../../DataAccess/UserDao');

/**
 * Command for regist new user
 * @param {Function} callback 
 * @param {user object} user
 * @returns {json} rows affected and info
 */
const executeCmd = (callback, user) => {
    userDao.CreateUser(function(response){
      return callback(response);
    }, user)
}

module.exports.execute = executeCmd;