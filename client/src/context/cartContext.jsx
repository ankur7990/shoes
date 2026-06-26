import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCartItems } from "../api/cartService";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCartItems();

      if (response?.data?.status) {
        setCartData(response.data);
        setCartCount(response.data.items?.length || 0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // const fetchCartCount = async () => {
  //   try {
  //     const res = await getCartItems();

  //     const count = res.data?.items?.length || 0;

  //     setCartCount(count);
  //     // const cartItems = res.data.items || res.data.results || res.data || [];
  //     // console.log("cart items", cartItems);

  //     // setCartCount(cartItems);
  //   } catch (error) {
  //     console.log("Cart count error:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCartCount();
  // }, []);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartCount,
        loading,
        fetchCart,
        setCartData,
        setCartCount,
        // fetchCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
