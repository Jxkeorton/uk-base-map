const Footer = () => {
  return (
    <div className="footer">
    <div className="contain">
        <div className="col">
        <h1>LOGO HERE</h1>
        <ul>
            <li>© 2023 by Apex</li>
        </ul>
        </div>

        <div className="col">
        <h1>Hours of operation</h1>
        <ul>
            <li>Mon-Thu: 9AM to 8PM</li>
            <li>Friday: 9AM to 5PM</li>
            <li>Sat-Sun: Jumping!</li>
        </ul>
        </div>
        
        <div className="col">
        <h1>Contact us</h1>
        <ul>
            <li><a className="f-a" href="mailto:info@mountainmanbase.com" >info@mountainmanbase.com</a></li>
        </ul>
        </div>

        <div className="col">
            <h1>Menu</h1>
            <ul>
                <li><a className="f-a" href="https://www.mountainmanbase.com/">Home</a></li>
                <li><a className="f-a" href="https://www.mountainmanbase.com/learn-to-base" >Learn to Base</a></li>
                <li><a className="f-a" href="https://www.mountainmanbase.com/media" >Media</a></li>
                <li><a className="f-a" href="https://www.mountainmanbase.com/high-performance" >Events</a></li>
            </ul>
        </div>

        <div className="clearfix"></div>
    </div>
  </div>
  )
}

export default Footer
