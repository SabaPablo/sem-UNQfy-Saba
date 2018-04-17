class Track {

    constructor(params) {

        this.name = params.name;
        this.album = params.album;
        this.duration = params.duration;
        this.genres = [];
        if(!params.genres.isNull && 0 < params.genres.length){
            params.genres.forEach(element => {
                this.genres.push(element);
            });
        }
    }

}

module.exports = { Track: Track};
