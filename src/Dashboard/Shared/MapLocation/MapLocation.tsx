import React, { useState, useCallback, memo } from "react";
import {
    AdvancedMarker,
    APIProvider,
    Map,
    MapMouseEvent,
} from "@vis.gl/react-google-maps";

const containerStyle = {
    width: "100%",
    height: "250px",
    borderRadius: "12px",
};

const saudiArabiaCenterPoint: google.maps.LatLngLiteral = {
    lat: 23.8859,
    lng: 45.0792,
};

type MapLocationProps = {
    onLocationSelect: (marker: google.maps.LatLngLiteral) => void;
    initialPosition?: google.maps.LatLngLiteral;
};

const MapLocation = ({
    onLocationSelect,
    initialPosition,
}: MapLocationProps) => {
    const [markerPosition, setMarkerPosition] = useState(
        initialPosition || saudiArabiaCenterPoint
    );

    const handleMapClick = useCallback(
        (event: MapMouseEvent) => {
            if (!event.detail.latLng) return;
            const newMarker: google.maps.LatLngLiteral = {
                lat: event.detail.latLng.lat,
                lng: event.detail.latLng.lng,
            };
            setMarkerPosition(newMarker);
            onLocationSelect(newMarker);
        },
        [onLocationSelect]
    );

    const handleMarkerDrag = (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;

        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        onLocationSelect(newPosition);
    };

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                rotateControl={false}
                mapTypeControl={false}
                streetViewControl={false}
                onClick={handleMapClick}
                style={containerStyle}
                defaultCenter={markerPosition ?? saudiArabiaCenterPoint}
                defaultZoom={6}
                mapId="mileage-map"
            >
                {markerPosition && (
                    <AdvancedMarker
                        draggable
                        onDragEnd={handleMarkerDrag}
                        position={markerPosition}
                    />
                )}
            </Map>
        </APIProvider>
    );
};

export default memo(MapLocation);
