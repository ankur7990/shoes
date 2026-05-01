// 👉 If logged in → redirect /home
// 👉 Else → allow access

import { Navigate } from "react-router-dom";

const AuthRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default AuthRoutes;
