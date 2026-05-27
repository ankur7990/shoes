import { createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from "../api/cartService";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCartItems();

      if (response?.data?.status) {
        setCartData(response.data);
        setCartCount(response.data.items?.length || 0);
      }
    } catch (error) {
      console.log("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const res = await getCartItems();
      const cartItems = res.data.items || res.data.results || res.data || [];
      setCartCount(cartItems.length);
    } catch (error) {
      console.log("Cart count error:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartCount,
        loading,
        fetchCart,
        setCartData,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
