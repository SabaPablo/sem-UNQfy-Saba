

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
  console.log();
  unqfy.save(filename);
}

function addArtist(unqfy, params) {
  unqfy.addArtist(params);
}


function getPlaylistByName(unqfy, name) {
  unqfy.getPlaylistByName(name);
}



function addTrack(unqfy, params) {
  unqfy.addTrack(params);
}
function addAlbum(unqfy, params) {
  unqfy.addAlbum(params);
}
function addPlaylist(unqfy, params) {
  unqfy.addPlaylist(params);
}


function getFunctions(){
  //TODO FIXME agregar funciones que faltan
  const res = { 
    addArtist: addArtist,
    addTrack : addTrack,
    addAlbum : addAlbum,
    addPlaylist : addPlaylist,
    getPlaylistByName: getPlaylistByName

  };
  return res;
}

function main() {


  const unqfy = getUNQfy();
  
  const fuctionBox = getFunctions();

  const args = process.argv.slice(2);
  console.log('arguments: ');
  args.forEach(argument => console.log(argument));
  const func = args[0];
  let params = {};
  for (let index = 1; index < args.length; index+ 2) {
    const key = args[index];
    const value = args[index+1];
    params[key] = value;
  }
  fuctionBox[func](unqfy,params);
  saveUNQfy(unqfy);
}
main();