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
    const [ success, setSuccess ] = useState(false);
    const [ message, setMessage ] = useState("");

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

    const canceledOrder = (orderId: number) => {
        setSuccess(false);
        setMessage("");
        try{
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/canceled-order/${orderId}`,{
                    credentials: "include",
                    method: "PUT"
                }
            )
            .then(res => {
                if(res.ok){
                    setSuccess(true);
                    setMessage("Orden calcelada correctamente");
                    return;
                }

                setMessage("Error al cancelar orden")
            })
        }catch(error){
            setMessage("Error:" + error);
            console.log(error);
            return;
        }
    };

    return { order, createOrder, canceledOrder, success, message, loadingOrder, statusCreateOrder };
}
