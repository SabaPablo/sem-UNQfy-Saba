class Album {

    constructor(params) {

        this.name = params['name'];
        this.year = params['year'];
        this.artist = params['artist'];
    }

}

module.exports = { Album: Album };