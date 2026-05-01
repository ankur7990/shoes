// 👉 If logged in → redirect /home
// 👉 Else → allow access

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRoutes = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default AuthRoutes;
