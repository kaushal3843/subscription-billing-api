import { Navigate, Outlet } from "react-router-dom"
import { isLoggedIn } from "../utils/token"

const ProtectedRoute = () => {
  const authenticated = isLoggedIn()

  if (!authenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute