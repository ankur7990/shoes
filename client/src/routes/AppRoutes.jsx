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
import Product from "../pages/Product";
import SportShoes from "../pages/ProductPages/SportShoes";
import CasualShoes from "../pages/ProductPages/CasualShoes";
import SneakerShoes from "../pages/ProductPages/SneakerShoes";
import SandleShoes from "../pages/ProductPages/SandleShoes";
import FormalShoes from "../pages/ProductPages/FormalShoes";
import ProtectedRoutes from "./ProtectedRoutes";
import CategoryPage from "../pages/ProductPages/CategoryPage";
import TrendingShoes from "../pages/TrendingShoes";
import SpecialShoes from "../pages/SpecialShoes";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/ProductPages/CartPage";
import Checkout from "../pages/Checkout";
import OrderDetails from "../pages/OrderDetails";
import ScanandUpload from "../pages/ai/AiShoeFinderPage";
import AiShoeFinderPage from "../pages/ai/AiShoeFinderPage";
import AiShoePreferencesPage from "../pages/ai/AiShoePreferencesPage ";

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
          {/* <Route path="/home" element={<Home />} /> */}

          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/passwordmanager" element={<PasswordManager />} />

          <Route path="/addressmanagement" element={<AddressManagement />} />

          <Route path="/category/filter/:id" element={<CategoryPage />} />

          <Route path="/sportshoes" element={<SportShoes />} />
          <Route path="/casualshoes" element={<CasualShoes />} />
          <Route path="/sneakershoes" element={<SneakerShoes />} />
          <Route path="/sandleshoes" element={<SandleShoes />} />
          <Route path="/formalshoes" element={<FormalShoes />} />
          <Route path="/trendingshoes" element={<TrendingShoes />} />
          <Route path="/specialshoes" element={<SpecialShoes />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myorders" element={<MyOrder />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Route>

        <Route>
          <Route path="/ai-finder" element={<AiShoeFinderPage />} />
          <Route
            path="/ai-finder/preferences"
            element={<AiShoePreferencesPage />}
          />
        </Route>

        {/* <Route path="/cart" element={<CartPage />} /> */}

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
