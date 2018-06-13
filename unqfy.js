
const picklejs = require('picklejs');
const artistFile = require('./Artist.js');
const rp = require('request-promise');

const playListFile = require('./PlayList.js');

const ACCESS_TOCKEN = 'BQDMYdc--V6zOonXmseamhTqAyVJrKQv8XkrADNW3jlmvRsd973L-LdlOYnEBrY8SxL2095wPVrPNgiPrSfXHdKERmSIGRGXFgGAjnjkSX19C_fdJOvqDz7UbiYFX8Uy54vzWRXwEscte8iyopsr53yJYnSkGr6GbTX4lGTCo4MuV0xyCw';


class UNQfy {

  constructor(){
    this.artists = {};
    this.playListByName = {};
    this.artistsById = {};

  }

  getTracksMatchingGenres(genres) {
    const map = {};
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    this.getAllArtists().forEach(artist => {
      artist.getTrackArtistByGenRes(genres, map);
    });
    const res = [];
    Object.keys(map).forEach(key => {
      res.push(map[key]);
    });

    return res;
  }

  getAllArtists(){
    const res = [];
    Object.keys(this.artists).forEach(key => {
      res.push(this.artists[key]);
    });
    return res;
  }

  getArtistsById(id) {
    return this.artistsById[id];
  }

  deleteArtistsById(id){
    const artist = this.getArtistsById(id);
    this.artists.delete(artist.name);
    this.artistsById.delete(id);
  }

  getTracksMatchingArtist(artistName) {
    return artistName.getTracks();


  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(params) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    const id = this.getAllArtists().length;
    params.id = id;
    const artist = new artistFile.Artist(params);
    this.artists[artist.name] = artist;
    this.artistsById[artist.id] = artist;
    return artist;
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
      const track = artist.getTrackByName(name);
      if(track !== null){
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
    const params = {};
    params.name=name;
    params.genres = genresToInclude;
    params.duration =maxDuration;
    params.system = this;
    //TODO FIXME Que diferencia hay entre const y let??
    const playList = new playListFile.PlayList(params);
    playList.searchTracks();
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

  populateAlbumsForArtist(param) {


    const options = {
      url: 'https://api.spotify.com/v1/search?q='+ param + '&type=artist',
      headers: { Authorization: 'Bearer ' + ACCESS_TOCKEN},
      json: true
    };
    rp.get(options).then((response) => this.createArtistByResponse(response));
  }

  createArtistByResponse(response){
    let paramByNewArtist = {};
    let artists = response.artists.items;
    let artist = artists[0];
    paramByNewArtist.name = artist.name;
    paramByNewArtist.country = 'none';

    console.log("creando artista: " + paramByNewArtist.name);
    console.log("Id artista: " + artist.id);
    this.addArtist(paramByNewArtist);


    const options = {
      url: 'https://api.spotify.com/v1/artists/'+ artist.id +'/albums',
      headers: { Authorization: 'Bearer ' + ACCESS_TOCKEN },
      json: true
    };
    rp.get(options).then((response) => this.createAlbumsByResponse(artist.name, response));
    


  }

  createAlbumsByResponse(artistName, response){
    let albums = response.items;
    albums.forEach(albumResponse => {
      /* Debo agregarle estos parametros:
    params.name (string)
    params.year (number)
    */
      let params = {};
      params.name = albumResponse.name;
      const date = albumResponse.release_date;
      console.log("creando album:" + params.name);
      this.addAlbum(artistName, params);

    });
  }


  
}



// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};