import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SavedLocations from '../pagecomponents/SavedLocations';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.config';

interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  rockdrop: string;
}

function Profile() {
  const auth = getAuth();
  const [ filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [ fetchedData, setFetchedData] = useState<Location[]>([]);
  const [locations, setLocations] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getLocations = async () => {
      try {
          const currentUser = auth.currentUser;
          if (!currentUser) {
          console.error('No authenticated user found');
          return;
          }
          const userId: string = currentUser.uid;

          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          const userDocData = userDocSnap.data();
          const locationIds: number[] = userDocData?.locationIds || [];
          console.log('Location IDs:', locationIds);

          setLocations(locationIds)

          const response = await fetch('http://localhost:3000/locations');
          const data: Location[] = await response.json();

          setFetchedData(data)
          console.log('Fetched Data:', data);

      } catch (error) {
        console.error('Could not get locations', error);
      }
        setIsLoading(false);
      };

      getLocations();
  }, []);

  useEffect(() => {
    const filteredData = fetchedData.filter((obj: Location) => locations.includes(obj.id));
    setFilteredLocations(filteredData);

  }, [locations, fetchedData]);

  const onDelete = async (locationId: number) => {
    // Perform the delete operation here, such as updating the Firestore document
    try {
      // Delete the location using the locationId
      // Example code using Firestore
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No authenticated user found');
        return;
      }
      const userId: string = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        locationIds: arrayRemove(locationId)
      });
      console.log('Location deleted successfully');
  
      // Update the filteredLocations state by removing the deleted location
      setFilteredLocations(filteredLocations.filter((location) => location.id !== locationId));
    } catch (error) {
      console.error('Could not delete location:', error);
    }
  };

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }

  console.log('filtered locations:', filteredLocations)
  
  return (
    <>
      <div className='profile' >
          <p className='page-header'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout} >
            Logout
          </button>
      </div>
        <h2 className='Saved-locations-h2'>
          {filteredLocations.length > 0 ? 'Saved Locations' : 'Use the map to save locations' }
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <SavedLocations data={filteredLocations} onDelete={onDelete} />
        )}
    </>
  )
}

export default Profile
