import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {  doc, getDoc, collection, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';

interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  rockdrop: string;
  total: string;
}

interface Comment {
  comment: string;
  userId: string;
  displayName: string;
}

interface MoreData {
  ID: string;
  Notes: string;
  imageUrls: string[];
  comments: Comment[];
}

function Location() {
  const [location, setLocation] = useState<Location |null>(null)
  const [moreData, setMoreData] = useState<MoreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');

  const params = useParams()
  const auth = getAuth();


  // use effect to fetch location from json-server

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://localhost:3000/locations/${params.locationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        console.log(data)
        setLocation(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching location:', error);
        setLoading(false);
      }
    };

    fetchLocation()
  },[params.locationId])

  // add comment 

  const addComment = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User is not authenticated');
      }
      
      const displayName = currentUser.displayName;
      const userId = currentUser.uid;
  
      const collectionRef = collection(db, 'locations');
      const locationRef = doc(collectionRef, params.locationId);
      const docSnap = await getDoc(locationRef);

      if (docSnap.exists()) {
        const locationData = docSnap.data() as MoreData;
        let updatedComments;
  
        if (locationData.comments) {
          updatedComments = [
            ...locationData.comments,
            { 
              comment: comment,
              userId: currentUser.uid, 
              displayName: currentUser.displayName ?? '',
            }
          ];
        } else {
          updatedComments = [
            { 
              comment: comment,
              userId: currentUser.uid, 
              displayName: currentUser.displayName ?? '',
            }
          ];
        }
  
        await updateDoc(locationRef, { comments: updatedComments });
  
        setComments(updatedComments);
        setComment('');
      } else {
        await setDoc(locationRef, { comments: [{ comment, userId, displayName }] });
  
        setComments([
          {
            comment: comment,
            userId: currentUser.uid,
            displayName: currentUser.displayName ?? '',
          },
        ]);
        setComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // use effect to fetch same location from firebase for the images/comments and more info

  useEffect(() => {
    const fetchFromFirebase = async () => {
      const collectionRef = collection(db, 'locations');
      const docRef = doc(collectionRef, params.locationId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMoreData(docSnap.data() as MoreData)
        const locationData = docSnap.data() as MoreData
        setComments(locationData.comments || [])
        setLoading(false)
    }
  }

    fetchFromFirebase()
  },[params.locationId])

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div className='LocationPageContainer'>
      <h1>{location?.name}</h1>
      <p>{location?.coordinates.join(', ')}</p>
    
      {moreData ? (
        <img className="locationImage" src={moreData.imageUrls[0]} alt="Location Image" />
      ) : (
        <p>No image available</p>
      )}

      <div className="notes-container">
        <div>
          <p>Rockdrop: {location?.rockdrop}ft</p>
        </div>
        <div>
          <p>Total: {location?.total}ft</p>
        </div>
        <h4>Notes...</h4>
        <p className="notes">{moreData?.Notes}</p>
      </div>

      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.displayName}: </strong>
              {comment.comment}
            </li>
          ))}
        </ul>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>

    </div>
  )
}

export default Location
