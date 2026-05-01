import React from "react";
import axios from "axios";

const ApiHelper = axios.create({
  baseURL: "http://192.168.0.178:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiHelper.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  const publicRoutes = [
    "/user-register/",
    "/user-login/",
    // "/auth/forgot-password",
    // "/auth/verify-otp",
    // "/auth/reset-password",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    config.url.includes(route),
  );

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiHelper;

// "http://192.168.0.178:8000/user-register"
