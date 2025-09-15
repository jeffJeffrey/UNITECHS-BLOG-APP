import { useAuth } from "../hooks/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
export default ProtectedRoute;