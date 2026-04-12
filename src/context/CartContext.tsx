"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
export type SizeOption = "Regular" | "Large";
export type SugarOption = "Normal" | "Less" | "No Sugar";
export type IceOption = "Normal" | "Less" | "No Ice";
export interface CartItemType {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: SizeOption;
  sugar: SugarOption;
  ice: IceOption;
  notes?: string;
}
interface CartContextType {
  cart: CartItemType[];
  addToCart: (item: Omit<CartItemType, "cartItemId">) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subTotal: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const savedCart = localStorage.getItem("kopiCepatCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
      }
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("kopiCepatCart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);
  const addToCart = (item: Omit<CartItemType, "cartItemId">) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (c) =>
          c.productId === item.productId &&
          c.size === item.size &&
          c.sugar === item.sugar &&
          c.ice === item.ice &&
          c.notes === item.notes
      );
      if (existingItemIndex !== -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      }
      const newItem = {
        ...item,
        cartItemId: Math.random().toString(36).substring(2, 9),
      };
      return [...prev, newItem];
    });
  };
  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };
  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
