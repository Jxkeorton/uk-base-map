import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/png/MMB small logo.png'
import {useRef, useState} from 'react'

const Header = () => {
  const navigate = useNavigate()
  const navRef = useRef<HTMLElement>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const showNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    showNavbar();
  };

  return (
    <header>
      <h3><a href='https://www.mountainmanbase.com/'  ><img src={Logo} alt='mountain man base logo' className='header-img'/></a></h3>
      <nav className={isNavOpen ? 'responsive_nav' : ''} ref={navRef} >
          <p onClick={() => handleNavigate('/')} >Map</p>
          <p onClick={() => handleNavigate('/search-locations')} ><FontAwesomeIcon icon={faSearch} />
              {' '}Search</p>
          <p onClick={() => handleNavigate('/profile')}><FontAwesomeIcon icon={faUser} />
              {' '}Profile</p>
          <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FontAwesomeIcon icon={faTimes} />
          </button>
      </nav>
      <button className='nav-btn' onClick={showNavbar} >
      <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  )
}

export default Header
