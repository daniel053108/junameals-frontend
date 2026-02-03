import { Suspense } from "react";
import PendingClient from "./PendingClient";

export default function BuyPage() {
  return (
    <Suspense fallback={<h1>Cargando ...</h1>}>
      <PendingClient />
    </Suspense>
  );
}
