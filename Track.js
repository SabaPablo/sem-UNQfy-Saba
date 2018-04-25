class Track {

  constructor(params) {

    this.name = params.name;
    this.duration = params.duration;
    this.genres = params.genres;
  }
  getGenres(){
    return this.genres;
  }

  getName(){
    return this.name;
  }


}

module.exports = { Track: Track};
