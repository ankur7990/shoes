import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import ApiHelper from "../api/ApiHelper";
// import authService from "../api/authService";
import { getUserProfile } from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getStoredUser = () => {
    try {
      const user = localStorage.getItem("user");

      return user && user !== "undefined" ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  };
  const [user, setUser] = useState(getStoredUser());
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
      // console.log("PROFILE RESPONSE:", response.data);
      setUser(response.data.data);
      // store full user object
      localStorage.setItem("user", JSON.stringify(response.data.data));
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
  }, [token]);
  return (
    <AuthContext.Provider
      value={{ token, login, logout, user, loading, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
