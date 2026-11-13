// Responsable: Franklin — Habilidades y tecnologías
// Ver docs/TAREAS.md, sección de Franklin.
(function () {
  'use strict';
  var P = window.Portafolio;

  function tarjetaHabilidad(h) {
    var tarjeta = P.crear('article', 'tarjeta');
    tarjeta.appendChild(P.crear('h3', 'tarjeta-titulo', h.nombre));
    // TODO Franklin: mostrar "categoria" y "nivel" como etiquetas (clase "etiqueta").
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
