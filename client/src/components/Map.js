import mapData from "../data/regionsFrance.json";
import { MapContainer as MapLeaf, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import React from "react";

function Map({ updateRegion }) {
  let countryStyle = {
    fillColor: "red",
    fillOpacity: 0.5,
    color: "white",
    weight: 2,
  };
  const color = "red";
  const onColor = "#FF583B";

  let changeRegionColor = (event) => {
    event.target.setStyle({
      fillColor: onColor,
    });
  };
  let changeBackRegionColor = (event) => {
    event.target.setStyle({
      fillColor: color,
    });
  };

  let selectRegion = (event) => {
    updateRegion(event.target.feature.properties.nom);
  };

  let onEachRegion;
  onEachRegion = (region, layer) => {
    const regionName = region.properties.nom;
    layer.on({
      mouseover: changeRegionColor,
      mouseout: changeBackRegionColor,
      click: selectRegion,
    });
    layer.bindPopup(regionName);
  };

  return (
    <MapLeaf
      className={"mapLeaf"}
      zoom={6}
      center={[46, 4]}
      zoomControl={false}
      maxZoom={6}
      minZoom={6}
    >
      <GeoJSON
        style={countryStyle}
        data={mapData.features}
        onEachFeature={onEachRegion}
      />
    </MapLeaf>
  );
}

export default Map;
