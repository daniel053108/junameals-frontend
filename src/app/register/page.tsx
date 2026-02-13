"use client";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const [form, setForm] = useState({
        user_name: "",
        email: "",
        phone_number: "",
        password: "",
    });

    const [error, setError] = useState<string>("");
    const [sucess, setSucess] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSucess(false);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Error al registrar");
            return;
        }

        setSucess(true);
        setForm({
            user_name: "",
            email: "",
            phone_number: "",
            password: "",
        });
    };

    return (
        <section className="h-170">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center h-140 w-full p-10"
            >
                <div className="flex flex-col gap-10 bg-secondary rounded-3xl w-100 p-20 items-center">
                    <p className="font-playfair scale-160 font-bold">
                        Crear Cuenta
                    </p>

                    <input
                        className="w-80 text-lg px-4 hover:scale-105 py-2 shadow-lg rounded-xl focus:scale-105 transition"
                        type="text"
                        name="user_name"
                        value={form.user_name}
                        onChange={handleChange}
                        placeholder="Nombre de Usuario"
                        required
                    />

                    <input
                        className="w-80 text-lg px-4 hover:scale-105 py-2 shadow-lg rounded-xl focus:scale-105 transition"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />

                    {/* PHONE NUMBER */}
                    <input
                        className="w-80 text-lg px-4 hover:scale-105 py-2 shadow-lg rounded-xl focus:scale-105 transition"
                        type="tel"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder="Número de teléfono"
                        required
                    />

                    {/* PASSWORD CON OJITO */}
                    <div className="relative flex flex-row">
                        <input
                            className="w-80 text-lg px-4 hover:scale-105 py-2 shadow-lg rounded-xl focus:scale-105 transition"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute hover:scale-120 top-2 right-4 text-2xl transition z-50"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <Button type="submit">Crear Cuenta</Button>
                    {sucess && (
                        <Button variant="link" href="/login">
                            Regresar
                        </Button>
                    )}
                </div>

                {error && <p>{error}</p>}
                {sucess && <p>Cuenta creada correctamente</p>}
            </form>
        </section>
    );
}
