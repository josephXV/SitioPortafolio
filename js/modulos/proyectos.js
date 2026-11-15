(function () {
  'use strict';

  // Funciones generales del portafolio (crear elementos, cargar listas, etc.).
  var P = window.Portafolio;

  // Botones del filtro. "estado" vacío significa que se muestran todos los proyectos.
  var FILTROS = [
    { texto: 'Todos', estado: '' },
    { texto: 'Finalizados', estado: 'Finalizado' },
    { texto: 'En desarrollo', estado: 'En desarrollo' }
  ];

  // Construye la tarjeta de un proyecto.
  function tarjetaProyecto(p) {
    var tarjeta = P.crear('article', 'tarjeta');

    // Estado del proyecto. data-estado permite darle un color distinto en el CSS.
    if (p.estado) {
      var estado = P.crear('span', 'etiqueta etiqueta-estado', p.estado);
      estado.setAttribute('data-estado', p.estado);
      tarjeta.appendChild(estado);
    }

    // Nombre del proyecto.
    tarjeta.appendChild(P.crear('h3', 'tarjeta-titulo', p.nombre));

    // Descripción, solo si viene con texto.
    if (typeof p.descripcion === 'string' && p.descripcion.trim()) {
      tarjeta.appendChild(P.crear('p', 'tarjeta-texto', p.descripcion));
    }

    // Tecnologías usadas, cada una como una etiqueta.
    if (Array.isArray(p.tecnologias) && p.tecnologias.length) {
      var etiquetas = P.crear('div', 'tarjeta-etiquetas');
      p.tecnologias.forEach(function (tecnologia) {
        etiquetas.appendChild(P.crear('span', 'etiqueta', tecnologia));
      });
      tarjeta.appendChild(etiquetas);
    }

    return tarjeta;
  }

  // Crea la barra de filtros y la coloca antes de la lista.
  // "ejecutar" vuelve a pedir los datos a la API con la ruta que se le indique.
  function filtrosProyectos(lista, ejecutar) {
    var barra = P.crear('div', 'portafolio-filtros');
    barra.setAttribute('role', 'group');
    barra.setAttribute('aria-label', 'Filtrar proyectos por estado');

    var botones = FILTROS.map(function (filtro, indice) {
      var boton = P.crear('button', null, filtro.texto);
      boton.type = 'button';
      // Al cargar la página, el botón activo es "Todos".
      boton.setAttribute('aria-pressed', indice === 0 ? 'true' : 'false');

      boton.addEventListener('click', function () {
        // Marcamos solo el botón presionado como activo.
        botones.forEach(function (b) {
          b.setAttribute('aria-pressed', b === boton ? 'true' : 'false');
        });

        // El filtro se hace en la API: JSON Server devuelve solo los proyectos con ese estado.
        if (filtro.estado) {
          ejecutar('/proyectos?estado=' + encodeURIComponent(filtro.estado));
        } else {
          ejecutar('/proyectos');
        }
      });

      barra.appendChild(boton);
      return boton;
    });

    lista.parentNode.insertBefore(barra, lista);
  }

  // Cuando la página esté lista, se cargan los proyectos desde la API.
  P.alCargar(function () {
    P.cargarLista({
      recurso: '/proyectos',
      lista: 'lista-proyectos',
      error: 'error-proyectos',
      plantilla: tarjetaProyecto,
      vacio: 'No hay proyectos con ese estado.',
      filtros: filtrosProyectos
    });
  });
})();
