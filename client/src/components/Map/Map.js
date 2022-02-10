import mapData from "../../data/regionsFrance.json";
import { MapContainer as MapLeaf, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/Map.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/system";
function Map({ updateRegion }) {
  const [infoMap, setInfoMap] = useState(null);
  let color;
  switch (infoMap) {
    case null:
      color = "red";
      break;
    case "Consommation":
      color = "Blue";
      break;
    case "Renouvelable":
      color = "green";
      break;
  }
  const onColor = "#FF583B";

  const renderCountries = (country) => {
    //console.log(color);
    //console.log(country);
    return {
      fillColor: color,
      fillOpacity: 0.5,
      color: "white",
      weight: 2,
    };
  };

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
    <div>
      <Box sx={{ margin: 1 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlinded primary button group"
        >
          <Button onClick={() => setInfoMap("Consommation")}>
            Consommation
          </Button>
          <Button onClick={() => setInfoMap("Renouvelable")}>
            Renouvelable
          </Button>
        </ButtonGroup>
      </Box>
      <MapLeaf
        className={"mapLeaf"}
        zoom={6}
        center={[46, 4]}
        zoomControl={false}
        maxZoom={6}
        minZoom={6}
      >
        <GeoJSON
          style={renderCountries}
          data={mapData.features}
          onEachFeature={onEachRegion}
        />
      </MapLeaf>
    </div>
  );
}

export default Map;
