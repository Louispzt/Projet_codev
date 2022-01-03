import GoogleMapReact from "google-map-react";
import "../styles/Map.css";
function Map() {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ keys: "AIzaSyDYS4oMd9QmUQDQiLZEvi5BHFTvhNqEMgs" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
