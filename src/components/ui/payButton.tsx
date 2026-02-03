"use client";

import useCreatePayment from "@/components/hooks/useCreatePayment";

type Props = {
    orderId: number;
};

export default function PayButton({ orderId }: Props) {
    const { createPayment, loading, error } = useCreatePayment(orderId);
    
    return (
        <div className="flex flex-col gap-2 md:px-75 mt-4">
            <button
                onClick={createPayment}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-xl
                           hover:bg-green-400 disabled:opacity-50"
            >
                {loading ? "Redirigiendo..." : "Pagar ahora"}
            </button>

            {error && (
                <p className="text-red-600 text-sm text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
