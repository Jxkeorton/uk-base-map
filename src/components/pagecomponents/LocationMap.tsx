import GoogleMapReact, { MapOptions } from 'google-map-react';
import Marker from '../map/Marker';
import { googleKey } from '../../../env';

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
    <div className='LocationPageMap' >
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleKey }}
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
