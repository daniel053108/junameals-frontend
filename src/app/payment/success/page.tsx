import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function BuyPage() {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <SuccessClient />
    </Suspense>
  );
}
