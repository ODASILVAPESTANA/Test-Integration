const app = require('./config/server');
const sha1= require('sha1');
const dbConnection = require('./config/data.properties.js');
const request = require('request');

// almacena la función para iniciar la BD.
const connection = dbConnection();


const options = {
    url: 'http://jsonplaceholder.typicode.com/albums',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'Test-Integration'
    }
};


const info = {
  nombre: "Elderson",
  apellido: "Laborit",
  correo: "enderlabo@gmail.com"
}

// agregando sha1 al title
app.get('/albums', (req, res) => {

    request(options, (err, output, body) =>{ 

        let json = JSON.parse(body);
        for (var i = 0; i < json.length; i++)
            json[i].hash = sha1(json[i].title)

        console.log(json);
        res.write(JSON.stringify(json, undefined, 2));
    })
})

// enviando data por método Post
app.post('/admision', (res, req) => {

    
    // let info = { //test al enviar el body con la data.
    //     nombre: res.nombre.body,
    //     apellido: res.apellido.body,
    //     correo: res.correo.body
    // }
  
  let sql = `INSERT INTO persona (nombre, apellido, correo) VALUES ( "Elderson", "Laborit", "enderlabo@gmail.com" )`;

  connection.query(sql, (err, data) => {

    if (err) {
      console.log('Error al insertar la data.');
    } else {
      console.log('Operación exitosa.');
    }

  })
});

app.listen(app.get('port'), () => {
    console.log('Puerto del servidor es: ', app.get('port'));
});