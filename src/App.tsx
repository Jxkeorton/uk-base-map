import Map from './components/map/Map'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { useState, useEffect } from 'react'
import Loader from './assets/Loader/Loader'

interface Locations {
  id: number;
  name: string;
  coordinates: [number, number];
  rockdrop: string;
}

const fetchData = async (): Promise<Locations[]> => {
  try {
    const response = await fetch('http://localhost:3000/locations'); 
    const data = await response.json();
    const locations: Locations[] = data;

    return locations;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

function App() {
  const [eventData, setEventData] = useState<Locations[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true)
      const locations = await fetchData();

      setEventData(locations);
      setLoading(false);
    };

    fetchLocations();
  }, []);
    

  console.log(eventData)
  return (
    <div>
      <Header />
      { !loading ? <Map eventData={eventData} /> : <Loader /> }
      <Footer />
    </div>
  )
}

export default App
