import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import VerifyPassword from "../pages/VerifyPassword";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoutes";
import AuthRoutes from "../routes/AuthRoutes";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Account from "../pages/Account";
import AccountInformation from "../pages/AccountInformation";
import MyOrder from "../pages/MyOrder";
import AddressManagement from "../pages/AddressManagement";
import PasswordManager from "../pages/PasswordManager";

function AppRoutes() {
  return (
    <div>
      <Routes>
        {/* Auth Routes (no Navbar/Footer) */}

        <Route
          path="/login"
          element={
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRoutes>
              <Signup />
            </AuthRoutes>
          }
        />

        <Route path="/otp-for-forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/verify-password" element={<VerifyPassword />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />

          {/* <Route path="/products" element={<Products />} /> */}

          <Route path="/profile" element={<Profile />} />

          <Route path="/passwordmanager" element={<PasswordManager />} />

          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
        {/* protected route  */}
        {/* //profile
        //dashboard  */}
        {/* <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Account />
              </MainLayout>
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Account />
              </MainLayout>
            </ProtectedRoute>
          }
        /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
