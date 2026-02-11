"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useCreateOrder from "@/components/hooks/useCreateOrder";
import Button from "@/components/ui/Button";

export default function PagoErrorPage() {
    const router = useRouter();
    const search = useSearchParams();
    const { canceledOrder } = useCreateOrder();

    const orderId = Number(search.get("orderId"));

    useEffect(() => {
        if (!orderId) return;

        canceledOrder(orderId);
    }, [orderId]);

    return (
        <section className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold text-red-600">
                Pago no completado
            </h1>
            <p>Hubo un problema con el pago.</p>

            <Button
                variant="link"
                onClick={() => {
                    router.push("/")
                }}
            >
                Volver al inicio
            </Button>
        </section>
    );
}
