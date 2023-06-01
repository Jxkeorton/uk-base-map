import { getAuth, User as FirebaseUser,  onAuthStateChanged} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'

interface CustomUser extends FirebaseUser {
  displayName: string | null;
  email: string | null;
}

function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState<CustomUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({
          displayName: user.displayName ?? null,
          email: user.email ?? null,
        } as CustomUser | null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  } 


  return (
    <div className='profile' >
      <header className="profile-header">
        <p className='page-header'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout} >
          Logout
        </button>
      </header>
      {formData && (
        <div className="profile-info">
          <p>Display Name: {formData.displayName}</p>
          <p>Email: {formData.email}</p>
        </div>
      )}
    </div>
  )
}

export default Profile
