import { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { PacmanLoader } from 'react-spinners';

function ForgotPassword() {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      setIsLoading(true);

      await sendPasswordResetEmail(auth, email)
      setIsLoading(false);

      toast.success('Email was sent')
    } catch (error) {
      setIsLoading(false);
      toast.error('Could not send reset email')
    }
  }

  return (
    <>
      <div className="log-in-container">
      <header className="log-in-header">
        <p className='log-in-title' >Password Reset</p>
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
          

        <Link to="/log-in" className="log-in-forgot-password">
          Log In
        </Link>

        <div className="log-in-bar">
            {isLoading ? (
              <PacmanLoader color="black"/>
            ) : (
              <button className="log-in-button">Send Reset Email</button>
            )}

        </div>
      </form>
      </div>
    </>
  )
}

export default ForgotPassword
