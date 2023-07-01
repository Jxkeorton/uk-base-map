import { useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'
import OAuth from '../OAuth'
import PacmanLoader from 'react-spinners/PacmanLoader'

function LogIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      emailError: '',
      passwordError: '',
    };
  
    // Validate email
    if (!email) {
      isValid = false;
      errors.emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.emailError = 'Email is invalid';
    }
  
    // Validate password
    if (!password) {
      isValid = false;
      errors.passwordError = 'Password is required';
    }
  
    setFormErrors(errors);
    return isValid;
  };

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

    if (!validateForm()) {
      return;
    }

    try {
    const auth = getAuth()

    setIsLoading(true)

    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    if(userCredential.user) {
      navigate('/')
    }
    setIsLoading(false)
      
    } catch (error:any) {
      const errorCode = error.code;

    if (errorCode === 'auth/user-not-found') {
      toast.error('Email not registered');
    } else {
      toast.error('Bad user credentials');
    }

    setIsLoading(false);
    }
  };

  return (
    <>
      <div className="log-in-container">
      <header className="log-in-header">
        <p className='log-in-title' >Log In</p>
      </header>

      <form className="log-in-form" onSubmit={onSubmit} >
      <div className='input-wrapper'>
        <input
          type='email'
          className='log-in-input'
          placeholder='Email'
          id='email'
          value={email}
          onChange={onChange}
        />
        {formErrors.emailError && <span className='error-message'>{formErrors.emailError}</span>}
      </div>

      <div className='log-in-password'>
        <input
          type={showPassword ? 'text' : 'password'}
          className='log-in-input'
          placeholder='Password'
          id='password'
          value={password}
          onChange={onChange}
        />
        {formErrors.passwordError && <span className='error-message'>{formErrors.passwordError}</span>}
        <img
          src={visibilityIcon}
          alt='show password'
          className='log-in-show-password'
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
        {isLoading ? (
              <PacmanLoader color="black"/>
            ) : (
          <button className="log-in-button">
            Log In
          </button> )}
        </div>
      </form>

      <OAuth />

      </div>
    </>
  )
}

export default LogIn
