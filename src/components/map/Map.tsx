import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import InfoBox from './infoBox';
import { useState, useEffect } from 'react';
import { googleKey } from '../../../env';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';

interface Locations {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface MapProps {
  eventData: Locations[];
}

const Map: React.FC<MapProps> = ({ eventData }) => {
  const [infoBox, setInfoBox] = useState<Locations | null>(null);
  const [isSaved, setIsSaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLocationSaved = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error('No authenticated user found');
          setLoading(false);
          return;
        }
        const userId: string = currentUser.uid;

        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        const userDocData = userDocSnap.data();
        const { locationIds = [] } = userDocData || {};

        setIsSaved(locationIds);
        setLoading(false);
      } catch (error) {
        console.error('Error checking if location saved:', error);
      }
    };

    checkLocationSaved();
  }, []);

  const handleLocationSaved = (locationId: string, isSaved: boolean) => {
    setIsSaved((prevIsSaved) => {
      if (isSaved) {
        // Add the location ID to the array
        return [...prevIsSaved, locationId];
      } else {
        // Remove the location ID from the array
        return prevIsSaved.filter((id) => id !== locationId);
      }
    });

    // Save the updated isSaved state to local storage
    localStorage.setItem('savedLocations', JSON.stringify(isSaved));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const markers = eventData.map((location) => {
    const { id, coordinates } = location;
    const isMarkerSaved = isSaved.includes(id);
    return (
      <Marker
        key={id}
        lat={coordinates[0]}
        lng={coordinates[1]}
        text={`${id + 1}`}
        onClick={() => setInfoBox(location)}
        highlighted={infoBox?.id === id}
        isSaved={isMarkerSaved}
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
      {infoBox && <InfoBox info={infoBox} onLocationSaved={handleLocationSaved} />}
    </div>
  );
};

export default Map;
