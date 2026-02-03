"use client";

import { useSearchParams } from "next/navigation";
import useOrderStatus from "@/components/hooks/useOrderStatus";

export default function PendingClient() {
    const searchParams = useSearchParams();
    const orderId = Number(searchParams.get("orderId"));

    const { order, loading } = useOrderStatus(orderId);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Pago en proceso</h1>

            <p className="text-gray-600 text-center max-w-md">
                Estamos esperando la confirmación de tu pago.
                Esto puede tardar unos minutos.
                No cierres esta página.
            </p>

            {loading && <span>Consultando estado...</span>}

            <div className="mt-4">
                <span className="animate-pulse text-yellow-500">
                    Estado actual: {order?.status}
                </span>
            </div>
        </div>
    );
}
