const albumDao = require('../../DataAccess/AlbumDao');
const sha1 = require('sha1');

/**
 * Get a list of albums with the followinf information:
 * userId, id, title, title hash.
 * @returns {json} list of albums
 */
const executeCmd = (callback) => {
    albumDao.albumsList(function(response){
      for(var item in response)
        response[item].hash = sha1(response[item].title); //title hash
      return callback(response);
    })
}

module.exports.execute = executeCmd;