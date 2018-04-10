#Visado 1
Objetos en Javascript (ES6)

Modele (diseñe e implemente) una aplicación similar a Spotify, que llamaremos UNQfy

En UNQfy existe una gran cantidad de temas musicales (tracks)  los cuales siempre pertenecen a un álbum. Un álbum tiene asociado uno o más artistas. Cada track tiene asociado uno o más géneros, que son strings. También existen playlists, que son conjuntos de tracks que pueden pertenecer a diferentes álbumes.

En UNQfy, además de las típicas operaciones de alta, baja y modificación de todos estos elementos (tracks, albums, artistas), es posible realizar búsquedas de temas por nombre o género. Debe ser posible recuperar todas las canciones que fueron interpretadas por un determinado artista, o todas las canciones que se correspondan con un determinado género.
También se desea la opción de autogenerar  una Playlist en base a una lista de géneros, es decir, rellenar una playlist con canciones de un determinado género.

Para operar UNQfy vamos a usar, en principio, la línea de comando. Más abajo se explican los detalles pero a grandes rasgos la idea es tener una serie de comandos que permitan alterar e inspeccionar el modelo de objetos de UNQfy.


TAREAS (realice las tareas en el orden indicado)

Realice el diseño y documente mediante un diagrama de clases UML. Recomendación: usar UMLet
Valide el diseño con los docentes de la materia.
Implemente utilizando clases con la sintaxis ECMA Script6.
Utilice los test cases provistos para validar su implementación.
Utilizando la consola se desea invocar comandos para interactuar con UNQfy. Implemente un programa que acepte como parámetros:
El nombre de un comando a ejecutarse y
Los argumentos necesarios para llevar a  cabo ese comando.


	Por ejemplo el comando que permite dar de alta a un artista se ejecutaría de la siguiente forma.

 node  main.js   addArtist  name "Peter Tosh"
	
Donde: 

addArtist  es el comando  
name es el nombre de un parametro
“Peter Tosh” es el valor del parametro name

Un ejemplo más complejo es la creación de un tema, donde hay que enviar más parámetros.

node main.js  addTrack  title "Legalize it" album "Greatest Hits" duration "3:11"

Estos son solo ejemplos ud. puede decidir omitir los nombres de los parametros en cuyo caso la linea de comando tendría la forma:

node main.js  addTrack  "Legalize it" "Greatest Hits" "3:11"



Los comandos que deberá implementar deben permitir invocar la siguiente funcionalidad en UNQfy:
Ingresar tracks, álbumes y artistas. Tenga en cuenta que para dar de alta un álbum el artista debe existir, y para agregar un track el álbum al que pertenece debe existir.  Si no existen debe reportar en la consola que no se pudo completar la operación, indicando claramente el error.
Buscar  (e imprimir en pantalla)   tracks, álbumes o artistas por matching parcial del string recibido como parámetro contra el nombre de los objetos.
Buscar (e imprimir en pantalla) todos los tracks de un determinado artista.
Buscar  (e imprimir en pantalla)  todos los tracks que poseen un género particular.
Crear una Playlist  (con un nombre determinado) de una determinada duración máxima, para un género determinado,  y pedir que UNQfy la rellene automáticamente.
Listar en pantalla el contenido de una Playlist

Notas:
Considere la existencia de UNQfy como un objeto, deberá aplicar el patrón Facade para simplificar las operaciones y pasar los tests cases.
Tenga en cuenta que, para poder “mantener” el estado entre las diferentes ejecuciones de UNQfy, su programa debe seguir la siguiente lógica en la ejecución de cada comando:
Cargar de disco el estado de UNQfy, utilizando la función getUNQfy provista por la cátedra. 
Ejecutar el comando pasado por parámetro en la línea de comandos.
Guardar el nuevo estado del programa, utilizando la función saveUNQfy provista por la cátedra.
En la descripción de los diferentes comandos a implementar se ha omitido intencionalmente algunos detalles, como por ejemplo los parámetros para las búsquedas o el formato de la impresión en pantalla. Ud. debe aplicar sentido común maximizando siempre la legibilidad del código y la usabilidad de UNQfy.



Requerimientos de la entrega:

El programa debe tener al menos un módulo node JS que implemente la lógica de UNQfy. Por ejemplo, si su módulo se llama unqfy será importado así:

const unqfy = require('./unqfy.js');

Implementar el manejo via línea de comando en otro archivo JS que use el módulo UNQfy.
La entrega se deberá realizar subiendo el contenido a github.
Debe incluir en el readme.md de github una referencia al diagrama  de clases, para poder verlo en pantalla.
En el readme.md de github debe mostrar como se invoca cada comando desde la CLI

Importante:

Para validar ud. mismo su entrega considere que a la hora de corregir los docentes seguirán los siguientes pasos:

Clonar su repositorio de GitHub
npm install
npm test       - los tests deben pasar!
Leer la documentacion del readme.md de github.
usarlos comandos desde la CLI
Revisar el código fuente
