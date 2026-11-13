(function () {
  'use strict';
  var P = window.Portafolio;

  function tarjetaProyecto(p) {
    var tarjeta = P.crear('article', 'tarjeta');
    tarjeta.appendChild(P.crear('h3', 'tarjeta-titulo', p.nombre));
    return tarjeta;
  }

  function filtrosProyectos(lista, ejecutar) {
  }

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
