import { useNavigate } from 'react-router-dom'


const Header = () => {
  const navigate = useNavigate()

  return (
    <nav className="header" >
        <ul className="h-ul" >
            <li className="h-li" onClick={() => navigate('/')} >
              <p className="h-a" >Map</p>
            </li>
            <li className="h-li" onClick={() => navigate('/profile')} >
              <p className="h-a" >Profile</p>
            </li>
        </ul>
    </nav>
  )
}

export default Header
