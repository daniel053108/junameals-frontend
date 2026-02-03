import { Suspense } from "react";
import UpdateProductClient from "./UpdateProductClient";
import { useAuth } from "@/context/authContext";

export default function BuyPage() {

    return (
        <Suspense fallback={<h1>Cargando...</h1>}>
        <UpdateProductClient />
        </Suspense>
    );
}
