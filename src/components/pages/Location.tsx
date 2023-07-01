import { useState, useEffect } from 'react'
import { Link, useParams  } from 'react-router-dom';
import { doc, getDoc, collection, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';
import { PacmanLoader } from 'react-spinners';
import LocationMap from '../pagecomponents/LocationMap'
import { apiUrl } from '../../../env';
import {toast} from 'react-toastify'
import Filter from 'bad-words'

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
  const currentUser = auth.currentUser;
  const collectionRef = collection(db, 'locations');
  const locationRef = doc(collectionRef, params.locationId);

  const filter = new Filter();

  // use effect to fetch location from json-server

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/${params.locationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        console.log(data);
        setLocation(data);
      } catch (error) {
        toast.error('Error fetching location:');
      }

      try {
        const collectionRef = collection(db, 'locations');
        const docRef = doc(collectionRef, params.locationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const locationData = docSnap.data() as MoreData;
          setMoreData(locationData);
          setComments(locationData.comments || []);
        }
      } catch (error) {
        toast.error('Error fetching additional data:');
      }

      setLoading(false);
    };

    fetchData();

    // Set up Firestore listener for comments
    const unsubscribe = onSnapshot(locationRef, (docSnap) => {
      if (docSnap.exists()) {
        const locationData = docSnap.data() as MoreData;
        setMoreData(locationData);
        setComments(locationData.comments || []);
      }
    });

    return () => {
      // Clean up the listener on unmount
      unsubscribe();
    };

  }, [params.locationId]);

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
      toast.error('Error adding comment:');
    }
  };
  
  const override: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  };

  if(loading) {
    return <PacmanLoader color="black" cssOverride={override} />
  }

  return (
    <div className='LocationPageContainer'>

    <Link to="/">
      <button className='back-to-map-btn'>BACK TO MAP</button>
    </Link>
    
      {location ? (
        <>
          <h1>{location.name}</h1>
          <p>{location.coordinates.join(', ')}</p>
          <LocationMap text={`${location.id + 1}`} center={{ lat: location?.coordinates[0], lng: location?.coordinates[1] }} zoom={15}/>
        </> 
      ):( <p>Could not load Location</p>)}
      
      <div className="notes-container">
        <div>
          <p><strong>Rockdrop:</strong> {location?.rockdrop}ft</p>
        </div>
        <div>
          <p><strong>Total:</strong> {location?.total}ft</p>
        </div>
        <h4>Notes</h4>
        <p className="notes">{moreData?.Notes}</p>
      </div>

      <div>
        {comments.length > 0 ? (<h2>Comments</h2>) : (<h2>No comments yet</h2>)}
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.displayName}: </strong>
              {comment.comment ? filter.clean(comment.comment) : ''}
            </li>
          ))}
        </ul>
        {currentUser && (
        <div>
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
      )}
      </div>

    </div>
  )
}

export default Location
