import React from "react";
import "./map.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import ShowDataOnMap from "./ShowDataOnMap";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
function Maps({ countries, zoom, center, casesType }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <ChangeView center={center} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {showDataOnMap(countries, casesType)} */}
        <ShowDataOnMap data={countries} casesType={casesType} />
      </MapContainer>
    </div>
  );
}

export default Maps;
