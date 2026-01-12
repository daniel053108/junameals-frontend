"use client";
import { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

// Botón agregar al carrito
export function AddToCartButton({ product }: { product: CartItem }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart({ ...product, quantity: 1 })}
      className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
    >
      Agregar al carrito
    </button>
  );
}

// Vista del carrito
export function Cart() {
  const { cart, removeFromCart, total, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-gray-400">Tu carrito está vacío 🛒</p>;
  }

  return (
    <div className="p-4 space-y-4">
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b pb-2">
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
          </div>
          <div className="flex items-center gap-4">
            <p>${item.price * item.quantity}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <button
        onClick={clearCart}
        className="w-full bg-red-500 text-white py-2 rounded-xl"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
