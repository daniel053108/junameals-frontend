import { Order, OrderStatus, OrderStatusDelivery } from "./hooks/useOrderStatus";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { formatDate } from "@/utils/formatDate";
import Button from "./ui/Button";

const statusOrder: Record<OrderStatus, string> = {
    approved: "Aprobado",
    rejected: "Rechazado",
    pending: "Pendiente",
    canceled: "Cancelado",
    unknown: "Desconocido"
}

const statusDelivery: Record<OrderStatusDelivery,string> = {
    delivered: "Entregado",
    pending: "Pendiente de entrega",
    arriving: "En Camino",
    unknown: "Desconocido"
};

export default function OrderGrid({ orderId }: { orderId: number | null }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const {user, isLogged} = useAuth();
    const [ orderModifiqued, setOrderModifiqued] = useState(false);

    useEffect(() => {
        let url = orderId !== 0
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`
            : `${process.env.NEXT_PUBLIC_API_URL}/api/orders/getMyOrders`;

        
        url = isLogged && user!.role === "admin" ? `${process.env.NEXT_PUBLIC_API_URL}/api/orders/getOrders` : url;

        fetch(url, { credentials: "include" })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (!data) return setOrders([]);
                setOrders(orderId ? [data] : data);
            })
            .catch(error => console.error(error))
            .finally(() => setOrderModifiqued(false))

    }, [orderId, isLogged, orderModifiqued]);

    const changeStatus = (orderId:number) => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/orders/updateStatusOrder/${orderId}`,{
                credentials: "include",
                method: "PUT"
            }
        )
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if(!data) return;

            setOrderModifiqued(true);
        })
        .catch(error => console.error(error));
    }

    return (
        <section className="space-y-6">
            <div className="mt-4 text-center font-playfair text-4xl">
                <p className="bg-secondary rounded-xl shadow-lg">
                Tus Pedidos    
                </p>
            </div>
            {orders.map(order => (
                <div key={order.id} className="border p-4 rounded-xl font-saira">
                    <h1 className="font-bold">ID de la orden: {order.id}</h1>
                    <p>Total: ${order.total_amount}</p>
                    <p>Pago: {statusOrder[order.status]}</p>
                    <p>Entrega: {statusDelivery[order.status_delivery]}</p>
                    {user?.role === "admin" && (
                        <p>Pedido realizado el {formatDate(order.created_at)}</p>
                    )}
                    <div className="mt-4 space-y-3">
                        {order.items.map(item => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border-b pb-2"
                            >
                                <img
                                    src={item.product_image}
                                    alt={item.product_name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">
                                        {item.product_name}
                                    </p>
                                    <p>
                                        {item.quantity} × ${item.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                   <div className="mt-4 space-y-3">
                        <div
                            key={order.address.id}
                            className="flex items-center gap-4 border-b pb-2"
                        >
                            <div>
                                <h1 className="font-saira text-xl font-bold">Direccion de Entrega</h1>
                                <p className="">
                                    {order.address.city},{order.address.state},{order.address.country}
                                </p>    
                                <p>{order.address.postal_code}</p>
                                <p>{order.address.neighborhood}, {order.address.street}</p>
                                <h1 className="font-saira font-bold text-xl">Nota de Entrega</h1>
                                <p>{order.address.delivery_notes}</p>
                            </div>
                        </div>
                    </div>
                    {user?.role === "admin" && (
                        <Button variant="link" onClick={() => changeStatus(order.id)}>Cambiar Estatus de entrega</Button>
                    )}
                </div>
            ))}
        </section>
    );
}
