const GetAlbumsListCmd = require('../Logic/Commands/GetAlbumListCmd')
const express = require('express');
const app = express();

/**
 * Get a list of albums with the followinf information:
 * userId, id, tittle.
 * @returns {json} list of albums
 */
app.get('/admision', (req, res) => {
    GetAlbumsListCmd.execute(function(response){
        res.send(response);
        res.end();
    })    
})

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));