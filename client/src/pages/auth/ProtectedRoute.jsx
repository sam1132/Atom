import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context";

const ProtectedRoute = () => {
  const { currentUser, backendUser } = useAuth();
  
  if (!currentUser) return <Navigate to="/login" />;
  if (!backendUser?.displayName) return <Navigate to="/setup-profile" />;
  
  return <Outlet />;
};

export default ProtectedRoute;