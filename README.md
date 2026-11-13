# Portafolio de Valeria Solís (ITI-621, Actividad 1)

Sitio WordPress (LocalWP) que consume una API de JSON Server.

## Estructura
- `wordpress/`: base de datos (`.sql`) e imágenes (`uploads/`) del sitio.
- `wordpress/mu-plugins/portafolio-api.php`: carga el JavaScript y el CSS solo en las páginas Habilidades, Intereses y Proyectos.
- `api/`: `db.json` y `package.json` de JSON Server.
- `js/`: núcleo de la integración (`portafolio-api.js`, `portafolio-api.css`) y un módulo por sección en `js/modulos/` (habilidades, intereses, proyectos).
- `bruno/Portafolio-API/`: colección de Bruno con las pruebas de los endpoints.
- `docs/GUIA-JSON-SERVER.md`: guía para iniciar la API y reproducir las pruebas.
- `docs/TAREAS.md`: división del trabajo y qué le toca a cada integrante.

## Cómo importar el sitio
1. En LocalWP, crea un sitio nuevo llamado `sitio-portafolio`.
2. Copia `wordpress/uploads/` dentro de `app/public/wp-content/`.
3. Con el sitio encendido, abre Database → Open AdminNeo → Importar y selecciona el `.sql` de `wordpress/`.
4. Instala la integración en `app/public/wp-content/`:
   - `wordpress/mu-plugins/portafolio-api.php` → `wp-content/mu-plugins/portafolio-api.php`
   - Todo el contenido de `js/` (incluida la carpeta `modulos/`) → `wp-content/mu-plugins/portafolio-api/`

   Si `mu-plugins` no existe, se crea. Los *must-use plugins* se cargan solos, no hay que activarlos.
5. Inicia la API: `cd api && npm install && npm start`.
6. Abre `http://sitio-portafolio.local`.

Estructura final dentro de `wp-content`:
```
mu-plugins/
├── portafolio-api.php
└── portafolio-api/
    ├── portafolio-api.js
    ├── portafolio-api.css
    └── modulos/
        ├── habilidades.js / habilidades.css
        ├── intereses.js / intereses.css
        └── proyectos.js / proyectos.css
```

## Cómo funciona la integración
1. WordPress muestra las páginas con los contenedores vacíos (`lista-*` y `error-*`).
2. En cada página se carga el núcleo (`portafolio-api.js`) y solo el módulo de esa sección (`modulos/habilidades.js`, etc.).
3. El módulo pide al núcleo los datos con GET (`/habilidades`, `/intereses` o `/proyectos`) y con la respuesta crea tarjetas (`tarjeta`) y etiquetas (`etiqueta`) usando `textContent`, sin insertar HTML recibido de la API.
4. En Proyectos, los botones de filtro consultan `/proyectos?estado=Finalizado` o `/proyectos?estado=En desarrollo`.
5. Si la API no responde, tarda más de 8 s, devuelve un estado distinto de 2xx o un formato incorrecto, se muestra un mensaje en `error-*` con un botón **Reintentar**.

La URL de la API se toma del host con el que se abrió el sitio y el puerto 3000. Se puede cambiar con `PORTAFOLIO_API_URL` en `wp-config.php` (ver la guía).

## Contenedores para la API
- Habilidades: `lista-habilidades` y `error-habilidades`
- Intereses: `lista-intereses` y `error-intereses`
- Proyectos: `lista-proyectos` y `error-proyectos`

## Créditos
Foto de retrato: Pexels (teguhsugi).
