import { useState } from "react";
import { product } from "@/components/ProductsGrid";

type StatusOrder = "success" | "error" | "pending";

type Order = {
    id: number;
}

export default function useCreateOrder() {
    const [ statusCreateOrder, setStatusCreateOrder ] = useState<StatusOrder>("pending");
    const [ order, setOrder ] = useState<Order | null>(null);
    const [loadingOrder, setLoadingOrder] = useState(false);

    const createOrder = async (items:product[]) => {
        try {
            setLoadingOrder(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/createOrder`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({items: items}),
                }
            );
            
            if (!res.ok) {
                throw new Error("Error al crear la orden");
            }

            const data = await res.json();

            setOrder(data);
            setStatusCreateOrder("success");
        } catch (error) {
            console.error(error);
            setStatusCreateOrder("error");
            setOrder(null);
        } finally {
            setLoadingOrder(false);
        }
    };

    return { order, createOrder, loadingOrder, statusCreateOrder };
}
