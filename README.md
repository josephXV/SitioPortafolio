# Portafolio de Ana Lucía (ITI-621, Actividad 1)

Sitio WordPress (LocalWP) que consume una API de JSON Server.

## Estructura
- `wordpress/`: base de datos (`.sql`) e imágenes (`uploads/`) del sitio.
- `api/`: `db.json` de JSON Server (pendiente).
- `js/`: código JavaScript que consume la API (pendiente).

## Cómo importar el sitio
1. En LocalWP, crea un sitio nuevo llamado `sitio-portafolio`.
2. Copia `wordpress/uploads/` dentro de `app/public/wp-content/`.
3. Con el sitio encendido, abre Database → Open AdminNeo → Importar y selecciona el `.sql` de `wordpress/`.
4. Abre `http://sitio-portafolio.local`.
5. Copia el JavaScript a `wp-content/themes/twentytwentyfive/js/`.

## Contenedores para la API
- Habilidades: `lista-habilidades` y `error-habilidades`
- Intereses: `lista-intereses` y `error-intereses`
- Proyectos: `lista-proyectos` y `error-proyectos`

Los elementos se crean con las clases `tarjeta` y `etiqueta`.

## Créditos
Foto de retrato: Pexels (teguhsugi).
