// RootRedirect.jsx

import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const token = localStorage.getItem("accessToken");

  return token ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RootRedirect;
