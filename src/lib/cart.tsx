"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast";

interface CartItem {
  id: string;
  productId: string;
  skuId?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category: string;
  stock: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => boolean;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => false,
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch {
          localStorage.removeItem("cart");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number): boolean => {
    const maxAvailable = item.stock;
    const currentQuantity = items.find(i => i.id === item.id)?.quantity || 0;
    const newQuantity = currentQuantity + quantity;

    if (newQuantity > maxAvailable) {
      toast.error(`Quantidade disponível: ${maxAvailable} ${maxAvailable === 1 ? "unidade" : "unidades"}`);
      return false;
    }

    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });

    toast.success(`${item.name} adicionado ao carrinho`);
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.success("Produto removido do carrinho");
  };

  const updateQuantity = (id: string, quantity: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (quantity > item.stock) {
      toast.error(`Quantidade disponível: ${item.stock} ${item.stock === 1 ? "unidade" : "unidades"}`);
      return;
    }

    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Carrinho limpo");
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Return a default context during static generation
    if (typeof window === "undefined") {
      return {
        items: [],
        addToCart: () => false,
        removeFromCart: () => {},
        updateQuantity: () => {},
        clearCart: () => {},
        totalItems: 0,
        subtotal: 0,
        isCartOpen: false,
        openCart: () => {},
        closeCart: () => {},
      };
    }
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}