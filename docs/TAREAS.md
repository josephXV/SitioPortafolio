# División del trabajo — ITI-621 Actividad 1

| Parte | Responsable | Archivos que puede tocar |
|---|---|---|
| Base de la integración | Joseph | `js/portafolio-api.js`, `js/portafolio-api.css`, `wordpress/mu-plugins/`, `api/package.json`, `docs/GUIA-JSON-SERVER.md`, `README.md` |
| Habilidades y tecnologías | Persona 1: __________ | `js/modulos/habilidades.js`, `js/modulos/habilidades.css`, bloque `"habilidades"` de `api/db.json`, `bruno/.../01-*` y `02-*` |
| Intereses personales | Persona 2: __________ | `js/modulos/intereses.js`, `js/modulos/intereses.css`, bloque `"intereses"` de `api/db.json`, `bruno/.../03-*` y `04-*` |
| Proyectos académicos | Persona 3: __________ | `js/modulos/proyectos.js`, `js/modulos/proyectos.css`, bloque `"proyectos"` de `api/db.json`, `bruno/.../05-*` y `06-*` |

## Lo que ya está hecho (base)
- **JSON Server**: `api/package.json` con `npm start` (puerto 3000, CORS activo). `db.json` tiene **un solo registro de ejemplo** por colección.
- **Núcleo JS** (`js/portafolio-api.js`): hace el `fetch`, controla el tiempo de espera, revisa el estado HTTP y el formato, muestra "Cargando…", muestra el mensaje de error con botón **Reintentar** y arma la URL de la API sin asumir `localhost`.
- **Módulos** (`js/modulos/*.js`): ya cargan su lista, pero cada tarjeta muestra **solo el nombre**. Completarlos es la tarea de cada persona.
- **Carga en WordPress** (`wordpress/mu-plugins/portafolio-api.php`): en cada página carga el núcleo y **solo** el módulo que le toca (`habilidades.js` en Habilidades, etc.). Si existe `modulos/<modulo>.css`, también lo carga.
- **Estilos base**: `.portafolio-grid`, `.tarjeta`, `.tarjeta-titulo`, `.tarjeta-texto`, `.tarjeta-etiquetas`, `.etiqueta` y el mensaje de error.
- **Bruno**: colección `bruno/Portafolio-API` con el entorno **Local** y una prueba de ejemplo (`00 - Recurso inexistente.bru`).

## Reglas para no pisarse
1. Cada persona toca **solo sus archivos** (tabla de arriba).
2. En `db.json`, edita **solo dentro del arreglo de tu colección**. No muevas ni reformatees los otros bloques.
3. No modifiques `js/portafolio-api.js`. Si necesitas algo del núcleo, pídeselo a Joseph.
4. Si usan Git: una rama por persona (`habilidades`, `intereses`, `proyectos`) y un Pull Request a `main`.
5. Antes de entregar, revisa que `db.json` siga siendo JSON válido. Si `npm start` arranca sin error, está bien.

## Funciones del núcleo que pueden usar
```js
var P = window.Portafolio;
P.crear('span', 'etiqueta', 'Texto');      // crea un elemento con clase y texto (seguro, usa textContent)
P.cargarLista({ recurso, lista, error, plantilla, vacio, filtros });  // ya está llamado en su módulo
P.apiUrl;                                   // dirección de la API que se está usando
```
Para el contenido que viene de la API usen **siempre** `P.crear` o `textContent`, **nunca** `innerHTML`.

## Cómo probar tu parte (sin WordPress)
1. `cd api && npm install && npm start`.
2. Abre `http://localhost:3000/<tu-coleccion>` en el navegador.
3. En Bruno: abre la colección, elige el entorno **Local** y ejecuta tus peticiones.
4. Para ver tus tarjetas, crea un `prueba.html` en `js/` (no lo subas) con:
```html
<link rel="stylesheet" href="portafolio-api.css">
<link rel="stylesheet" href="modulos/TU-MODULO.css">
<div id="error-TU-MODULO"></div><div id="lista-TU-MODULO"></div>
<script src="portafolio-api.js"></script>
<script src="modulos/TU-MODULO.js"></script>
```
Ábrelo con la extensión **Live Server** de VS Code.

---

## Persona 1 — Habilidades y tecnologías
**Datos (`db.json` → `"habilidades"`)**
- [ ] Mínimo **8** habilidades con `id`, `nombre`, `nivel`, `categoria`.
- [ ] `nivel` solo puede ser `Básico`, `Intermedio` o `Avanzado`.
- [ ] Que haya varias categorías: `Lenguaje`, `Base de datos`, `Framework`, `Herramienta`, `CMS`.

**Código (`js/modulos/habilidades.js`)**
- [ ] Dentro de la tarjeta, crear un contenedor `div.tarjeta-etiquetas`.
- [ ] Agregarle una etiqueta (`span.etiqueta`) con la **categoría** y otra con el **nivel**.
- [ ] A la etiqueta del nivel, ponerle la clase extra `etiqueta-nivel` y el atributo `data-nivel` con el valor del nivel.

**Estilos (`js/modulos/habilidades.css`, archivo nuevo)**
- [ ] Un color distinto para cada nivel, usando `.etiqueta-nivel[data-nivel="Básico"]` y lo mismo para los otros dos.

**Pruebas en Bruno**
- [ ] `01 - Habilidades.bru`: `GET {{baseUrl}}/habilidades`. Prueba que responde 200, que es un arreglo y que cada elemento tiene `nombre`, `nivel` y `categoria`.
- [ ] `02 - Habilidad por id.bru`: `GET {{baseUrl}}/habilidades/1`. Prueba que responde 200 y que `id` es 1.

