"use client";

import Button from "@/components/ui/Button";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { FaCartArrowDown } from "react-icons/fa6"
import { TbShoppingCartCheck } from "react-icons/tb" 
import useCreateOrder from "./hooks/useCreateOrder";
import { useEffect, useState } from "react";
import ConfirmModal from "./ui/acceptModal";

export type product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    available: boolean;
    weekly_menu: boolean;
    recommended: boolean;
};


export default function ProductsGrid({ products }: { products: product[] }) {
    const { addToCart, setCartModifiqued } = useCart();
    const { isLogged, loading, user, addresses} = useAuth();
    const [ checkProductId, setCheckProductId ] = useState<number | null>(null);
    const { order, createOrder, statusCreateOrder, loadingOrder } = useCreateOrder();
    const [ messageBuyButton, setMessageBuyButton ] = useState<string>("");
    const [ productModifiqued, setProductModifiqued ] = useState(false);
    const router = useRouter();
    const [buyingProductId, setBuyingProductId] = useState<number | null>(null);
    const [openProductId, setOpenProductId] = useState<number | null>(null);
    const [ showMessage, setShowMessage ] = useState(false);


    const handleAccept = () => {
        setOpenProductId(null);

        setTimeout(() => {
        router.push("../user/register-address");
        }, 200);
    };

    const showCheck = (id: number) => {
        setCheckProductId(id);
        setTimeout(() => setCheckProductId(null), 1000);
    }
    
    useEffect(() => {
        if(!productModifiqued) return;
        router.refresh();
        setProductModifiqued(false);
    }, [productModifiqued])

    useEffect(() => {
        if (!buyingProductId) return;

        if (statusCreateOrder === "pending" && !loadingOrder) {
            setMessageBuyButton("Comprar");
        } else if (statusCreateOrder === "error" && !loadingOrder) {
            setMessageBuyButton("Error");
        } else if (statusCreateOrder === "success" && loadingOrder) {
            setMessageBuyButton("Redirigiendo...");
        } else if (statusCreateOrder === "success" && !loadingOrder) {
            router.push(`/payment/buy?orderId=${order!.id}`);
        } else if (statusCreateOrder === "pending" && loadingOrder) {
            setMessageBuyButton("Creando orden de compra...");
        }
    }, [statusCreateOrder, loadingOrder, buyingProductId]);


    const deleteProduct = (productId:number) => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/delete-product/${productId}`,{
                credentials: "include",
                method: "DELETE"
            }
        )
        .then(res => {
            if(!res.ok) return;
            setProductModifiqued(true);
        })
    }

    const handleChangeAvailable = (data:product) =>{
        data.available = !data.available;
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/update-product`,{
                method: "POST",
                credentials: "include",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(data)
            }
        )
        .then(res => {
            if(!res.ok)return;
            setProductModifiqued(true);
        })
    }

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => {
                if(!product.available && user?.role === "user")return;
                return(
                <div
                    key={product.id}
                    className="border rounded-xl p-10 shadow-lg"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-90 object-cover rounded-lg"
                    />

                    <h2 className="text-xl font-playfair italic mt-3 w-full">
                        {product.name}
                    </h2>

                    <p className="text-gray-600 italic">
                        {product.description}
                    </p>

                    <p className="text-lg font-bold mt-2 w-full">
                        ${product.price}
                    </p>

                    <div className="flex flex-col items-center mt-4 scale-120 gap-2">
                        {isLogged ? (
                        <Button
                            variant="primary"
                            className="relative py-3"
                            onClick={() => {
                            addToCart({
                                id: product.id,
                                quantity: 1,
                                price: product.price,
                            })
                            showCheck(product.id);
                            setCartModifiqued(true);
                            }}
                        >
                            <TbShoppingCartCheck className={`absolute transition-all duration-300 ${
                                checkProductId !== product.id
                                ? "opacity-0 scale-50 rotate-90"
                                : "opacity-100 scale-100 rotate-0"
                                }`}
                            />
                            
                            <FaCartArrowDown    className={`absolute transition-all duration-300 ${
                                checkProductId !== product.id
                                ? "opacity-100 scale-100 rotate-0"
                                : "opacity-0 scale-50 -rotate-90"
                                }`}
                            />
                        </Button> ) : ( 
                        <Button variant="primary" onClick={() => router.push("/login")}>
                            <FaCartArrowDown/>
                        </Button>
                        )}

                        {isLogged ? (
                            <div className="">
                                <Button
                                    className="py-2 scale-80"
                                    variant="primary"
                                    onClick={() => {
                                        if(user?.role === "admin"){
                                            setShowMessage(true);
                                            return;
                                        }
                                        /*DESCOMENTAR PARA DIRECCIONES
                                        if (addresses.length === 0) {
                                            setOpenProductId(product.id);
                                            return;
                                        }*/
                                        
                                        setBuyingProductId(product.id);
                                        setMessageBuyButton("Creando orden de compra...");
                                        createOrder([product]);
                                    }}
                                >
                                    {buyingProductId === product.id
                                        ? messageBuyButton
                                        : "Comprar"}
                                </Button>
                                <ConfirmModal
                                    open={openProductId === product.id}
                                    message={"Necesitas registrar mínimo una dirección de entrega para poder continuar con la compra. Al aceptar seras redirigido a la seccion para registrar una direccion."}
                                    onAccept={() => handleAccept}
                                    onClose={() => setOpenProductId(null)}
                                />
                            </div>
                        ):(
                            <Button variant="primary" href="/login">
                                Comprar
                            </Button>
                        )}
                    </div>
                    {user?.role === "admin" && (
                        <>
                        <Button variant="link" onClick={() => deleteProduct(product.id)}>Eliminar producto</Button>
                        <Button variant="link" href={`/products/modifiqued-products/update-product?productId=${product.id}`}>Modificar</Button>
                    
                        {product.available ? (
                            <Button variant="link" onClick={() => handleChangeAvailable(product)} >Cambiar a no disponible</Button>
                        ):(
                            <Button variant="link" onClick={() => handleChangeAvailable(product)} >Cambiar a disponible</Button>
                        )}
                        </> 
                    )}
                </div>
            )})}
            </div>
            {user?.role == "admin" && (
                <div className="flex justify-center">
                    <Button href="/products/modifiqued-products/add-product" className="mt-4">Agregar Producto</Button>
                </div>
            )}
            <ConfirmModal
                open={showMessage}
                message={"No puedes comprar siendo administrador"}
                onAccept={() => setShowMessage(false)}
            />
        </section>
    );
}
