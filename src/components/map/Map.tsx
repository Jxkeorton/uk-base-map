import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import InfoBox from './infoBox'
import { useState } from 'react';
import { googleKey } from '../../../env';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface MapProps {
  eventData: Location[];
}

const Map: React.FC<MapProps> = ({ eventData }) => {
  const [infoBox, setInfoBox] = useState<Location | null>(null);

  const markers = eventData.map((location) => {
    const { id, coordinates } = location;
    return (
      <Marker
        key={id}
        lat={coordinates[0]}
        lng={coordinates[1]}
        text={`${id + 1}`}
        onClick={() => setInfoBox(location)}
        highlighted={infoBox?.id === id}
      />
    );
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleKey }}
        defaultCenter={{ lat: 51.5074, lng: -0.1858 }}
        defaultZoom={7}
      >
        {markers}
      </GoogleMapReact>
      {infoBox && <InfoBox info={infoBox} />}
    </div>
  );
};

export default Map;

