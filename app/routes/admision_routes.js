const bodyParser    = require('body-parser');
const https = require('https');
const sha1 = require('sha1');

module.exports = function(app, db){
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.get('/verify', (req, res)=>{
        let sql = "SELECT * FROM persona";
        
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

    app.get('/admision', (req, res)=>{
        https.get("https://jsonplaceholder.typicode.com/albums", (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                let result = JSON.parse(data);
                let JSON_result = [];
        
                for(let i=0; i<result.length ;i++){
                    let obj = new Object();

                    obj.userId  = result[i].userId;
                    obj.id      = result[i].id;
                    obj.title   = result[i].title;
                    obj.hash    = sha1(result[i].title);

                    JSON_result.push(obj);
                }

                res.json(JSON_result);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });

    app.post('/admision', (req, res)=>{
        var sql = "INSERT INTO persona (nombre, apellido, correo) VALUES ('"+req.body.nombre+"', '"+req.body.apellido+"', '"+req.body.correo+"')";

        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json("Created successfully");
        });        
    });
};