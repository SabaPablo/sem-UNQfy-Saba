
const picklejs = require('picklejs');
const artistFile = require('./Artist.js');
const albumFile = require('./Album.js');
const trackFile = require('./Track.js');
const playListFile = require('./PlayList.js');

class UNQfy {

  constructor(){
    this.artists = {};
    this.albumsForName = {};
    this.albumsForArtist = {};
    this.trackForName = {};
    this.playListByName = {};
    this.tracksBygenres = {};
  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    const dict = {};
    for (const key in this.trackForName) {
      const track = this.trackForName[key];

      genres.forEach(element => {
        if (track.genres.indexOf(element) > -1){
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
    let artist = new artistFile.Artist(params);
    this.artists[artist.name] = artist;
  
    
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    let artist = this.getArtistByName(artistName);
    params['artist'] = artist;
    let album = new albumFile.Album(params);
    this.albumsForName[album.name] = album;
    let albums = this.albumsForArtist[artist.name];
    if(albums === null || albums === undefined){
      this.albumsForArtist[artist.name] = [];
    }
    this.albumsForArtist[artist.name].push(album);
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
    let album = this.getAlbumByName(albumName);
    params["album"] = album;
    let track = new trackFile.Track(params);
    this.trackForName[params.name] = track;
    params.genres.forEach(gen => {
      if (!(gen in this.tracksBygenres)) {
        this.tracksBygenres[gen] = [];
      }
      this.tracksBygenres[gen].push(track);
    });



  }

  getArtistByName(name) {
    return this.artists[name];

  }

  getAlbumByName(name) {
    return this.albumsForName[name];
  }

  getTrackByName(name) {
    return this.trackForName[name];
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

