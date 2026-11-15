# Portafolio de Ana Lucía Vargas Rojas

Sitio web de portafolio personal hecho en **WordPress** que obtiene sus datos de una **API REST** creada con **JSON Server**. Proyecto del curso ITI-621, Actividad 1.

Las páginas **Habilidades**, **Intereses** y **Proyectos** no tienen el contenido escrito en WordPress: lo cargan desde la API con JavaScript al abrir la página.

## Integrantes

| Integrante | Parte del proyecto |
|---|---|
| Joseph | Base de la integración, carga en WordPress y documentación |
| Franklin Josué Castillo Umaña | Habilidades y tecnologías |
| Emesis Mayerli Mairena Sevilla | Intereses personales |
| Jairo Steven Herrera Romero | Proyectos académicos |

El detalle de las tareas de cada integrante está en [`docs/TAREAS.md`](docs/TAREAS.md).

## Tecnologías

- **WordPress** con el tema Twenty Twenty-Five, ejecutado en **LocalWP**.
- **JSON Server 0.17** como API REST (`api/db.json`).
- **JavaScript** sin librerías (`fetch`) y **CSS**.
- **Bruno** para probar los endpoints.

## Estructura del repositorio

```
├── api/                    API REST: db.json y package.json de JSON Server
├── bruno/Portafolio-API/   Colección de Bruno con las pruebas de los endpoints
├── docs/
│   ├── GUIA-JSON-SERVER.md Guía de la API, las pruebas y las evidencias
│   └── TAREAS.md           División del trabajo
├── js/
│   ├── portafolio-api.js   Núcleo: peticiones, estado de carga y errores
│   ├── portafolio-api.css  Estilos base de tarjetas, etiquetas y errores
│   └── modulos/            Un archivo .js y .css por sección
└── wordpress/
    ├── *.sql               Base de datos del sitio
    ├── uploads/            Imágenes del sitio
    └── mu-plugins/         Plugin que carga el JavaScript en WordPress
```

## Requisitos

- [LocalWP](https://localwp.com/)
- [Node.js](https://nodejs.org/) 18 o superior
- [Bruno](https://www.usebruno.com/) (para las pruebas)

## Instalación

### 1. Crear el sitio en LocalWP
1. En LocalWP, crea un sitio nuevo llamado **`sitio-portafolio`** con el entorno **Preferred**.
2. Con el sitio encendido, abre **Database → Open AdminNeo → Importar** y selecciona el archivo `.sql` de la carpeta `wordpress/`.

### 2. Copiar los archivos a WordPress
Dentro de la carpeta del sitio (`app/public/wp-content/`):

| Copiar desde el repositorio | Hacia `wp-content/` |
|---|---|
| Contenido de `wordpress/uploads/` | `uploads/` |
| `wordpress/mu-plugins/portafolio-api.php` | `mu-plugins/portafolio-api.php` |
| Todo el contenido de `js/` | `mu-plugins/portafolio-api/` |

Si la carpeta `mu-plugins` no existe, se crea. Los *must-use plugins* se activan solos.

Resultado esperado:
```
wp-content/mu-plugins/
├── portafolio-api.php
└── portafolio-api/
    ├── portafolio-api.js
    ├── portafolio-api.css
    └── modulos/
        ├── habilidades.js / habilidades.css
        ├── intereses.js / intereses.css
        └── proyectos.js / proyectos.css
```

### 3. Iniciar la API
```bash
cd api
npm install
npm start
```
La API queda en `http://localhost:3000`. La terminal debe quedar abierta mientras se usa el sitio.

### 4. Abrir el sitio
Desde LocalWP, botón **Open site** (normalmente `http://sitio-portafolio.local`).

## API REST

| Método | Endpoint | Resultado |
|---|---|---|
| GET | `/habilidades` | Lista de habilidades |
| GET | `/habilidades/{id}` | Una habilidad |
| GET | `/intereses` | Lista de intereses |
| GET | `/intereses/{id}` | Un interés |
| GET | `/proyectos` | Lista de proyectos |
| GET | `/proyectos?estado=Finalizado` | Proyectos filtrados por estado (`Finalizado` o `En desarrollo`) |

## Cómo funciona

1. WordPress muestra cada página con dos contenedores vacíos: `lista-<sección>` y `error-<sección>`.
2. El plugin `portafolio-api.php` carga el núcleo y **solo** el módulo de esa página (por ejemplo, `modulos/proyectos.js` en Proyectos).
3. El módulo pide los datos a la API con `GET` y crea una tarjeta por cada registro. El contenido se inserta con `textContent`, nunca con `innerHTML`.
4. En **Proyectos**, los botones *Todos*, *Finalizados* y *En desarrollo* vuelven a consultar la API con `?estado=...`, así que el filtro lo resuelve el servidor.
5. Si la API no responde, tarda más de 8 segundos, devuelve un error HTTP o un formato inesperado, se muestra un mensaje con el botón **Reintentar**.

La dirección de la API se arma con el mismo host con el que se abrió el sitio y el puerto 3000. Si la API está en otra dirección, se define `PORTAFOLIO_API_URL` en `wp-config.php` (ver la guía).

## Pruebas

1. En Bruno: **Open Collection** → carpeta `bruno/Portafolio-API`.
2. Elegir el entorno **Local**.
3. Clic derecho en la colección → **Run**.

O desde la terminal, con la API encendida:
```bash
cd bruno/Portafolio-API
npx @usebruno/cli run --env Local
```

La guía completa (endpoints, manejo de errores y evidencias) está en [`docs/GUIA-JSON-SERVER.md`](docs/GUIA-JSON-SERVER.md).

## Problemas comunes

- **Las secciones muestran "No se pudo conectar con la API":** JSON Server no está encendido. Ejecuta `npm start` dentro de `api/` y presiona **Reintentar**.
- **Los cambios en `js/` no se ven en el sitio:** el sitio usa la copia que está en `wp-content/mu-plugins/portafolio-api/`. Vuelve a copiar los archivos y recarga con `Ctrl + Shift + R`.
- **LocalWP en Linux se queda pegado al iniciar el sitio:** está esperando permisos de administrador para usar el puerto 80. Cambia **Preferences → Advanced → Router Mode** a **localhost** y abre el sitio desde **Open site**.
