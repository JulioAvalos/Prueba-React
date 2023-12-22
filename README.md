
# Pokemon Web App - React.js (Prueba Frontend Developer) 💻

🖥Demo de la aplicacion publicada aqui [Vista previa](https://toma-pedido-cae71.web.app/)
---

Se hizo uso del servicio web [PokeAPI](https://pokeapi.co/)

Permite ver los pokemon con paginacion sencilla y filtrar por nombre

Como correr el proyecto: 
```bash 
$ npm install 
$ npm run dev

//o utilizando yarn

$ yarn install
$ yarn dev
```

Configuracion de archivo .env.local y .env.production:

```
VITE_API_URL=
VITE_VERSION=
```


Listado de pokemon:
> http://localhost:5000

Listado de pokemon favorito, la ruta es la siguiente:
> http://localhost:5000/favorites

Sino se muestra ninguno, se debe ver desde la pantalla principal y en el detalle agregarlos como favorito.

### Update [21-DIC-2023] 
* Se actualizo la versión de React a 18+ con Hooks
* Se retiro Redux y Redux Saga para simplificar la logica
* Se reemplazo Webpack para que use Vite
* Se agrego TypeScript
* Se actualizo a la version de Material UI 5
* Se mejoro la busqueda por nombres
* Se agrego alerta cuando LocalStorage alcanza su quota en memoria
