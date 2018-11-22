const express = require("express"),
      app = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/hackaton';
const client = new pg.Client(connectionString);
      client.connect();

const PORT = process.env.PORT || 3100
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/usuariosUbicados', function(req, resp) {
  client.query('select u.*, r.ubicacion from users as u left join router as r on(r.id = u.fk_router);', (err, res) => {
    if (err) throw err;
    //let rows

    console.log(JSON.stringify(res.rows));
    resp.send(res.rows);
    //client.end();
  });
});

router.get('/', function(req, resp) {
  resp.send("Hello World!");
});


router.get('/login/:email/:password', function(req, resp) {
  client.query('select * from users where email=$1 and password=$2', [req.params.email, req.params.password], (err, res) => {
    if (err) throw err;
    //let rows
    console.log(JSON.stringify(res.rows));
    resp.send(res.rows);
    //client.end();
  });
});

router.get('/user/:name', function(req, resp) {
  console.log(req.params.name);
  client.query("select * from users where name like $1;", [req.params.name], (err, res) => {
    if (err) throw err;
    //let rows
    console.log(JSON.stringify(res.rows));
    resp.send(res.rows);
    //client.end();
  });
});

router.put('/user/:ssid/:email', function(req, resp) {
  resp.send("llego esto " + req.params.ssid + " ----- " + req.params.email);
});

router.put('/userDisconected/:email', function(req, res) {

});

app.use(router);

app.listen(PORT, function() {
  console.log("Node server running on http://localhost:" + PORT);
});
