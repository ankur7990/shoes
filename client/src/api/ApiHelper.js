import React from "react";
import axios from "axios";
let setGlobalLoader = null;

export const setLoader = (loaderFn) => {
  setGlobalLoader = loaderFn;
};

const ApiHelper = axios.create({
  baseURL: "http://192.168.0.178:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiHelper.interceptors.request.use((config) => {
  if (setGlobalLoader) setGlobalLoader(true);

  const token = localStorage.getItem("accessToken");

  const publicRoutes = [
    "/user-register/",
    "/user-login/",
    "/otp-for-forgot-password/",
    "/verify-otp/",
    "/reset-password/",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    config.url.includes(route),
  );

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

ApiHelper.interceptors.response.use(
  (response) => {
    if (setGlobalLoader) setGlobalLoader(false);
    return response;
  },
  (error) => {
    if (setGlobalLoader) setGlobalLoader(false);
    return Promise.reject(error);
  },
);
export default ApiHelper;

// "http://192.168.0.178:8000/user-register"
