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

        {/* protected route  */}
        {/* //profile
        //dashboard  */}
        <Route
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
        />

        <Route
          path="/accountinformation"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AccountInformation />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/myorder"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyOrder />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/addressmanagement"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddressManagement />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/passwordmanager"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PasswordManager />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/account"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Account />
              </MainLayout>
            </ProtectedRoute>
          }
        >
          <Route path="accountinformation" element={<AccountInformation />} />
          <Route path="myorder" element={<MyOrder />} />
          <Route path="addressmanagement" element={<AddressManagement />} />
          <Route path="passwordmanager" element={<PasswordManager />} />
        </Route> */}

        {/* <Route path="/account" element={<Account />}>
          <Route path="accountinformation" element={<AccountInformation />} />
        </Route> */}
        {/* <Route
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
