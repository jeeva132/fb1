import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};
