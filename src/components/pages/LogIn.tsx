import { useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'

function LogIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
    const auth = getAuth()

    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    if(userCredential.user) {
      navigate('/')
    }
      
    } catch (error) {
      toast.error('Bad user credentials')
    }

    
  }

  return (
    <>
      <div className="log-in-container">
      <header className="log-in-header">
        <p className='log-in-title' >Log In</p>
      </header>

      <form className="log-in-form" onSubmit={onSubmit} >
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

        <Link to="/forgot-password" className="log-in-forgot-password">
          Forgot Password
        </Link>
        <Link to='/register' className='log-in-register-link' >
        Register
        </Link>

        <div className="log-in-bar">
          <button className="log-in-button">
            Log In
          </button>
        </div>
      </form>
      </div>
    </>
  )
}

export default LogIn
