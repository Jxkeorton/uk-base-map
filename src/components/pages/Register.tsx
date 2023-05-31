import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {email, password, name} = formData

  const navigate = useNavigate()

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className="log-in-container">
      <header className="log-in-header">
        <p className='log-in-title' >Register</p>
      </header>

      <form className="log-in-form">
      <div className='input-wrapper'>
        <input
          type="text"
          className="log-in-input"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onChange}
        />
        </div>

        <div className='input-wrapper'>
        <input
          type="email"
          className="log-in-input"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        </div>
    
        <div className="log-in-password">
          <input
            type={showPassword ? 'text' : 'password'}
            className="log-in-input"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <img
            src={visibilityIcon}
            alt="show password"
            className="log-in-show-password"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <Link to='/log-in' className='log-in-register-link' >
        Alreday have an account ? Log In
        </Link>

        <div className="log-in-bar">
          <button className="log-in-button">
            Register
          </button>
        </div>
      </form>

      
      </div>
    </>
  )
}

export default Register
