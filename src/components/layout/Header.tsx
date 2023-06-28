import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/png/MMB small logo.png'

const Header = () => {
  const navigate = useNavigate()

  return (
    <nav className="header" >
        <ul className="h-ul" >
            <li className='h-li'>
              <a href='https://www.mountainmanbase.com/'  ><img src={Logo} alt='mountain man base logo' className='header-img'/></a>
            </li>
            <li className="h-li" onClick={() => navigate('/')} >
              <p className="h-a" >UK BASE Map</p>
            </li>
            <li className='h-li' onClick={() => navigate('/search-locations')} >
              <p className="h-a">Search</p>
            </li>
            <li className="profile-link" onClick={() => navigate('/profile')} >
              <p className="h-a" >Profile</p>
            </li>
        </ul>
    </nav>
  )
}

export default Header
