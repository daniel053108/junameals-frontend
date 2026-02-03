"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/authContext";

export default function AddProductPage() {
    const {user} = useAuth();
    
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
    });

    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            setMessage("Debes subir una imagen");
            return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("image", image);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products/add-product`,
                {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                }
            );

            if (!res.ok) {
                setMessage("Error al crear el producto");
                return;
            }

            router.back();
        } catch (error) {
            console.error(error);
            setMessage("Error en el servidor");
        }
    };

    if(user?.role !== "admin") return (<h1>Acceso Denegado</h1>);

    return (
        <section className="flex p-5 flex-col items-center">
            <h1 className="text-center font-playfair font-bold text-3xl mb-4">
                Agregar producto
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-secondary rounded-xl p-5 font-saira flex flex-col gap-4 w-80"
            >
                <div>
                    <label>Nombre</label>
                    <input
                        name="name"
                        onChange={handleChange}
                        className="w-full px-3 border rounded-xl"
                    />
                </div>

                <div>
                    <label>Descripción</label>
                    <input
                        name="description"
                        onChange={handleChange}
                        className="w-full px-3 border rounded-xl"
                    />
                </div>

                <div>
                    <label>Precio</label>
                    <input
                        name="price"
                        type="number"
                        inputMode="numeric"
                        onChange={handleChange}
                        className="w-full px-3 border rounded-xl"
                    />
                </div>

                <div>
                    <label>Imagen</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 border rounded-xl bg-white"
                    />
                </div>

                <Button type="submit" className="mt-4">
                    Agregar producto
                </Button>
            </form>

            {message && <p className="mt-4 text-red-600">{message}</p>}
        </section>
    );
}
