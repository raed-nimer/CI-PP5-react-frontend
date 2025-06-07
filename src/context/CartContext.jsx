// src/context/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Fetch failed");

      const cartItems = await response.json();
      const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

      setCartCount(totalQuantity);
      localStorage.setItem("cartCount", totalQuantity);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
