import { Suspense } from "react";
import OrdersClient from "./OrdersClient";

export default function BuyPage() {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <OrdersClient />
    </Suspense>
  );
}
