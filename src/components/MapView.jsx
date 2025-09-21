import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapView = ({ locations }) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: locations[0]?.lat || 10.93713, // default to SKCET
    lng: locations[0]?.lng || 76.95641,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        {locations.map((loc) => (
          <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
