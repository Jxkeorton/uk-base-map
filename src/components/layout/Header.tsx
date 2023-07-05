import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/png/MMB small logo.png';

const Header = () => {
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const showNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    showNavbar();
  };

  const navigationItems = [
    { label: 'Home', route: '/home'},
    { label: 'Map', route: '/' },
    { label: 'Profile', route: '/profile', icon: faUser },
    { label: 'Search', route: '/search-locations', icon: faSearch }
  ];

  return (
    <header>
      <h3>
        <Link to="/">
          <img src={Logo} alt="mountain man base logo" className="header-img" />
        </Link>
      </h3>
      <nav className={isNavOpen ? 'responsive_nav' : ''} ref={navRef}>
        {navigationItems.map((item, index) => (
          <p key={index} onClick={() => handleNavigate(item.route)}>
            {item.icon && <FontAwesomeIcon icon={item.icon} />} {item.label}
          </p>
        ))}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
};

export default Header;
