import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import ApiHelper from "../api/ApiHelper";
// import authService from "../api/authService";
import { getUserProfile } from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null,
  );

  // -------------------------------
  // LOGIN
  // -------------------------------

  const login = async (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    setToken(accessToken);
    await fetchProfile();
  };

  // -------------------------------
  // LOGOUT
  // -------------------------------
  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // -----------------------------
  // FETCH PROFILE
  // -----------------------------
  const fetchProfile = async () => {
    try {
      const response = await getUserProfile();

      setUser(response.data);
      // store full user object
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);

      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ token, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
