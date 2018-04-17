

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

function addTrack(unqfy, params) {
  unqfy.addTrack(params);
}
function getFunctions(){


const res = { 
  "addArtist": addArtist,
  "addTrack": addTrack };
}


function main() {


  let unqfy = getUNQfy("unqfydb");
  
  let fuctionBox = getFunctions();

  let args = process.argv.slice(2);
  console.log('arguments: ');
  args.forEach(argument => console.log(argument));
  let func = args[0];
  let params = {};
  for (let index = 1; index < args.length; index+ 2) {
    const key = args[index];
    const value = args[index];
    params[key] = value;
  }
  let object = func(params);
  console.log(object);
}

main();


