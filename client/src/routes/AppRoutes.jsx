import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyEmail from "../pages/VerifyEmail";
import ResetPassword from "../pages/ResetPassword";
import VerifyPassword from "../pages/VerifyPassword";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-password" element={<VerifyPassword />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
