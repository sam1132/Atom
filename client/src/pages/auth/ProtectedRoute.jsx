import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
