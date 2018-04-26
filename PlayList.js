class PlayList {

  constructor(params) {
    this.name = params.name;
    this.genres = params.genres;
    this.durationparam = params.duration;
    this.unquify = params.system;
    this.tracksPlayList = [];

  }
     
  searchTracks(){
    const tracks = this.unquify.getTracksMatchingGenres(this.genres);

    let aux = 0;
    tracks.forEach(track => {


      if ((aux + track.getDuration()) <= this.duration()){

        this.tracksPlayList.push(track);
        aux = aux + track.getDuration();

      }            
    });
  }


  duration() {
    return this.durationparam;
  }

  hasTrack(aTrack){
    let res = false;
    this.tracksPlayList.forEach(element => {
      if(element.name === aTrack.name){
        res = true;
      }
    });
    return res;
  }
}

module.exports = { PlayList: PlayList };