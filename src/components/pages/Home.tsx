import {Link} from 'react-router-dom'

function Home() {


  return (
    <div className="home-container" >

        <div className="warning-div">
          <h3>WARNING</h3>
            <p>The infomation on this guide can be innacurate and mistaken, and is only meant to help jumpers choose a location - you must be prepared to make all measurements and decisions alone. Do not rely on any information given here. Rock drops and GPS locations have the potential to be dangerously innacurate.</p>
            <p>Directions unless stated otherwise will be given from jumpers perspective.</p>
            <p>Thanks to everyone who helped compile this information!</p>
        </div>

        <Link to='/submit' className="submit-link" >
            <h2>SUBMIT A NEW EXIT</h2>
        </Link>
      
    </div>
    
  )
}

export default Home
