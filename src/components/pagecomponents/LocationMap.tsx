import GoogleMapReact, { MapOptions } from 'google-map-react';
import Marker from '../map/Marker';

interface MapProps {
    center: { lat: number; lng: number };
    zoom: number;
    text: string;
}

// Map component
const Map: React.FC<MapProps> = ({ center, zoom, text }) => {
    const mapOptions: MapOptions = {
        mapTypeId: 'satellite',
      };
  
  return (
    <div style={{ height: '400px', width: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA5YDarjMw4UAUSVCIrBX1PJwP14l9nqSg' }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={mapOptions}
      >
        <Marker lat={center.lat} lng={center.lng} text={text} onClick={() => {}} highlighted={true}/>
      </GoogleMapReact>
    </div>
  );
};

export default Map;
