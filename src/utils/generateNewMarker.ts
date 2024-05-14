import { Popup, Marker, Map } from 'mapbox-gl';

export const generateNewMarker = ({ lat, lng, map }: { lng: number; lat: number; map: Map }) => {
  const popUp = new Popup({ closeButton: false, anchor: 'left' }).setHTML(
    `<div class="popup">You click here: <br/>[${lng},  ${lat}]</div>`
  );

  new Marker({ color: '#ea4335', scale: 1 }).setLngLat([lng, lat]).setPopup(popUp).addTo(map);
};
