"use client";

import { useState, useEffect } from "react";
import useOrderStatus from "@/components/hooks/useOrderStatus";
import { useSearchParams } from "next/navigation";
import PayButton from "@/components/ui/payButton";
import Button from "@/components/ui/Button";
import { Address, useAuth } from "@/context/authContext";
import useCreateOrder from "@/components/hooks/useCreateOrder";
import {useRouter} from "next/navigation";

export default function BuyClient() {
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get("orderId"));
  const { order, loading } = useOrderStatus(orderId);
  const { addresses } = useAuth();
  const { canceledOrder, message, success } = useCreateOrder();

  const [deliveryType, setDeliveryType] = useState<"address" | "midpoint">("address");
  const [midpoints, setMidpoints] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | "">("");
  const [selectedMidpoint, setSelectedMidpoint] = useState<number | "">("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(()=>{
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/addresses/getMidpoints`
    )
    .then((res) => {return res.ok ? res.json() : null})
    .then((data) => {
      if(!data){
        setMidpoints([]);
        return;
      }

      setMidpoints(data);
    })
    .catch((error) => {
      console.log("Error al obtener los midpoints");
      setMidpoints([]);
    })
  },[])

  const handleAddress = () => {
    const addressId =
      deliveryType === "midpoint"
        ? selectedMidpoint
        : selectedAddress;

    if (!addressId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/updateOrderAddress/${orderId}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: addressId }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar dirección");
        return res.json();
      })
      .then(() => {
        setSuccessMessage("Dirección seleccionada correctamente");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch(() => {
        setSuccessMessage(null);
      });
  };

  const router = useRouter();

  useEffect(() => {
    if(!success) return;

    const timer = setTimeout(() => {
      router.back();
    }, 2000);

    return () => clearTimeout(timer);
  }, [success]);

  if (loading) return <h1>Cargando...</h1>;
  if (!order) return <h1>Error al cargar orden</h1>;

  const address = order.address;

  let cantidadItems = 0;
  order.items.forEach(i => {
    cantidadItems += i.quantity;
  });

  return (
    <section className="p-10">
      <div className="flex flex-col gap-6">

        <p className="text-center italic text-3xl font-bold bg-secondary rounded-xl py-3 shadow-lg">
          Datos de la orden
        </p>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {order.items.map(item => (
            <div key={item.id} className="p-4 bg-secondary rounded-xl shadow-lg">
              <img
                src={item.product_image}
                title={item.product_name}
                className="w-full h-80 object-cover rounded-lg"
              />
              <h1 className="font-bold italic mt-2">
                {item.product_name}
              </h1>
              <p>Precio unitario: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Dirección */}
        <div className="flex flex-col gap-3  items-center">
          <label className="font-semibold font-saira">Dirección de entrega</label>

          {/* Select principal */}
          <select
            value={deliveryType === "address" ? selectedAddress : "midpoint"}
            onChange={(e) => {
              if (e.target.value === "midpoint") {
                setDeliveryType("midpoint");
                setSelectedAddress("");
              } else {
                setDeliveryType("address");
                setSelectedAddress(Number(e.target.value));
                setSelectedMidpoint("");
              }
            }}
            className="font-playfair rounded-lg border bg-secondary px-4 py-2"
          >
            <option value="">Selecciona una dirección</option>

            {addresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.country}, {addr.state}, {addr.city}, {addr.street}
              </option>
            ))}

            <option value="midpoint">Punto medio</option>
          </select>


          {/* Select de punto medio */}
          {deliveryType === "midpoint" && (
            <select
              value={selectedMidpoint}
              onChange={(e) => setSelectedMidpoint(Number(e.target.value))}
              className="font-playfair rounded-lg border bg-secondary px-4 py-2"
            >
              <option value="">Selecciona un punto medio</option>

              {midpoints.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.neighborhood}
                </option>
              ))}
            </select>
          )}

          <Button onClick={()=>handleAddress()}>Confirmar Direccion</Button>
          {successMessage && (
            <div
              className="
                mt-3
                rounded-lg
                bg-green-100
                border border-green-300
                px-4 py-2
                text-green-800
                font-semibold
                shadow-sm
                transition
              "
            >
              {successMessage}
            </div>
          )}
        </div>

        {/* Totales */}
        <h1 className="text-center text-2xl font-bold">
          Cantidad de productos: {cantidadItems}
        </h1>

        <h1 className="text-center text-3xl font-bold">
          Total a pagar: ${order.total_amount}
        </h1>

        {/* Acciones */}
        <div className="flex flex-col gap-4 items-center">
          <PayButton orderId={order.id} onClick={()=>{handleAddress()}}/>
          <Button className="w-50" variant="primary" onClick={() => canceledOrder(orderId)}>
            Cancelar Orden
          </Button>
          {message && !success && (<h1 className="text-red-500">{message}</h1>)}
          {success && (<h1 className="text-black bg-secondary">{message} Redirigiendo...</h1>)}
        </div>

      </div>
    </section>
  );
}
