import { Suspense } from "react";
import BuyClient from "./BuyClient";

export default function BuyPage() {
  return (
    <Suspense fallback={<h1>Cargando pago...</h1>}>
      <BuyClient />
    </Suspense>
  );
}
