import Logo from '../../assets/png/MMB small logo.png';

const Footer = () => {
  const hoursOfOperation = [
    'Mon-Thu: 9AM to 8PM',
    'Friday: 9AM to 5PM',
    'Sat-Sun: Jumping!'
  ];

  const contactEmail = 'info@mountainmanbase.com';

  const menuLinks = [
    { label: 'Home', url: 'https://www.mountainmanbase.com/' },
    { label: 'Learn to Base', url: 'https://www.mountainmanbase.com/learn-to-base' },
    { label: 'Media', url: 'https://www.mountainmanbase.com/media' },
    { label: 'Events', url: 'https://www.mountainmanbase.com/high-performance' }
  ];

  return (
    <footer className="footer">
      <div className="contain">
        <div className="col">
          <img src={Logo} alt='mountain man base logo' className='footer-img' />
          <ul>
            <li>© 2023 by Apex</li>
          </ul>
        </div>

        <div className="col">
          <h1>Hours of operation</h1>
          <ul>
            {hoursOfOperation.map((hours, index) => (
              <li key={index}>{hours}</li>
            ))}
          </ul>
        </div>

        <div className="col">
          <h1>Contact us</h1>
          <ul>
            <li>
              <a className="f-a" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </li>
          </ul>
        </div>

        <div className="col">
          <h1>Menu</h1>
          <nav>
            <ul>
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a className="f-a" href={link.url} aria-label={link.label}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="clearfix"></div>
      </div>
    </footer>
  );
};

export default Footer;
