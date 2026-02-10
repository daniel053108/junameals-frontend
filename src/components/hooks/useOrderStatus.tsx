"use client";
import { useEffect, useState } from "react";
import { Address } from "@/context/authContext";

export type OrderStatus = "approved" | "rejected" | "pending" | "unknown" | "canceled";
export type OrderStatusDelivery = "delivered" | "pending" | "unknown" | "arriving";

export type OrderItem = {
    id: number;
    product_id: number;
    product_name: string;
    price: number;
    product_image:string;
    quantity: number;
};

export type Order = {
    id:number;
    status: OrderStatus;
    status_delivery: OrderStatusDelivery;
    total_amount: number;
    payment_provider: string;
    payment_id:string;
    created_at:string;
    address:Address;
    items: OrderItem[];
}

export default function useOrderStatus(orderId: number | null) {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, {
            credentials: "include"
        })
            .then(res => {return res.ok ? res.json() : null})
            .then(data => {
                if(!data){
                    setOrder(null);
                    return;
                }

                setOrder(data)
            })
            .finally(() => setLoading(false));
    }, [orderId]);
    return { order, loading };
}
