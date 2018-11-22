const express = require("express"),
      app = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      pg = require('pg'),
      path    = require("path"),
      fs = require('fs'),
      cors = require('cors');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/hackaton';
const client = new pg.Client(connectionString);
      client.connect();

const PORT = process.env.PORT || 3100
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


app.set('view engine', 'html');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
app.use(cors());
var router = express.Router();

router.get('/usuariosUbicados', function(req, resp) {
  client.query('select u.*, r.ubicacion from users as u left join router as r on(r.id = u.fk_router);', (err, res) => {
    if (err) throw err;

//  console.log(JSON.stringify(res.rows));
    resp.send(res.rows);
  });
});

router.get('/usuarioUbicado/:email', function(req, resp) {
  client.query('select u.*, r.ubicacion from users as u inner join router as r on(r.id = u.fk_router and u.email=$1);', [req.params.email], (err, res) => {
    if (err) throw err;

  //  console.log(JSON.stringify(res.rows));
    resp.send(res.rows);
  });
});

router.get('/', function(req, resp) {
  console.log(express.use())
  fs.readFile('./index.html', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
      resp.writeHead(200, { 'Content-Type': 'text/html' });
resp.end(data);
    // Invoke the next step here however you like
//    console.log(content);   // Put all of the code here (not the best solution)         // Or put the next step in a function and invoke it
});
  //resp.render('./index.html');
});


router.get('/login/:email/:password', function(req, resp) {
  client.query('select * from users where email=$1 and password=$2', [req.params.email, req.params.password], (err, res) => {
    if (err) throw err;

  //  console.log(JSON.stringify(res.rows));
    resp.send(res.rows);
  });
});

router.get('/user/:name', function(req, resp) {
  client.query("select * from users where name like $1;", [req.params.name], (err, res) => {
    if (err) throw err;

  //  console.log(JSON.stringify(res.rows));
    resp.send(res.rows);
  });
});

router.put('/user/:ssid/:email', function(req, resp) {
  client.query("update users set fk_router = (select id from router where ssid = $1) where email = $2;", [req.params.ssid, req.params.email], (err, res) => {
    if (err)  throw  resp.send(err);

  //  console.log(JSON.stringify(res.rows));
    resp.send("usuario actualizado con exito");
  });
});

router.put('/userDisconected/:email', function(req, resp) {
  client.query("update users set fk_router = (select id from router where ssid = '') where email = $1;", [req.params.email], (err, res) => {
    if (err)  throw  resp.send(err);

    resp.send("usuario actualizado con exito");
  });
});

router.post('/user', function(req, resp) {
  client.query("insert into users (name, email, password) values($1, $2, $3);", [req.param('name'), req.param('email'), req.param('password')], (err, res) => {
    if (err)  throw  resp.send(err);

  //  console.log(JSON.stringify(res.rows));
    resp.send("usuario agregado con exito");
  });
});

app.use(router);

app.listen(PORT, function() {
  console.log("Node server running on http://localhost:" + PORT);
});
