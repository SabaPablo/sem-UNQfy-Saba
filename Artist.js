const albumFile = require('./Album.js');

class Artist {

  constructor(params){

    this.id = params.id;
    this.name = params.name;
    this.country = params.country;
    this.albums = [];
  }

  containAlbumByName(name){
    return name in this.albumsForName;
  }

  getTrackArtistByGenRes(gerRes, map){
    this.getAlbums().forEach(album => {
      album.getTrackBygeRes(gerRes, map);
    });
  }

  getTracks(){
    let res = [];
    this.albums.forEach(album => {
      res = res.concat(album.getTracksByAlbum()); 
    });
    return res;
  }

  getAlbumById(id) {
    let album = null;
    this.albums.forEach(anAlbum => {
      if (anAlbum.id == id)
        album = anAlbum;
    });
    return album;
  }

  createAlbum(params){
    const newAlbum = new albumFile.Album(params);
    this.albums.push(newAlbum);
    return newAlbum;
  }

  getTrackByName(name){
    let track = null;
    const albums = this.getAlbums();
    albums.forEach(album => {
      track = album.getAlbumByTrackByName(name);
    });
    return track;
  }



}

module.exports = {Artist: Artist};