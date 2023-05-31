import { getAuth, User as FirebaseUser } from 'firebase/auth'
import { useState, useEffect } from 'react'

function Profile() {
    const [user, setUser] = useState<FirebaseUser | null>(null)

    const auth = getAuth()

    useEffect(() => {
        setUser(auth.currentUser)
    },[])


  return user ? <h1>{user.displayName}</h1> : <div>Not logged in</div>
}

export default Profile
