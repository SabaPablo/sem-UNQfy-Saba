const albumFile = require('./Album.js');

class Artist {

  constructor(params){

    this.id = params['id'];
    this.name = params['name'];
    this.country = params['country'];
    this.albumsForName = {};
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
    this.getAlbums().forEach(album => {
      res = res.concat(album.getTracksByAlbum()); 
    });
    return res;
  }

  getAlbums(){
    let values = [];
    Object.keys(this.albumsForName).forEach(key => {
      values.push(this.albumsForName[key]);
    });
    return values;

  }

  getAlbumByName(name){
    return this.albumsForName[name];
  }

  setAlbum(params){
    const newAlbum = new albumFile.Album(params);
    this.albumsForName[newAlbum.name] = newAlbum;
    
  }

  getTrackByName(name){
    let track = null;
    let albums = this.getAlbums();
    albums.forEach(album => {
      track = album.getAlbumByTrackByName(name);
    });
    return track;
  }



}

module.exports = {Artist: Artist};