const request = require('request');

_ALBUMS_URL = 'http://jsonplaceholder.typicode.com/albums';

/**
 * Get a list of albums with the followinf information:
 * userId, id, title.
 * @returns {json} list of albums
 */
const getAlbumsList = (callback) => {
    request(_ALBUMS_URL, {json : true}, (err, res, body) => {
        return callback(body);
    })
}

module.exports.albumsList = getAlbumsList;