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
    const artist = unqfy.getArtistByName(req.name);
    res.json(artist);
});

router.route('/pong').get((req, res) => {
  //  console.log(req);
  //  console.log(req.query);
  res.json({ message: 'PING!' });

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