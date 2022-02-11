import mapData from "../../data/regionsFrance.json";
import { MapContainer as MapLeaf, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/Map.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/system";

function Map({ updateRegion, token }) {
  const [dataMap, setDataMap] = useState({});
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/eco2/sum/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDataMap(res);
      });
  }, []);

  const [infoMap, setInfoMap] = useState(null);
  function shadeRGBColor(color, percent) {
    var f = color.split(","),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = parseInt(f[0].slice(4)),
      G = parseInt(f[1]),
      B = parseInt(f[2]);
    return (
      "rgb(" +
      (Math.round((t - R) * p) + R) +
      "," +
      (Math.round((t - G) * p) + G) +
      "," +
      (Math.round((t - B) * p) + B) +
      ")"
    );
  }

  const getColorForRegion = (region) => {
    let prct;
    let color;
    switch (infoMap) {
      case null:
        color = "blue";
        break;
      case "Renouvelable":
        prct =
          dataMap[region].renewable /
          (dataMap[region].renewable + dataMap[region].non_renewable);
        color = shadeRGBColor("rgb(55,189,9)", prct * 5);
        break;
      case "Consommation":
        prct =
          (dataMap[region]["consommation"] - dataMap["all"]["consommation"]) /
          dataMap["all"]["consommation"];
        color = shadeRGBColor("rgb( 222, 48, 13)", prct * 3);
        break;
    }
    return color;
  };

  const renderRegion = (region) => {
    return {
      fillColor: getColorForRegion(region.properties.nom.toLowerCase()),
      fillOpacity: 0.5,
      color: "white",
      weight: 2,
    };
  };

  let changeRegionColor = (event) => {
    let onColor = "black";
    switch (infoMap) {
      case null:
        onColor = " #0d56de";
        break;
      case "Renouvelable":
        onColor = "rgb(55,189,9)";
        break;
      case "Consommation":
        onColor = "rgb( 222, 48, 13)";
        break;
    }
    event.target.setStyle({
      fillColor: onColor,
    });
  };
  let changeBackRegionColor = (event) => {
    let color = getColorForRegion(
      event.target.feature.properties.nom.toLowerCase()
    );
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
        center={[47, 2]}
        zoomControl={false}
        maxZoom={6}
        minZoom={6}
      >
        <GeoJSON
          style={renderRegion}
          data={mapData.features}
          onEachFeature={onEachRegion}
        />
      </MapLeaf>
    </div>
  );
}

export default Map;
