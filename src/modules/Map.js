import mapData from "./../data/regionsFrance.json";
import { MapContainer as MapLeaf, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

function Map() {
    let countryStyle =  {
        fillColor:"red",
        fillOpacity:0.5,
        color:"white",
        weight:2
    };
    const color = "red";
    const onColor = "#FF583B";

    let changeRegionColor = (event) =>{
        event.target.setStyle({
            fillColor:onColor
        })
    }
    let changeBackRegionColor = (event) =>{
        event.target.setStyle({
            fillColor:color
        })
    }

    let logRegionName = (event) => {
        console.log(event.target.feature.properties.nom)
    }

    let onEachRegion;
    onEachRegion=(region,layer)=>{
        const regionName = region.properties.nom;
        layer.on({
            mouseover: changeRegionColor,
            mouseout: changeBackRegionColor,
            click : logRegionName
        })
        layer.bindPopup(regionName)
    }

    return (
        <div className={"mapDiv"}>
            <h1>Map</h1>
            <MapLeaf className={"mapLeaf"} zoom={7} center={[46, 4]}>
                <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachRegion}/>
            </MapLeaf>
        </div>
    );
}

export default Map;
