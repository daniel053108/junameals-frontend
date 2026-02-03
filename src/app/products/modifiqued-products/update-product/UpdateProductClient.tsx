"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
export default function UpdateProductClient() {
    const {user} = useAuth();
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("productId");

    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        available: false,
        recommended: false,
        weekly_menu: false,
    });

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
                { credentials: "include" }
            );

            const data = await res.json();

            setForm({
                name: data.name,
                description: data.description,
                price: data.price,
                available: data.available,
                recommended: data.recommended,
                weekly_menu: data.weekly_menu,
            });

            setCurrentImage(data.image);
            setLoading(false);
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox" && e.target instanceof HTMLInputElement) {
            setForm({ ...form, [name]: e.target.checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", String(productId));
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("available", String(form.available));
        formData.append("recommended", String(form.recommended));
        formData.append("weekly_menu", String(form.weekly_menu));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/update-product`,
            {
                method: "POST",
                credentials: "include",
                body: formData,
            }
        );

        if (!res.ok) {
            console.error("Error al actualizar");
            return;
        }

        router.back();
        router.refresh();
    };

    if(user?.role !== "admin") return (<h1>Acceso Denegado</h1>);

    if (loading) return <p className="text-center">Cargando producto...</p>;

    return (
        <section className="max-w-xl mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">Modificar producto</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                {currentImage && (
                    <img
                        src={currentImage}
                        className="w-40 rounded"
                        alt="Imagen actual"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border"
                />

                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        name="available"
                        checked={form.available}
                        onChange={handleChange}
                    />
                    Disponible
                </label>

                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        name="recommended"
                        checked={form.recommended}
                        onChange={handleChange}
                    />
                    Recomendado
                </label>

                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        name="weekly_menu"
                        checked={form.weekly_menu}
                        onChange={handleChange}
                    />
                    Menú semanal
                </label>

                <button className="bg-black text-white px-4 py-2 rounded">
                    Guardar cambios
                </button>
            </form>
        </section>
    );
}
