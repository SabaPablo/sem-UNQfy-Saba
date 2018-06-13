

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy');

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    console.log();
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

// Guarda el estado de UNQfy en filename
function saveUNQfy(unqfy, filename) {
  console.log(filename);
  unqfy.save(filename);
}


//GETTINGS

function getPlaylistByName(unqfy, name) {
  return unqfy.getPlaylistByName(name);
}

function getArtistByName(unqfy, name) {
  return unqfy.getArtistByName(name);
}

function getTracksByArtistName(unqfy, name){
  return unqfy.getTracksMatchingArtist(name);
}

function getAlbumByName(unqfy, name){
  return getAlbumByName(name);
}

//CONSTRUCTORS
function addArtist(unqfy, params) {
  unqfy.addArtist(params);
  console.log("create Artist");
}

function addTrack(unqfy, params) {
  unqfy.addTrack(params);
  console.log("create Track"); 
}
function addAlbum(unqfy, params) {
  unqfy.addAlbum(params);
  console.log("create Album");
}
function addPlaylist(unqfy, params) {
  unqfy.addPlaylist(params);
  console.log("create PlayList");
}

function populateAlbumsForArtist(unqfy, params) {
  unqfy.populateAlbumsForArtist(params);
  console.log("create PlayList");
}

function getFunctions(){
  //TODO FIXME agregar funciones que faltan
  const res = { 
    addArtist: addArtist,
    addTrack : addTrack,
    addAlbum : addAlbum,
    addPlaylist : addPlaylist,
    
    getAlbumByName: getAlbumByName,
    getArtistByName: getArtistByName,
    getTracksByArtistName: getTracksByArtistName,
    getPlaylistByName: getPlaylistByName,
    populateAlbumsForArtist: populateAlbumsForArtist

  };
  return res;
}

function main() {



  const unqfy = getUNQfy();
  
  unqfy.populateAlbumsForArtist('charly garcia');

  const fuctionBox = getFunctions();
  /*
  const args = process.argv.slice(2);
  console.log('arguments: ');
  //args.forEach(argument => console.log(argument));
  const func = args[0];
  const params = {};
  for (let index = 1; index < args.length; index = index+ 2 ) {
    const key = args[index];
    const value = args[index+1];
    params[key] = value;
  }
  fuctionBox[func](unqfy,params);
  */
  saveUNQfy(unqfy);
}
main();