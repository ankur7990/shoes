import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import ApiHelper from "../api/ApiHelper";
// import authService from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setToken(null);
    setUser(null);
  };

  // -----------------------------
  // FETCH PROFILE
  // -----------------------------
  const fetchProfile = async () => {
    try {
      const response = await ApiHelper.getUserProfile();

      setUser(response.data);
    } catch (error) {
      console.log(error);

      logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
