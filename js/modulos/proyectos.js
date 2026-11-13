// Responsable: Jairo — Proyectos académicos
// Ver docs/TAREAS.md, sección de Jairo.
(function () {
  'use strict';
  var P = window.Portafolio;

  function tarjetaProyecto(p) {
    var tarjeta = P.crear('article', 'tarjeta');
    tarjeta.appendChild(P.crear('h3', 'tarjeta-titulo', p.nombre));
    // TODO Jairo: mostrar "estado", "descripcion" y cada elemento de "tecnologias" como etiqueta.
    return tarjeta;
  }

  // TODO Jairo: crear los botones de filtro por estado (Todos / Finalizados / En desarrollo).
  // Recibe la lista y la función ejecutar(recurso), por ejemplo: ejecutar('/proyectos?estado=Finalizado').
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
