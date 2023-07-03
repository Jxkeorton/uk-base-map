import { useState, useEffect } from 'react'
import { useParams  } from 'react-router-dom';
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
  details: {
    rockdrop: string;
    total: string;
    notes: string;
    access: string;
    anchor: string;
    cliffAspect: string;
  };
  openedBy: {
    name: string;
    date: string;
  };
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

  const handleGoogleMapsClick = () => {
    const [latitude, longitude] = location?.coordinates ?? [];

    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, '_blank');
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
  <div className="container">
    <h1 className="title">{location?.name.toUpperCase()}</h1>
    <p className='paragraph'><strong>Opened by: </strong>
    {location?.openedBy.name ? (
          <span className="value">{location.openedBy.name.toUpperCase()}</span>
          ) : (
          <span className="value">?</span>
          )}
    </p>
    <p className='paragraph'><strong>Date: </strong> 
    {location?.openedBy.date ? (
          <span className="value">{location.openedBy.date}</span>
          ) : (
          <span className="value">?</span>
          )}
    </p>

    {location ? (<LocationMap
      text={`${location.id + 1}`}
      center={{ lat: location.coordinates[0], lng: location.coordinates[1] }}
      zoom={15}
    />):(<h1>Could Not Load Location</h1>) }

    <div className="button-container" ><button  className='go-to-google-button' onClick={handleGoogleMapsClick}>Open in Google Maps</button></div>
    

    <div className="location-details">
      <h2 className="subtitle">Location Details</h2>
      <ul>
        <li>
          <strong>ROCKDROP: </strong>
          {location?.details.rockdrop ? (
          <h2 className="value">{location?.details.rockdrop}ft</h2>
          ) : (
          <h2 className="value">?</h2>
          )}
        </li>
        <li>
          <strong>TOTAL: </strong> 
          {location?.details.total ? (
          <h2 className="value">{location?.details.total}ft</h2>
          ) : (
          <h2 className="value">?</h2>
          )}
        </li>
        <li>
          <strong>CLIFF ASPECT: </strong>
          {location?.details.cliffAspect ? (
          <h2 className="value">{location?.details.cliffAspect}</h2>
          ) : (
          <h2 className="value">?</h2>
          )}
        </li>
        <li>
          <strong>ANCHOR: </strong>
          {location?.details.anchor ? (
          <h2 className="value">{location?.details.anchor}</h2>
          ) : (
          <h2 className="value">?</h2>
          )}
        </li>
        <li>
          <strong>ACCESS: </strong>
          {location?.details.access ? (
          <p className="value">{location.details.access}</p>
          ) : (
          <p className="value">?</p>
          )}
        </li>
        <li>
          <strong>NOTES: </strong>
          {location?.details.notes ? (
          <p className="value">{location.details.notes}</p>
          ) : (
          <p className="value">?</p>
          )}
        </li>
      </ul>
    </div>

    <div className="comments">
      <h2 className="subtitle">Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.displayName}: </strong>
            <span className="value">{comment.comment ? filter.clean(comment.comment) : ''}</span>
          </li>
        ))}
      </ul>
      {currentUser && (
        <div className="add-comment">
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button onClick={addComment}>Add Comment</button>
        </div>
      )}
    </div>
  </div>

  )
}

export default Location
