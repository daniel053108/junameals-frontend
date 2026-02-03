"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessClient() {
    const params = useSearchParams();
    const router = useRouter();

    const orderId = params.get("external_reference");

    useEffect(() => {
        if (!orderId) return;

        // Pequeña pausa para que el webhook actualice
        const timeout = setTimeout(() => {
            router.push(`user/orders?orderId=${orderId}`);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [orderId, router]);

    return (
        <section className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold text-green-600">
                ¡Pago recibido!
            </h1>
            <p>Estamos confirmando tu orden…</p>
        </section>
    );
}
