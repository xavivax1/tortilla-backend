'use strict';

const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmNvZGVyOTIiLCJhIjoiY2pkbmRmdno4MGQ2ODJ4bWtxcG02dnk1ciJ9.DehQETKEOyrOha4hqclYvg';
  const mapOptions = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [2.1577406, 41.387982],
    zoom: 15
  };

  const map = new mapboxgl.Map(mapOptions);

  // Cambiar el centro y el zoom del mapa para tu ubicacion
  // anadir las coordenadas en el template
  // anadir un marker con la coordenadas de la tortilla
};

window.addEventListener('load', main);
