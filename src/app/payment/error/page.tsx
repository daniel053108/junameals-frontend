"use client";

import { useRouter } from "next/navigation";

export default function PagoErrorPage() {
    const router = useRouter();

    return (
        <section className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold text-red-600">
                Pago no completado
            </h1>
            <p>Hubo un problema con el pago.</p>

            <button
                onClick={() => router.push("/")}
                className="bg-primary text-white px-6 py-3 rounded-xl"
            >
                Volver al inicio
            </button>
        </section>
    );
}
