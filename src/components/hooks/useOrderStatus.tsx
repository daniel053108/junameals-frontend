import { useEffect, useState } from "react";

export default function useOrderStatus(orderId: number | null) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        fetch(`/api/orders/${orderId}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setOrder(data))
            .finally(() => setLoading(false));
    }, [orderId]);

    return { order, loading };
}
