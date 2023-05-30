import { useNavigate, useLocation } from 'react-router-dom'


const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
      if(route === location.pathname) {
          return true
      }
  }

  return (
    <nav className="header" >
        <ul className="h-ul" >
            <li className="h-li" onClick={() => navigate('/')} >
              <p className="h-a" >Map</p>
            </li>
            <li className="h-li" onClick={() => navigate('/profile')} >
              <p className="h-a" >Profile</p>
            </li>
            <li className="h-li" onClick={() => navigate('/log-in')} >
              <p className="h-a" >Log In</p>
            </li>
        </ul>
    </nav>
  )
}

export default Header
