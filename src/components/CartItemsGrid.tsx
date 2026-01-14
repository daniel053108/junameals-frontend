"use client";
import { useCart, CartProduct } from "@/context/cartContext";
import { useState, useEffect } from "react";

export default function CartItemsGrid() {

    const { cantItems, loadingCart, getCartItems, total} = useCart();
    const [ products, setProducts ] = useState<CartProduct[]>([])

    useEffect(() => {
        const loadingProducts = async() => { 
            const cartProducts = await getCartItems();
            setProducts(cartProducts ?? []);
        }
        console.log(products);
        loadingProducts();
    }, [loadingCart]);
    
    const existProduct = products.length !== 0 ? true : false;

    return(
        <section>
            <div className="flex flex-row gap-6 p-4">
                {existProduct ? (
                    products.map((product) => 
                        <div  key= {product.id} className="flex flex-col w-50 border rounded-xl p-4 shadow">
                            <img 
                                src={product.image}
                                className="w-full h-40 rounded-xl"/>
                            <h1 className="font-bold italic">{product.name}</h1>
                            <p className="italic">Cantidad: {product.quantity}</p>
                            <p className="font-bold text-xl">${product.price}</p>
                        </div>
                )):(
                    <h1 className="text-center bg-secondary rounded-xl p-4 font-saira font-bold w-full">Carrito Vacio</h1>
                )}
            </div>
            <div className="bg-secondary w-full rounded-xl mb-4 p-2">
                <h1 className="font-bold" >Cantidad de Productos: {cantItems}</h1>
                <h1 className="font-bold" >Total: ${total}</h1>
            </div>
        </section>
    );
}