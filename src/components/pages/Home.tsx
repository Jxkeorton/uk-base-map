import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { storage } from "../../firebase.config";
import { ref, getDownloadURL } from "firebase/storage";



function Home() {

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // Example: Download an image from Firebase Storage
    const downloadImages = async () => {
      try {
        const imagePaths = ['home/banner.jpg', 'home/fave shot 2.jpg', 'home/fave shot 3.jpg','home/fave shot 4.jpg','home/fave shot 5.jpg', 'home/fave shot 6.jpg','home/fave shot 7.jpg'];
        const promises = imagePaths.map(async (path) => {
          const fileRef = ref(storage, path);
          const downloadUrl = await getDownloadURL(fileRef);
          return downloadUrl;
        });
        const urls = await Promise.all(promises);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error downloading images:', error);
      }
    };

    downloadImages();
  }, []);
  
  return (

    <div className="home-container">
      
        <div className="warning-div">
          <div className='overlay' >
            <h3>WARNING</h3>
            <p>The information on this guide can be inaccurate and mistaken, and is only meant to help jumpers choose a location - you must be prepared to make all measurements and decisions alone. Do not rely on any information given here. Rock drops and GPS locations have the potential to be dangerously inaccurate.</p>
            <p>Directions unless stated otherwise will be given from the jumper's perspective.</p>
            <p>Thanks to everyone who helped compile this information!</p>
            <Link to='/submit' className="submit-link">
                <h2>SUBMIT A NEW EXIT</h2>
            </Link>
          </div>
          
        </div>
      
    
      <h2 className='gallery-title'>Photography by Dave Gallagher</h2>

      
      <div id='gallery'>
        <img src={imageUrls[1]} alt='' />
        <img src={imageUrls[2]} alt=''/>
        <img src={imageUrls[3]} alt=''/>
        <img src={imageUrls[4]} alt=''/>
        <img src={imageUrls[5]} alt=''/>
        <img src={imageUrls[6]} alt=''/>
      </div>
      
      
    </div>
  );
}

export default Home;
