import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SavedLocations from '../pagecomponents/SavedLocations';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config'

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

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }

  const name: string | null = auth.currentUser?.displayName || null;
  const email: string | null = auth.currentUser?.email || null

  console.log('filtered locations:', filteredLocations)
  
  return (
    <div className='profile' >
      <header className="profile-header">
        <p className='page-header'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout} >
          Logout
        </button>
      </header>
      {name && (
        <div className="profile-info">
          <p>Display Name: {name}</p>
          <p>Email: {email}</p>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SavedLocations data={filteredLocations} />
      )}
    </div>
  )
}

export default Profile
