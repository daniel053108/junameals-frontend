"use client";
import {sendOrderEmail} from "@/actions/sendEmail";
import useOrderStatus from "@/components/hooks/useOrderStatus";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useEffect, useRef } from "react";
import OrderGrid from "@/components/OrdersGrid";

export default function OrdersClient() {
    const search = useSearchParams();
    const { user } = useAuth(); 
    const sent = useRef(false);
    
    const orderId = Number(search.get("orderId"));

    const {order, loading} = useOrderStatus(orderId);

    useEffect(() => {
        if(!order || !user || sent.current) return;

        sent.current=true;

        const send = async()=>{
            await sendOrderEmail("Pedido confirmado", "Gracias por tu compra", user.email);
        }
        send();
    },[loading,order,user]);

    return(
        <section>
            <OrderGrid orderId={orderId}></OrderGrid>
        </section>
    );
}