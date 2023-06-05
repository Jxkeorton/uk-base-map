import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.config';
import {toast} from 'react-toastify'
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

interface Locations {
    info: any;
  }

const InfoBox: React.FC<Locations>  = ({ info }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if the location ID is already saved by the user
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
        const locationIds: string[] = userDocData?.locationIds || [];

        setIsSaved(locationIds.includes(info.id));
      } catch (error) {
        console.error('Error checking if location saved: ', error);
      }
    };

    checkLocationSaved();
  }, [info.id]);

  const onClick = async () => {
    try {
      // Get the current user
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // null check
      if (!currentUser) {
        console.error('No authenticated user found');
        return;
      }
      const userId: string = currentUser.uid;

      // Get the user document from the "users" collection
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      // Update the location IDs array in the user document
      const userDocData = userDocSnap.data();
      const locationIds: string[] = userDocData?.locationIds || [];

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
      <h2>Location</h2>
      <ul>
        <li>ID: <strong>{ info.id }</strong></li>
        <li>TITLE: <strong>{ info.name }</strong></li>
        <li>COORDINATES: <strong>{ info.coordinates[0] }, {info.coordinates[1]}</strong></li>
      </ul>
      {isSaved ? 
        <button onClick={onClick} className='infoBox-button-unsave'><p>Unsave</p></button>
        :
        <button onClick={onClick} className='infoBox-button-save'><p>Save</p></button>
      }
    </div>
  )
}

export default InfoBox
