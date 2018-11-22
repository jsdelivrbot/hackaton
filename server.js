const express = require("express"),
      app = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      pg = require('pg');

      const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/hackaton';
      const client = new pg.Client(connectionString)
      client.connect();
  /*    const client = new pg.Client({connections: {
    postgresql: {
      host: 'localhost',
      user: 'hackaton',
      port: '5433',
      password: '12345',
      database: 'hackaton'

    }
  }});*/



  //  mongoose = require('mongoose');
const PORT = process.env.PORT || 3100
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/usuariosUbicados', function(req, resp) {


client.query('select u.*, r.ubicacion from users as u left join router as r on(r.id = u.fk_router);', (err, res) => {
  if (err) throw err;
  //let rows
  /*
  for (let row of res.rows) {
    console.log(JSON.stringify(res.row));
  }*/
  console.log(JSON.stringify(res.rows));
  resp.send(res.rows);
  //client.end();
});
  // res.send("Hello World!");
});

router.get('/', function(req, resp) {

resp.send("Hello World!");
});

router.get('/getUsers', function(req, res) {

});

router.get('/getUser', function(req, res) {

});

router.post('/setUser', function(req, res) {

});
/*
router.update('/updateUser', function(req, res) {
  // console.log(req.body.originalDetectIntentRequest.payload.data);
  // token virtualmind  'xoxp-42109645268-466940612869-485366849493-6652ad826a2671ed53e9f2b29482f445';
  let param = {
    'user': req.body.originalDetectIntentRequest.payload.data.user,
    'token': 'xoxp-480772759907-481075144165-485049310931-32480f6dc3cd056b54dc59533a3587eb',
    'intent': req.body.queryResult.intent.displayName,
    'fulfillmentText': req.body.queryResult.fulfillmentText
  };

  requestController.callAPI(param, res);
});
*/
app.use(router);

app.listen(PORT, function() {
  console.log("Node server running on http://localhost:" + PORT);
});
