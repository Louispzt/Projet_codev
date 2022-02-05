import mapData from "./../data/regionsFrance.json";
import { MapContainer as MapLeaf, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

function Map() {
    let countryStyle =  {
        fillColor:"red",
    }
    return (
        <div className={"mapDiv"}>
            <h1>Map</h1>
            <MapLeaf className={"mapLeaf"} zoom={7} center={[46, 4]}>
                <GeoJSON style={countryStyle} data={mapData.features}/>
            </MapLeaf>
        </div>
    );
}

export default Map;
