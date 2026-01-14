"use client";

import Button from "@/components/ui/Button";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

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

            {isLogged ? (
            <Button
                href="/Products/Bowls"
                variant="primary"
                onClick={() => {
                addToCart({
                    id: product.id,
                    quantity: 1,
                    price: product.price,
                })
                }}
            >
                Agregar al carrito
            </Button> ) : ( 
            <Button variant="primary" onClick={() => router.push("/Login")}>
                Agregar al carrito
            </Button>

            )};


            </div>
        ))}
        </div>
    );
}
