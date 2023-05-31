import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser  } from 'firebase/auth';
import app from '../../firebase.config';
import { setDoc, doc, serverTimestamp, getFirestore } from 'firebase/firestore';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';

type FormData = {
  name: string;
  email: string;
  password: string;
  timestamp?: unknown;
};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    timestamp: null,
  });
  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user: FirebaseUser | null = userCredential.user;

      if (auth.currentUser !== null) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      const { password: _, ...formDataCopy } = formData;
      formDataCopy.timestamp = serverTimestamp();

      const db = getFirestore(app);
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="log-in-container">
      <header className="log-in-header">
        <p className='log-in-title' >Register</p>
      </header>

      <form className="log-in-form" onSubmit={onSubmit} >
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
