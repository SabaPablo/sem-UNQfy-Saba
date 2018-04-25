const trackFile = require('./Track.js');

class Album {


  constructor(params) {

    this.name = params['name'];
    this.year = params['year'];
    this.trackForName = {};
    this.tracksBygenres = {};
  }

  getTracksByAlbum(){
    let res = [];
    Object.keys(this.trackForName).forEach(key => {
      let track = this.trackForName[key];
      res.push(track);
    });
    return res;
  }

  getTrackBygeRes(genres, map){
    genres.forEach(element => {
      this.tracksBygenres[element].forEach(track => {

        map[track.name] = track;
      });
    });
}
    
  getAlbumByTrackByName(name){
    return this.trackForName[name];
  }

  setTrack(params){
    let atrack = new trackFile.Track(params);    
    this.trackForName[atrack.getName()] = atrack;

    params.genres.forEach(element => {
      if (!(element in this.tracksBygenres)){
        this.tracksBygenres[element] = [];
      }
      this.tracksBygenres[element].push(atrack);
    });
  }


}

module.exports = { Album: Album };