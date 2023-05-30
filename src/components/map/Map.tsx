import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

interface Locations {
  eventData: any;
}

const Map: React.FC<Locations> = ({ eventData }) => {
  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA5YDarjMw4UAUSVCIrBX1PJwP14l9nqSg' }}
        defaultCenter={{ lat: 51.5074, lng: -0.1858 }} 
        defaultZoom={7} 
      >
        {eventData.map((ev: any) => (
          <Marker
            key={ev.id}
            lat={ev.coordinates[0]} // Latitude from the coordinate array
            lng={ev.coordinates[1]} // Longitude from the coordinate array
            text={`Pin ${ev.id + 1}`} // Text to display on the marker
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map
