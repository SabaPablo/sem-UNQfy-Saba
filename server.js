const express = require('express');        // call express
const app = express();                 // define our app using express
const router = express.Router();
const unqmod = require('./unqfy');
const bodyParser = require('body-parser');
const fs = require('fs'); // necesitado para guardar/cargar unqfy

const unqfy = getUNQfy();
const port = process.env.PORT || 8080;        // set our port

router.use((req, res, next) => {
  // do logging
  console.log('Request received!');
  next(); // make sure we go to the next routes and don't stop here
});
app.use(bodyParser.urlencoded({ endended: true}));
app.use(bodyParser.json());
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);
router.route('/artists').post((req, res) => {
  const artist = unqfy.addArtist(req.body);
  res.json(artist);
});

router.route('/artists/:id').get((req, res) => {
  console.log(req.params.id);
  const artist = unqfy.getArtistsById(req.params.id);
  console.log(artist);
  res.json(artist);
});

router.route('/artists/:id').delete((req, res) => {
  console.log(req.params.id);
  const artist = unqfy.deleteArtistsById(req.params.id);
  console.log(artist);
  res.json(artist); 
});

router.route('/artists').get((req, res) => {
  console.log(req.name);
  //TODO FIXME no puedo obtener el valor de busqueda!!!!
  console.log("body " + req.name);
  console.log("body " + req.body.name);
  console.log("body " + req.body["name"]);
  
  const artist = unqfy.getArtistByName(req.name);
  res.json(artist);
});

app.use('/api', router);
router.route('/albums').post((req, res) => {
  const album = unqfy.addAlbum(req.body);
  res.json(album);
});

router.route('/albums/:id').get((req, res) => {
  const album = unqfy.getAlbumById(req.params.id);
  console.log(album);
  res.json(album);
});

router.route('/albums/:id').delete((req, res) => {
  console.log(req.params.id);
  unqfy.deleteAlbumById(req.params.id);
});

router.route('/albums').get((req, res) => {
  const artist = unqfy.getAlbumByName(req.name);
  res.json(artist);
});

function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}


app.listen(port);
console.log('Magic happens on port ' + port);