# Guía para iniciar JSON Server y reproducir las pruebas

## 1. Requisitos
- Node.js 18 o superior (`node -v`).
- LocalWP con el sitio `sitio-portafolio` importado (ver README).
- Bruno (opcional, para las pruebas de endpoints).

## 2. Iniciar la API
```bash
cd api
npm install
npm start
```
Equivale a:
```bash
npx json-server@0.17.4 --watch db.json --host 0.0.0.0 --port 3000
```
- `--watch` recarga la API cuando se edita `db.json`.
- `--host 0.0.0.0` hace que la API escuche en todas las interfaces, no solo en `127.0.0.1`. Si Windows pregunta por el firewall, permitir el acceso en redes privadas.
- JSON Server 0.17 habilita CORS por defecto (`Access-Control-Allow-Origin` refleja el origen que hace la petición), por eso WordPress (`http://sitio-portafolio.local`) puede consumir la API en el puerto 3000.

La terminal debe quedar abierta mientras se usa el sitio.

## 3. Endpoints
| Método | Endpoint | Resultado |
|---|---|---|
| GET | `/habilidades` | Todas las habilidades |
| GET | `/intereses` | Todos los intereses |
| GET | `/proyectos` | Todos los proyectos |
| GET | `/habilidades/1` | Una habilidad específica |
| GET | `/proyectos?estado=Finalizado` | Proyectos filtrados por estado |

Prueba rápida en el navegador: `http://localhost:3000/habilidades`.

## 4. Dirección de la API desde WordPress
El JavaScript arma la URL de la API con el **mismo host con el que se abrió el sitio** y el puerto 3000:

| El sitio se abre en | La API se consulta en |
|---|---|
| `http://sitio-portafolio.local` | `http://sitio-portafolio.local:3000` |
| `http://localhost:10004` | `http://localhost:3000` |
| `http://192.168.1.20` (desde otro equipo de la red) | `http://192.168.1.20:3000` |

Así no se asume que `localhost` apunta al equipo correcto. Si la API está en otra dirección, se fija en `wp-config.php` (antes de `/* That's all, stop editing! */`):
```php
define('PORTAFOLIO_API_URL', 'http://192.168.1.50:3000');
```
Si el sitio usa HTTPS en LocalWP, la API también debe servirse por HTTPS; si no, el navegador bloquea la petición (contenido mixto).

## 5. Pruebas con Bruno
1. Abrir Bruno → **Open Collection** → seleccionar la carpeta `bruno/Portafolio-API`.
2. Arriba a la derecha, elegir el entorno **Local** (`baseUrl = http://localhost:3000`).
3. Clic derecho en la colección → **Run** para ejecutar todas las peticiones con sus pruebas.

También desde la terminal:
```bash
cd bruno/Portafolio-API
npx @usebruno/cli run --env Local
```

## 6. Prueba del manejo de errores
1. Con el sitio abierto en la página **Habilidades**, detener JSON Server (`Ctrl + C`).
2. Recargar la página: debe aparecer el mensaje *"No fue posible cargar la información. No se pudo conectar con la API."* con el botón **Reintentar**.
3. Iniciar de nuevo la API (`npm start`) y presionar **Reintentar**: la lista vuelve a cargar.

## 7. Evidencias sugeridas (capturas)
- Las páginas Inicio, Habilidades, Intereses, Proyectos y Contacto.
- Proyectos con el filtro **Finalizados** activo.
- El mensaje de error con la API detenida.
- Bruno con el resultado de la ejecución de la colección.
- La pestaña **Red** (F12) mostrando las peticiones GET a `:3000` con estado 200.
- Vista móvil (F12 → modo dispositivo) para el diseño adaptable.
