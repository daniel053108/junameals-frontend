"use client";
import { createContext, useContext, useState, useEffect} from "react";
import { useAuth } from "./authContext";
import { product } from "@/components/ProductsGrid";

export type CartItem = {
  id: number;
  quantity: number;
  price:number;
};

export type CartProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
};

export type Status = "active" | "paid" | "cancelled";

export type Cart = {
    id: number;
    user_id:number;
    status: Status;
}

type CartContextType = {
  cart: Cart | null;
  cartItems: product[];
  setCartModifiqued: (boolean:boolean) => void;
  cantItems: number;
  loadingCart: boolean;
  getCartItems: () => Promise<CartProduct[]>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const { user , isLogged } = useAuth();
    const [ total, setTotal] = useState<number>(0);
    const [ cantItems, setCantItems ] = useState(0);
    const [loadingCart, setLoadingCart] = useState(true);
    const [ cartModifiqued, setCartModifiqued ] = useState(false);
    const [ cartItems, setCartItems ] = useState<product[]>([]); 

    {/*ReadCartAndUser*/}
    useEffect(() => {
        setLoadingCart(true);
        if(!isLogged){
            setCart(null);
        }else{
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/cartStatus`, {
                credentials: "include",
            })
            .then((res) => {return res.ok ? res.json() : null})
            .then((data) =>{ 

                if(!data || !user){
                    return;
                }
                setCart({
                    id: data.cart_id,
                    user_id: user.id,
                    status: data.status,
                });
            })
            .finally(() =>{
                setLoadingCart(false);
            })
            .catch(() => 
                setCart(null)
            )
        }
    }, [isLogged])

    useEffect(() => {
        if(!!cart && !!user){
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/getCartItems?cartId=${cart.id}&userId=${user.id}`,{
                credentials: "include",
            })
            .then((res) => {return res.ok ? res.json() : null})
            .then((data) => {
                if(!data){
                    setTotal(0);
                    setCantItems(0);
                    return;
                }

                const total = data.reduce((acc: number ,item: CartItem) => 
                    acc + item.price * item.quantity, 0
                );

                const cant_items = data.reduce((acc:number, item: CartItem) => 
                    acc + item.quantity, 0
                );

                setCantItems(cant_items);
                setTotal(total);
            })
            .catch(() => {
                setTotal(0);
                setCantItems(0);
            })
        }else{
            setCantItems(0);
            setTotal(0);
        }

    },[cart, user, cartModifiqued]);

    useEffect(() => {
        if(!cart || !user)return;
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart/getCartProducts?cartId=${cart?.id}`,{
                credentials: "include"
            }
        )
        .then((res) => res.ok ? res.json() : null)
        .then((data) => setCartItems(!data ? [] : data))
        .catch(() => setCartItems([]))
        .finally(() => setCartModifiqued(false));
    }, [cart,user,cartModifiqued]);

    {/*getCartItems*/}
    const getCartItems = async () => {
        if(loadingCart) return;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart/getCartProducts?cartId=${cart?.id}`,{
                credentials: "include"
            }
        );

        if(!res.ok)return[];

        return res.json();
    }

    {/*AddToCart*/}
    const addToCart = async (item: CartItem) => {

        if (loadingCart) {
            console.warn("Carrito aún cargando");
            return;
        }

        if (!cart || !isLogged) {
            console.warn("No hay carrito o usuario");
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/addToCart`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                product: item,
                id_cart: cart.id
            })
        });

        if(!res.ok){
            const error = await res.json()
            console.log(error.error);
        };

        const itemAdded = await res.json();
        setCartModifiqued(true);

    };

    {/*RemoveFromCart*/}
    const removeFromCart = async (id: number) => {
        if(!cart || !isLogged) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/removeFromCart/cart/${cart.id}/item/${id}`,{
            method: "DELETE",
            credentials: "include"
        });
        if(!res.ok)return;

        const itemDelete:CartItem = await res.json();
        setCartModifiqued(true);
    };

    {/*clearCart*/}
    const clearCart = async () => {
        if(!cart || !isLogged)return;

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart/clearCart/cart/${cart.id}`,{
                method: "DELETE",
                credentials: "include"
            }
        );

        setTotal(0);
        setCantItems(0);
    };


    return (
        <CartContext.Provider value={{ cart, cartItems, setCartModifiqued, loadingCart, cantItems, getCartItems, addToCart, removeFromCart, clearCart, total }}>
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
};
