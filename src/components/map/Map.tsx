import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import InfoBox from './infoBox';
import { useState } from 'react';


interface Locations {
  eventData: any;
}

const Map: React.FC<Locations> = ({ eventData }) => {
  const [infoBox, setInfoBox] = useState<{ id: number, name: string, coordinates: [number, number] } | null>(null);


  const markers = eventData.map((ev: any) => {
    if (eventData) {
      return (
        <Marker
          key={ev.id}
          lat={ev.coordinates[0]}
          lng={ev.coordinates[1]}
          text={`${ev.id + 1}`}
          onClick={() =>
            setInfoBox({
              id: ev.id,
              name: ev.name,
              coordinates: [ev.coordinates[0], ev.coordinates[1]],
            })
          }
          highlighted={infoBox?.id === ev.id}
        />
      );
    }
    return null;
  });


console.log(infoBox)
  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA5YDarjMw4UAUSVCIrBX1PJwP14l9nqSg' }}
        defaultCenter={{ lat: 51.5074, lng: -0.1858 }} 
        defaultZoom={7} 
      >
         {markers}
      </GoogleMapReact>
      {infoBox && <InfoBox info={infoBox} />}
    </div>
  );
};

export default Map
