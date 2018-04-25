
const picklejs = require('picklejs');
const artistFile = require('./Artist.js');


const playListFile = require('./PlayList.js');

class UNQfy {

  constructor(){
    this.artists = {};
    this.playListByName = {};

  }

  getTracksMatchingGenres(genres) {
    let map = {};
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    this.getAllArtists().forEach(artist => {
      artist.getTrackArtistByGenRes(genres, map);
      });
    let res = [];
    Object.keys(map).forEach(key => {
      res.push(map[key]);
    });

    return res;
  }

  getAllArtists(){
    let res = [];
    Object.keys(this.artists).forEach(key => {
      res.push(this.artists[key]);
    });
    return res;
  }

  getTracksMatchingArtist(artistName) {

    const albums = this.albumsForArtist[artistName.name];

    const dict = {};
    for (const key in this.trackForName) {
      const track = this.trackForName[key];
      albums.forEach(element => {

        if (track.album.name === element.name){
          dict[track.name] = track;
        }
      });
    }
    const res = [];
    for (const key in dict) {
      res.push(dict[key]);
    }
    return res;


  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(params) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    const artist = new artistFile.Artist(params);
    this.artists[artist.name] = artist;
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    const artist = this.getArtistByName(artistName);
    artist.setAlbum(params);
  }


  /* Debe soportar (al menos):
       params.name (string)
       params.duration (number)
       params.genres (lista de strings)
  */
  addTrack(albumName, params) {
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
    const album = this.getAlbumByName(albumName);
    album.setTrack(params);
  }

  getArtistByName(name) {
    return this.artists[name];

  }

  getAlbumByName(name) {
    let theAlbum = null;
    Object.values(this.artists).forEach(artist => {
      
      if (artist.containAlbumByName(name))
        theAlbum = artist.getAlbumByName(name);

    });
    return theAlbum;
  }

  getTrackByName(name) {
    let theTrack = null;
    Object.values(this.artists).forEach(artist => {
      let track = artist.getTrackByName(name);
      if(track != null){
        theTrack = track;
      }
    });
    return theTrack;
  }

  getPlaylistByName(name) {
    return this.playListByName[name];
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */
    let params = {};
    params['name']=name;
    params['genres'] = genresToInclude;
    params['duration'] =maxDuration;
    //TODO FIXME Que diferencia hay entre const y let??
    const playList = new playListFile.PlayList(params);
    this.playListByName[name] = playList;
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

