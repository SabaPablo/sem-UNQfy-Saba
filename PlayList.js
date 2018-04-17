class PlayList {

    constructor(params) {
        this.name = params['name'];
        this.genres = params['genres'];
        this.durationparam = params['duration'];

    }
     
    duration() {
        return this.durationparam;
    }

    hasTrack(aTrack){
        let resByTrack =  aTrack.getGenres();
        return  this.genres.some(r => resByTrack.indexOf(r) >= 0);

    }
}

module.exports = { PlayList: PlayList };