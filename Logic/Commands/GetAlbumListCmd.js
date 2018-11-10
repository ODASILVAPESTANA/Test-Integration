const albumDao = require('../../DataAccess/AlbumDao');
const sha1 = require('sha1');

const executeCmd = (callback) => {
    albumDao.albumsList(function(response){
      for(var item in response)
        response[item].hash = sha1(response[item].title);
      return callback(response);
    })
}

module.exports.execute = executeCmd;