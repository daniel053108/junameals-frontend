"use client";

import useOrderStatus from "@/components/hooks/useOrderStatus";
import { useSearchParams } from "next/navigation";
import PayButton from "@/components/ui/payButton";

export default function BuyClient() {
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get("orderId"));
  const { order, loading } = useOrderStatus(orderId);

  if (loading) return <h1>Cargando...</h1>;
  if (!order) return <h1>Error al cargar orden</h1>;

  let cantidadItems = 0;
  order.items.forEach(i => {
    cantidadItems += i.quantity;
  });

  return (
    <section className="p-10">
      <div className="flex flex-col">
        <p className="text-center font-playfair italic text-3xl font-bold mb-3 bg-secondary rounded-xl shadow-lg">
          Datos de la orden
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {order.items.map(item => (
            <div key={item.id} className="p-4 bg-secondary rounded-xl shadow-lg">
              <img
                src={item.product_image}
                title={item.product_name}
                className="w-full h-80"
              />
              <h1 className="font-bold italic font-saira">
                {item.product_name}
              </h1>
              <p className="font-saira">Precio unitario: {item.price}</p>
              <p className="font-saira">Cantidad: {item.quantity}</p>
            </div>
          ))}
        </div>

        <h1 className="text-center font-saira text-2xl font-bold mt-4">
          Cantidad de productos: {cantidadItems}
        </h1>

        <h1 className="text-center font-saira text-3xl font-bold mt-4">
          Total a pagar: ${order.total_amount}
        </h1>

        <PayButton orderId={order.id} />
      </div>
    </section>
  );
}
