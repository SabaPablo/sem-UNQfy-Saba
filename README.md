

![alt tag](https://github.com/wisaku/sem-UNQfy-Saba/blob/master/unquify.jpg?raw=true)

  # sem-UNQfy-Saba

UNQfy es una aplicación que te permite llevar tu musica donde vos quieras, a partir de lieas de comando podes cargar tus > artistas preferidos, sus albums y su musica. 

## Getting Started

Estas instrucciones sirven para descargar el proyecto y tenerlo en un repositorio local, para poder usarlo y modificarlo, "Y aprobarme con un 10"(para los profesores)

### Prerequisitos

Lo que necesitas instalar antes de empezar es instalar node 

```
sudo apt-get install nodejs
```
y git
```
sudo apt-get install git
```
### Instalación

el paso a paso para la instalacion de tu repositorio local es el siguiente

clonate el repositorio en la carpeta que prefieras, 
para hacer eso en la consola posicionate dentro de esa carpeta y escribe

```
git clone https://github.com/wisaku/sem-UNQfy-Saba.git
```
luego deberas bajar las dependencias, para eso escribe

```
npm install
```

Si lo estas descargando con la red de la universidad... tomate tu tiempo, pidete algo en la cafeteria y comete algo rico, cuando vuelvas si tienes suerte las dependencias ya estaran descargas :D

## Corriendo los tests

Para ver que tu proyecto se instalo correctamente(y que no me mande cagadas al programar) corre el test que demuestra que las funciones de la aplicacion corren correctamente, para eso escribe..

```
npm test
```



## Funciones permitidas

--CONSTRUCTORES
- addArtist
- addTrack
- addAlbum
- addPlaylist

--GETTERS
- getAlbumByName
- getArtistByName
- getTracksByArtistName
- getPlaylistByName

## Formato uso funciones

```
node  main.js   addArtist  name "Peter Tosh"
```

## UML

* [UML](https://drive.google.com/file/d/185mpnGDflgvlAK5hwWwU4EDlZkJayPl9/view?usp=sharing)


## Hecho con

* [Node](https://nodejs.org/es/) - Entorno de ejecución


## Autores

* **Sabaliauskas Pablo Nicolas** - *Initial work* - [Saba](https://github.com/wisaku)
