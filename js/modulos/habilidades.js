(function () {
  'use strict';
  var P = window.Portafolio;

  function tarjetaHabilidad(h) {
    var tarjeta = P.crear('article', 'tarjeta');
    tarjeta.appendChild(P.crear('h3', 'tarjeta-titulo', h.nombre));
    return tarjeta;
  }

  P.alCargar(function () {
    P.cargarLista({
      recurso: '/habilidades',
      lista: 'lista-habilidades',
      error: 'error-habilidades',
      plantilla: tarjetaHabilidad,
      vacio: 'Aún no hay habilidades registradas.'
    });
  });
})();
