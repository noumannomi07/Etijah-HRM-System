import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFormikContext } from "formik";
import useUserLocation from '@/Dashboard/hooks/useUserLocation';
import { AdvancedMarker, APIProvider, Map, MapMouseEvent } from '@vis.gl/react-google-maps';

interface ControlledMapProps {
  latName: string;
  lngName: string;
  initialPosition?: [number, number];
  zoom?: number;
  width?: number | string;
  height?: number | string;
  label?: string;
}

const ControlledMap: React.FC<ControlledMapProps> = ({
  latName,
  lngName,
  zoom = 15,
  height = 400,
  label = "",
}) => {
  const formik = useFormikContext();
  const [position, setPosition] = useState({ lat: 23.8859, lng: 45.0792 });
  const [markerPosition, setMarkerPosition] = useState({ lat: 23.8859, lng: 45.0792 });
  const { location } = useUserLocation();
  const isFirstTime = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstTime.current) {
      const initialPosition = { lat: location.lat, lng: location.lng };
      setPosition(initialPosition);
      setMarkerPosition(initialPosition);
      formik.setFieldValue(latName, location.lat);
      formik.setFieldValue(lngName, location.lng);
      isFirstTime.current = false;
    }
  }, [location, latName, lngName, formik]);

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    if (!event.detail.latLng) return;

    const newPosition = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng
    };
    setMarkerPosition(newPosition);
    formik.setFieldValue(latName, newPosition.lat);
    formik.setFieldValue(lngName, newPosition.lng);
  }, [formik, latName, lngName]);

  const handleMarkerDrag = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkerPosition(newPosition);
    formik.setFieldValue(latName, newPosition.lat);
    formik.setFieldValue(lngName, newPosition.lng);
  };

  const containerStyle = {
    width: '100%',
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: '12px',
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="title-form-info text-font-dark">{label}</h2>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          rotateControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          onClick={handleMapClick}
          style={containerStyle}
          defaultCenter={position}
          defaultZoom={zoom}
          mapId="mileage-map"
        >
          <AdvancedMarker draggable={true} onDragEnd={handleMarkerDrag} position={markerPosition} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default ControlledMap;