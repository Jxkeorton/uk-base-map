import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  displayName: string | null;
  email: string | null;
}

function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState<UserProfile | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName ?? null,
        email: currentUser.email ?? null,
      });
    }
  }, [auth]);

  const { displayName, email } = formData || {};

  const onLogout = () => {
    auth.signOut();
    navigate('/');
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
          <p>Display Name: {displayName}</p>
          <p>Email: {email}</p>
        </div>
      )}
    </div>
  )
}

export default Profile
