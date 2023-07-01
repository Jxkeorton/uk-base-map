import {Navigate, Outlet} from 'react-router-dom'
import useAuthStatus from "../hooks/useAuthStatus"
import { PacmanLoader } from 'react-spinners';

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus()

  const override: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  };

  if(checkingStatus) {
    return <PacmanLoader color='black' cssOverride={override} />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/log-in' replace/>
}

export default PrivateRoute
