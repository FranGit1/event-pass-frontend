import { Map, Marker } from 'mapbox-gl';
import { config } from '../config';

export const initMap = (container: HTMLDivElement, coords: [number, number]) => {
  const map = new Map({
    container,
    style: 'mapbox://styles/mapbox/light-v11',
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    accessToken: config.VITE_MAP_BOX_API_KEY,
    doubleClickZoom: false
  });

  new Marker().setLngLat(coords).addTo(map);

  return map;
};
