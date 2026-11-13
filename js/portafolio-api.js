(function () {
  'use strict';

  var config = window.PORTAFOLIO_API || {};
  var API_URL = (config.url || (window.location.protocol + '//' + window.location.hostname + ':3000')).replace(/\/+$/, '');
  var TIEMPO_LIMITE = 8000;

  function crear(etiqueta, clase, texto) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined && texto !== null) el.textContent = String(texto);
    return el;
  }

  function obtener(recurso) {
    var controlador = 'AbortController' in window ? new AbortController() : null;
    var temporizador = controlador ? setTimeout(function () { controlador.abort(); }, TIEMPO_LIMITE) : null;

    return fetch(API_URL + recurso, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controlador ? controlador.signal : undefined
    })
      .then(function (respuesta) {
        if (!respuesta.ok) {
          throw new Error('La API respondió con el estado ' + respuesta.status + '.');
        }
        return respuesta.json();
      })
      .then(function (datos) {
        if (!Array.isArray(datos)) {
          throw new Error('La respuesta de la API no tiene el formato esperado.');
        }
        return datos;
      })
      .catch(function (error) {
        if (error.name === 'AbortError') {
          throw new Error('La API tardó demasiado en responder.');
        }
        if (error instanceof TypeError) {
          throw new Error('No se pudo conectar con la API.');
        }
        throw error;
      })
      .finally(function () {
        if (temporizador) clearTimeout(temporizador);
      });
  }

  function mostrarCargando(lista, error) {
    error.innerHTML = '';
    error.hidden = true;
    lista.innerHTML = '';
    lista.setAttribute('aria-busy', 'true');
    lista.appendChild(crear('p', 'portafolio-estado', 'Cargando información…'));
  }

  function mostrarError(lista, error, mensaje, reintentar) {
    lista.innerHTML = '';
    lista.removeAttribute('aria-busy');
    error.innerHTML = '';
    error.hidden = false;
    error.className = 'portafolio-error';
    error.setAttribute('role', 'alert');
    error.appendChild(crear('strong', null, 'No fue posible cargar la información. '));
    error.appendChild(crear('span', null, mensaje + ' Intenta de nuevo más tarde.'));
    if (reintentar) {
      var boton = crear('button', 'portafolio-reintentar', 'Reintentar');
      boton.type = 'button';
      boton.addEventListener('click', reintentar);
      error.appendChild(boton);
    }
  }

  function cargarLista(opciones) {
    var lista = document.getElementById(opciones.lista);
    var error = document.getElementById(opciones.error);
    if (!lista || !error) return;

    function ejecutar(recurso) {
      var ruta = recurso || opciones.recurso;
      mostrarCargando(lista, error);
      obtener(ruta)
        .then(function (datos) {
          lista.innerHTML = '';
          lista.removeAttribute('aria-busy');
          lista.classList.add('portafolio-grid');
          if (!datos.length) {
            lista.appendChild(crear('p', 'portafolio-estado', opciones.vacio || 'No hay información para mostrar.'));
            return;
          }
          datos.forEach(function (item) {
            lista.appendChild(opciones.plantilla(item));
          });
        })
        .catch(function (e) {
          mostrarError(lista, error, e.message, function () { ejecutar(ruta); });
        });
    }

    if (typeof opciones.filtros === 'function') opciones.filtros(lista, ejecutar);
    ejecutar();
  }

  function alCargar(funcion) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', funcion);
    } else {
      funcion();
    }
  }

  window.Portafolio = {
    apiUrl: API_URL,
    crear: crear,
    obtener: obtener,
    cargarLista: cargarLista,
    alCargar: alCargar
  };
})();
