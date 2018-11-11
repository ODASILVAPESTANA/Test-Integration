const GetAlbumsListCmd = require('../Logic/Commands/GetAlbumListCmd')
const CreateUserCmd = require('../Logic/Commands/CreateNewUserCmd')
const express = require('express');
const app = express();
app.use(express.json());

/**
 * Get a list of albums with the followinf information:
 * userId, id, title, title hash.
 * @returns {json} list of albums
 */
app.get('/admision', (req, res) => {
    GetAlbumsListCmd.execute(function(response){
        res.send(response);
        res.end();
    })    
})

/**
 * Regist a new user
 * @returns {json} rows affected and info
 */
app.post('/admision', (req, res) => {
    const user = {
        name: req.body.name, 
        lastname: req.body.lastname,
        email: req.body.email
    };
    CreateUserCmd.execute(function(response){
        res.send(response);
        res.end();
    }, user)
})

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));