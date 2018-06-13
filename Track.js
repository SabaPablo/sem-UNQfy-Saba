const rp = require('request-promise');
const ACCESS_TOCKEN = '9646531739abc5bf427433b54592fb92';
class Track {

  constructor(params) {

    this.name = params.name;
    this.duration = params.duration;
    this.genres = params.genres;
    this.lirics = null;
  }
  getGenres(){
    return this.genres;
  }

  getName(){
    return this.name;
  }

  getDuration(){
    return this.duration;
  }
  
  getLirics(){
    if(this.lirics == null){
      return this.getLiricsByMusixMatch();
    }else{
      return this.lirics;
    }
  }

  getLiricsByMusixMatch(){
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
    let options = {
      uri: BASE_URL + '/track.search',
      qs: {
        apikey: '9646531739abc5bf427433b54592fb92',
        q_track: this.name,
      },
      json: true // Automatically parses the JSON string in the response
    };
    rp.get(
      options
    ).then((response) => {
      let header = response.message.header;
      let body = response.message.body;
      if (header.status_code !== 200) {
        console.log('algo salio mal', response);
        return;
      }
      this.lirics =body.track_list.get(0);
      return this.lirics;
    }).catch((error) => {
      console.log('algo salio mal', error);
    });
  }
  parserLirics(response){
    response.message.body;
  }

}

module.exports = { Track: Track};
