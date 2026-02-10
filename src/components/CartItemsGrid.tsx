"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import Button from "@/components/ui/Button";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import useCreateOrder from "@/components/hooks/useCreateOrder"; 
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import ConfirmModal from "./ui/acceptModal";

export default function CartItemsGrid() {
    const { addresses } = useAuth();
    const { 
        cantItems, 
        cartItems, 
        setCartModifiqued, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        total 
    } = useCart();

    const { order, createOrder, statusCreateOrder, loadingOrder } = useCreateOrder();
    const existProduct = cartItems.length !== 0;
    const configGrid = existProduct ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "";

    const [messageBuyButton, setMessageBuyButton] = useState("Comprar");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (statusCreateOrder === "pending" && !loadingOrder) {
            setMessageBuyButton("Comprar");
        } else if (statusCreateOrder === "error" && !loadingOrder) {
            setMessageBuyButton("Error");
        } else if (statusCreateOrder === "success" && loadingOrder) {
            setMessageBuyButton("Redirigiendo...");
        } else if (statusCreateOrder === "success" && !loadingOrder) {
            clearCart();
            setCartModifiqued(true);
            router.push(`/payment/buy?orderId=${order!.id}`);
        } else if (statusCreateOrder === "pending" && loadingOrder) {
            setMessageBuyButton("Creando orden de compra...");
        }
    }, [statusCreateOrder, loadingOrder]);

    const handleBuyClick = () => {
        if (addresses.length === 0) {
            setShowConfirmModal(true);
            return;
        }
        createOrder(cartItems);
    };

    return (
        <section>
            <div className={`${configGrid} flex flex-row gap-6 p-4`}>
                {existProduct ? (
                    cartItems.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col w-50 border rounded-xl p-4 shadow bg-secondary items-center"
                        >
                            <img
                                src={product.image}
                                className="w-full h-40 rounded-xl"
                            />
                            <h1 className="font-bold italic">{product.name}</h1>
                            <p className="font-bold text-xl">${product.price}</p>

                            <div className="flex flex-row items-center justify-center w-40 rounded-3xl bg-gray-300">
                                <Button
                                    variant="none"
                                    className="bg-green-900 rounded-3xl text-white text-3xl scale-50 hover:scale-60"
                                    onClick={() => {
                                        removeFromCart(product.id);
                                        setCartModifiqued(true);
                                    }}
                                >
                                    -
                                </Button>

                                <p>{product.quantity}</p>

                                <Button
                                    variant="none"
                                    className="bg-green-900 rounded-3xl text-white text-3xl scale-50 hover:scale-60"
                                    onClick={() => {
                                        addToCart({
                                            id: product.id,
                                            quantity: product.quantity,
                                            price: product.price,
                                        });
                                        setCartModifiqued(true);
                                    }}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center bg-secondary rounded-xl p-4 font-saira font-bold w-full">
                        Carrito Vacío
                    </h1>
                )}
            </div>

            <div className="bg-secondary w-full rounded-xl mb-4 p-2">
                <h1 className="font-bold">Cantidad de Productos: {cantItems}</h1>
                <h1 className="font-bold">Total: ${total * 100 / 100}</h1>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button
                    variant="primary"
                    className="scale-120 hover:scale-140"
                    onClick={() => {
                        clearCart();
                        setCartModifiqued(true);
                    }}
                >
                    <MdOutlineRemoveShoppingCart className="scale-150" />
                </Button>

                {existProduct && (
                    <Button variant="primary" onClick={handleBuyClick}>
                        {messageBuyButton}
                    </Button>
                )}
            </div>

            {/* CONFIRM MODAL */}
            <ConfirmModal
                open={showConfirmModal}
                message="Necesitas registrar mínimo una dirección de entrega para poder comprar."
                onClose={() => setShowConfirmModal(false)}
                onAccept={() => {
                    setShowConfirmModal(false);
                    router.push("/user/register-address");
                }}
            />
        </section>
    );
}
