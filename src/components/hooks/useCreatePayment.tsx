"use client";

import { useState } from "react";

export default function useCreatePayment(orderId: number) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPayment = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/preference`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: orderId }),
            });
            
            console.log(res);
            if (!res.ok) {
                throw new Error("No se pudo crear la preferencia de pago");
            }

            const data = await res.json();

            if (!data.init_point) {
                throw new Error("Respuesta inválida del servidor");
            }

            //Redirección a Mercado Pago
            window.location.href = data.init_point;

        } catch (err: any) {
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    return { createPayment, loading, error };
}
