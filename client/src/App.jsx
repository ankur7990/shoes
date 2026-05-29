import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
