import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyEmail from "../pages/VerifyEmail";
import ResetPassword from "../pages/ResetPassword";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="" element={<Login />} />
        <Route path="" element={<Signup />} />
        <Route path="" element={<ForgotPassword />} />
        <Route path="" element={<VerifyEmail />} />
        <Route path="" element={<ResetPassword />} />
      </Route>

      <Route element={<MainLayout />}></Route>
    </Routes>
  );
}

export default AppRoutes;
