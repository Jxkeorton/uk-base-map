import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Map from './components/map/Map'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Register from './components/pages/Register'
import LogIn from './components/pages/LogIn'
import ForgotPassword from './components/pages/ForgotPassword'
import Location from './components/pages/Location'
import Profile from './components/pages/Profile'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute'

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
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Map eventData={eventData} />} />
          <Route path='location' element={<Location />} />
          <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/log-in' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Header />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
         />
      <Footer />
    </>
  )
}

export default App
