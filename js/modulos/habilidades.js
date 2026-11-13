(function () {
  'use strict';
  var P = window.Portafolio;

  // Recibe una habilidad de la API y arma su tarjeta.
  function tarjetaHabilidad(h) {
    var tarjeta = P.crear('article', 'tarjeta');
    tarjeta.appendChild(P.crear('h3', 'tarjeta-titulo', h.nombre));

    var etiquetas = P.crear('div', 'tarjeta-etiquetas');
    var categoria = P.crear('span', 'etiqueta', h.categoria);
    var nivel = P.crear('span', 'etiqueta', h.nivel);

    // El CSS usa data-nivel para darle un color a cada nivel.
    nivel.classList.add('etiqueta-nivel');
    nivel.dataset.nivel = h.nivel;

    etiquetas.appendChild(categoria);
    etiquetas.appendChild(nivel);
    tarjeta.appendChild(etiquetas);

    return tarjeta;
  }

  // Consulta /habilidades y usa la plantilla para mostrar cada registro.
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
