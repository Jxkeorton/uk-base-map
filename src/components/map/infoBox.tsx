import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface InfoBoxProps {
  info: {
    id: string;
    name: string;
    coordinates: [number, number];
  };
}

const InfoBox: React.FC<InfoBoxProps> = ({ info }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      setIsLoggedIn(currentUser !== null);
    };

    checkUserLoggedIn();
  }, []);

  useEffect(() => {
    const checkLocationSaved = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error('No authenticated user found');
          return;
        }
        const userId: string = currentUser.uid;

        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        const userDocData = userDocSnap.data();
        const { locationIds = [] } = userDocData || {};

        setIsSaved(locationIds.includes(info.id));
      } catch (error) {
        console.error('Error checking if location saved:', error);
      }
    };

    checkLocationSaved();
  }, [info.id]);

  const onClick = async () => {
    if (!isLoggedIn) {
      console.error('No authenticated user found');
      return;
    }

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No authenticated user found');
        return;
      }
      const userId: string = currentUser.uid;

      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      const userDocData = userDocSnap.data();
      const { locationIds = [] } = userDocData || {};

      // checking if ID already exists
      if (locationIds.includes(info.id)) {
        // Remove the location ID from the array
        await updateDoc(userDocRef, { locationIds: arrayRemove(info.id) });
        console.log('Location ID removed from user document');
        toast.success('Location removed')
        setIsSaved(false)
      } else {
        // Add the location ID to the array
        await setDoc(userDocRef, { locationIds: arrayUnion(info.id) }, {merge:true});
        console.log('Location ID added to user document');
        toast.success('Location Saved')
        setIsSaved(true)
      }
    } catch (error) {
        toast.error('Could not toggle Location');
    } 
  }


  return (
    <div className="infoBox" >
      <h2><strong>{ info.name.toUpperCase() }</strong></h2>
      <ul>
        <li><strong>{ info.coordinates[0] }, {info.coordinates[1]}</strong></li>
      </ul>
      <div className='buttonsContainer'>
        {isLoggedIn && (
          isSaved ? 
            <button onClick={onClick} className='infoBox-button-unsave'><p>Unsave</p></button>
            :
            <button onClick={onClick} className='infoBox-button-save'><p>Save</p></button>
        )}
        <Link to={`/location/${info.id}`} >
          <button className='infoBoxMore' ><p>Details</p></button>
        </Link>
      </div>
    </div>
  )
}

export default InfoBox