**Evidencias**
- [ ] Captura de la página Habilidades cargada.
- [ ] Captura de las 2 peticiones en Bruno con las pruebas en verde.
- [ ] Captura de la página en **vista móvil** (F12 → modo dispositivo).

**Defensa:** explicar de dónde salen los datos, qué endpoint se consulta y cómo se arma cada tarjeta.

---

## Persona 2 — Intereses personales
**Datos (`db.json` → `"intereses"`)**
- [ ] Mínimo **5** intereses con `id`, `nombre`, `descripcion`. Mezclar académicos y pasatiempos.
- [ ] Revisar la redacción y la ortografía (se evalúa la calidad del contenido).

**Código (`js/modulos/intereses.js`)**
- [ ] Mostrar la `descripcion` en un `p.tarjeta-texto` debajo del título.
- [ ] Si un interés viene sin descripción, la tarjeta no debe romperse: se muestra solo el título.

**Estilos (`js/modulos/intereses.css`, archivo nuevo)**
- [ ] Darle un estilo propio a las tarjetas de intereses: un ícono, un borde de color o un fondo distinto.

**Pruebas en Bruno**
- [ ] `03 - Intereses.bru`: `GET {{baseUrl}}/intereses`. Prueba que responde 200, que es un arreglo y que cada elemento tiene `nombre` y `descripcion`.
- [ ] `04 - Interes por id.bru`: `GET {{baseUrl}}/intereses/1`. Prueba que responde 200 y que `id` es 1.

**Evidencias**
- [ ] Captura de la página Intereses cargada.
- [ ] Captura de las 2 peticiones en Bruno con las pruebas en verde.
- [ ] **Manejo de errores**: detener JSON Server (`Ctrl + C`), recargar la página y hacer captura del mensaje de error. Luego iniciar la API, presionar **Reintentar** y hacer captura de que vuelve a cargar.

**Defensa:** explicar qué pasa cuando la API no responde y cómo se recupera con Reintentar.

---

## Persona 3 — Proyectos académicos
**Datos (`db.json` → `"proyectos"`)**
- [ ] Mínimo **4** proyectos con `id`, `nombre`, `descripcion`, `tecnologias` (arreglo) y `estado`.
- [ ] `estado` solo puede ser `Finalizado` o `En desarrollo`, y debe haber al menos uno de cada uno.

**Código (`js/modulos/proyectos.js`)**
- [ ] En la tarjeta: mostrar el **estado** como `span.etiqueta.etiqueta-estado` con `data-estado`, la **descripción** en `p.tarjeta-texto` y cada **tecnología** como `span.etiqueta` dentro de un `div.tarjeta-etiquetas`.
- [ ] Completar `filtrosProyectos(lista, ejecutar)`:
  - Crear un `div.portafolio-filtros` con 3 botones: **Todos**, **Finalizados** y **En desarrollo**.
  - Insertarlo antes de la lista: `lista.parentNode.insertBefore(barra, lista)`.
  - Al hacer clic, llamar `ejecutar('/proyectos')` o `ejecutar('/proyectos?estado=' + encodeURIComponent('Finalizado'))`, según el botón.
  - Marcar el botón activo con `aria-pressed="true"` y los demás con `"false"`.

**Estilos (`js/modulos/proyectos.css`, archivo nuevo)**
- [ ] Colores para `.etiqueta-estado[data-estado="Finalizado"]` y `[data-estado="En desarrollo"]`.
- [ ] Estilo de los botones `.portafolio-filtros button`, con el activo diferenciado (`[aria-pressed="true"]`).

**Pruebas en Bruno**
- [ ] `05 - Proyectos.bru`: `GET {{baseUrl}}/proyectos`. Prueba que responde 200 y que cada proyecto tiene `nombre`, `descripcion`, `tecnologias` (arreglo) y `estado`.
- [ ] `06 - Proyectos finalizados.bru`: `GET {{baseUrl}}/proyectos?estado=Finalizado`. Prueba que responde 200 y que **todos** los resultados tienen `estado` igual a `Finalizado`.

**Evidencias**
- [ ] Captura de la página Proyectos con **Todos** y otra con **Finalizados** activo.
- [ ] Captura de las 2 peticiones en Bruno con las pruebas en verde.
- [ ] Captura de la pestaña **Red** (F12) mostrando la petición `?estado=Finalizado`.

**Defensa:** explicar cómo funciona el filtro por estado y por qué se hace en la API y no en el navegador.

---

## Ejemplo de prueba en Bruno
Copien `00 - Recurso inexistente.bru` y cambien el nombre, el `seq`, la URL y el bloque `tests`:
```
tests {
  test("Responde 200", function() {
    expect(res.getStatus()).to.equal(200);
  });
  test("Devuelve una lista", function() {
    expect(res.getBody()).to.be.an("array").that.is.not.empty;
  });
}
```

## Pendiente de Joseph (cuando llegue el sitio de WordPress)
- [ ] Importar el sitio en LocalWP siguiendo el README.
- [ ] Copiar `mu-plugins` y `js/` a `wp-content/mu-plugins/`.
- [ ] Juntar las partes de las 3 personas y revisar que `db.json` sea válido.
- [ ] Ejecutar toda la colección de Bruno y hacer la captura final.
- [ ] Capturas de Inicio y Contacto. Revisar que el contenido personal (nombre, foto, contacto) sea el correcto.
- [ ] Armar el zip final de entrega: sitio exportado de LocalWP, `db.json`, `js/`, guía y evidencias.
