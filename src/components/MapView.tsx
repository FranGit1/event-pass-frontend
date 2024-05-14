import React, { useEffect, useRef } from 'react';
import { initMap } from '../utils/initMap';
import { useMap } from '../hooks/useMap';
import { IComponentBaseProps } from '../types';

interface IMapViewProps extends IComponentBaseProps {
  longitude: string;
  latitude: string;
}

export const MapView = (props: IMapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useMap(mapRef);

  useEffect(() => {
    if (mapRef.current) {
      initMap(mapRef.current, [Number(props.latitude), Number(props.longitude)]);
    }
  }, [props.latitude, props.longitude]);

  return <div ref={mapRef} className="map" style={{ width: '100%', height: '400px' }} />;
};
