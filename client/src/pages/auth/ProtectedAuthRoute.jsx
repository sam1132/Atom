import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context";

export const ProtectedAuthRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
