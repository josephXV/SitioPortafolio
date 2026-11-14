
(function () {
  'use strict';

  // Accedemos a las funciones generales del portafolio, desarrolladas para reutilizarlas en todos los módulos.
  var P = window.Portafolio;

  // Espacio de nombres necesario para crear elementos SVG.
  var SVG_NS = 'http://www.w3.org/2000/svg';

  // Definimos los íconos correspondientes a cada interés. La clave (1, 2, 3...) coincide con el id del interés en db.json.
  var iconos = {
    // 1. Desarrollo de aplicaciones web: globo
    1: [
      ['circle', { cx: 12, cy: 12, r: 10 }],
      ['path', { d: 'M2 12h20' }],
      ['path', { d: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' }]
    ],

    // 2. Diseño y gestión de bases de datos
    2: [
      ['ellipse', { cx: 12, cy: 5, rx: 9, ry: 3 }],
      ['path', { d: 'M3 5v14a9 3 0 0 0 18 0V5' }],
      ['path', { d: 'M3 12a9 3 0 0 0 18 0' }]
    ],

    // 3. Desarrollo de software: símbolos de código
    3: [
      ['path', { d: 'm16 18 6-6-6-6' }],
      ['path', { d: 'm8 6-6 6 6 6' }]
    ],

    // 4. Ciberseguridad: escudo con verificación
    4: [
      ['path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }],
      ['path', { d: 'm9 12 2 2 4-4' }]
    ],

    // 5. Fotografía: cámara
    5: [
      ['path', { d: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z' }],
      ['circle', { cx: 12, cy: 13, r: 3 }]
    ],

    // 6. Lectura: libro abierto
    6: [
      ['path', { d: 'M12 7v14' }],
      ['path', { d: 'M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13h-5a4 4 0 0 0-4 3 4 4 0 0 0-4-3z' }]
    ]
  };

  // Función que construye el ícono SVG según el id.
  function crearIcono(id) {

    // Buscamos los trazos correspondientes al interés.
    var trazos = iconos[id];

    // Si no existe un ícono para ese id, devolvemos null. Esto evita que se produzca un error.
    if (!trazos) {
      return null;
    }

    // Creamos el contenedor que tendrá el fondo lavanda.
    var contenedor = P.crear('div', 'interes-icono');

    // Creamos un elemento SVG mediante su espacio de nombres.
    var svg = document.createElementNS(SVG_NS, 'svg');

    // Configuramos el tamaño y la apariencia del ícono.
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');

    // Recorremos las figuras que componen el ícono.
    trazos.forEach(function (trazo) {

      // Creamos cada figura SVG (path, circle o ellipse).
      var elemento = document.createElementNS(SVG_NS, trazo[0]);

      // Agregamos sus atributos, como coordenadas o trazos.
      Object.keys(trazo[1]).forEach(function (atributo) {
        elemento.setAttribute(atributo, trazo[1][atributo]);
      });

      // Incorporamos la figura al SVG.
      svg.appendChild(elemento);
    });

    // Colocamos el SVG dentro del contenedor.
    contenedor.appendChild(svg);

    return contenedor;
  }

  // Función que construye una tarjeta para cada interés.
  function tarjetaInteres(i) {

    // Creamos la tarjeta utilizando los estilos generales.
    var tarjeta = P.crear('article', 'tarjeta');

    // Obtenemos el ícono correspondiente al interés.
    var icono = crearIcono(i.id);

    // Solo agregamos el ícono si existe.
    if (icono) {
      tarjeta.appendChild(icono);
    }

    // Mostramos el nombre del interés como título.
    tarjeta.appendChild(
      P.crear('h3', 'tarjeta-titulo', i.nombre)
    );

    // Verificamos que la descripción exista, sea texto y no esté vacía.
    if (
      typeof i.descripcion === 'string' &&
      i.descripcion.trim()
    ) {

      // Agregamos la descripción debajo del título.
      tarjeta.appendChild(
        P.crear('p', 'tarjeta-texto', i.descripcion)
      );
    }

    // Devolvemos la tarjeta construida.
    return tarjeta;
  }

  // Esperamos a que la página esté lista para cargar los datos.
  P.alCargar(function () {

    // Solicitamos los intereses a JSON Server.
    // La función general se encarga de mostrar la lista, el estado de carga y los posibles errores.
    P.cargarLista({
      recurso: '/intereses',
      lista: 'lista-intereses',
      error: 'error-intereses',
      plantilla: tarjetaInteres,
      vacio: 'Aún no hay intereses registrados.'
    });
  });

})();
