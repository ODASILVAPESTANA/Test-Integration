var express = require('express'),
 	bodyParser = require('body-parser'),
 	http = require('http'),
 	app,
 	router,
 	server;

var incryp = require('node-sha1'); // falta por la incriptacion title

 app = express();
 app.use(bodyParser.json());

 router = express.Router();
 router.get('/', function (req, res){
 	res.json([

 				{
					"userId": 1,
					"id": 1,
					"title": "quidem molestiae enim",
					"hash": "ba232411feb13a64634e52d1e39183c9185af197"
				},

				{
					"userId": 1,
				    "id": 2,
				    "title": "sunt qui excepturi placeat culpa",
					"hash": "d2a09f04fc7557af48b5cab5b930592dd1e9c06c"
				}

 			]);
	});

app.use('/admision', router);

server = http.createServer(app);
server.listen(3000, function() {
    console.log('localhost:3000/admision');
});