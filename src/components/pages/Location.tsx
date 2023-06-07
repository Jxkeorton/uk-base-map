import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  rockdrop: string;
}

function Location() {
  const [location, setLocation] = useState<Location |null>(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

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

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div className='profile'>
      <h1>{location?.name}</h1>
      <p>{location?.coordinates.join(', ')}</p>
    </div>
  )
}

export default Location
