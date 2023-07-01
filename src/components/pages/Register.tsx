import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../firebase.config';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import { toast } from 'react-toastify';
import OAuth from '../OAuth';
import PacmanLoader from 'react-spinners/PacmanLoader';


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
  const [isLoading, setIsLoading] = useState(false)

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const auth = getAuth(app);

      setIsLoading(true)
      const db = getFirestore(app)

      // Check if display name already exists
      const displayNamesRef = collection(db, 'users');
      const querySnapshot = await getDocs(query(displayNamesRef, where('name', '==', name)));

    if (!querySnapshot.empty) {
      toast.error('Username is already in use');
      setIsLoading(false);
      return;
    }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user: FirebaseUser | null = userCredential.user;

      if (auth.currentUser !== null) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      const { password: _, ...formDataCopy } = formData;
      formDataCopy.timestamp = serverTimestamp();

      
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      setIsLoading(false)

      navigate('/profile');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email address is already in use');
      } else {
        toast.error('Something went wrong with registration');
      }
      setIsLoading(false);
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
          placeholder="Username"
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
        Already have an account ? Log In
        </Link>

        <div className="log-in-bar">
            {isLoading ? (
              <PacmanLoader color="black"/>
            ) : (
          <button className="log-in-button">
            Register
          </button>)}
        </div>
      </form>

      <OAuth />

      </div>
    </>
  )
}

export default Register
