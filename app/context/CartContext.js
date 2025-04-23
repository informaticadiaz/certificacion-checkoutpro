'use client';
import { createContext, useState, useContext } from 'react';
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const clearCart = () => {
    setCart([]);
  };
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price), 0);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}