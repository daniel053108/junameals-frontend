"use client";

import Button from "@/components/ui/Button";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { FaCartArrowDown } from "react-icons/fa6"
import { TbShoppingCartCheck } from "react-icons/tb" 
import { useState } from "react";

type product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

export default function ProductsGrid({ products }: { products: product[] }) {
    const { addToCart, cart, loadingCart } = useCart();
    const { user, isLogged, loading} = useAuth();
    const [ checkProductId, setCheckProductId ] = useState<number | null>(null);
    const router = useRouter();

    const showCheck = (id: number) => {
        setCheckProductId(id);
        setTimeout(() => setCheckProductId(null), 1000);
    }

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
            <div
                key={product.id}
                className="border rounded-xl p-4 shadow"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                />

                <h2 className="text-xl font-playfair italic mt-3">
                    {product.name}
                </h2>

                <p className="text-gray-600 italic">
                    {product.description}
                </p>

                <p className="text-lg font-bold mt-2">
                    ${product.price}
                </p>

                <div className="w-full flex justify-center scale-125">
                    {isLogged ? (
                    <Button
                        href="/Products/Bowls"
                        variant="primary"
                        className="relative"
                        onClick={() => {
                        addToCart({
                            id: product.id,
                            quantity: 1,
                            price: product.price,
                        })
                        showCheck(product.id);
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
                    <Button variant="primary" onClick={() => router.push("/Login")}>
                        <FaCartArrowDown/>
                    </Button>
                    )};
                </div>

            </div>
        ))}
        </div>
    );
}
