import { Suspense } from "react";
import ErrorClient from "./ErrorClient";

export default function BuyPage() {
  return (
    <Suspense fallback={<h1>Cargando ...</h1>}>
      <ErrorClient />
    </Suspense>
  );
}
