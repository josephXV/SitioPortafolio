// Responsable: Emesis — Intereses personales
// Ver docs/TAREAS.md, sección de Emesis.
(function () {
  'use strict';
  var P = window.Portafolio;

  function tarjetaInteres(i) {
    var tarjeta = P.crear('article', 'tarjeta');
    tarjeta.appendChild(P.crear('h3', 'tarjeta-titulo', i.nombre));
    // TODO Emesis: mostrar "descripcion" debajo del título (clase "tarjeta-texto").
    return tarjeta;
  }

  P.alCargar(function () {
    P.cargarLista({
      recurso: '/intereses',
      lista: 'lista-intereses',
      error: 'error-intereses',
      plantilla: tarjetaInteres,
      vacio: 'Aún no hay intereses registrados.'
    });
  });
})();
