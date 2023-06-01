import {Navigate, Outlet} from 'react-router-dom'
import useAuthStatus from "../hooks/useAuthStatus"
import Loader from '../assets/Loader/Loader'

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if(checkingStatus) {
    return <Loader />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/log-in' replace/>
}

export default PrivateRoute
