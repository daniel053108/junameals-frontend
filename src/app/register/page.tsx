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
        <section className="h-160">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center h-140 w-full p-10"
            >
                <div className="flex flex-col gap-10 bg-secondary rounded-3xl w-100 p-20 items-center">
                    <p className="font-playfair scale-160 font-bold">
                        Crear Cuenta
                    </p>

                    <input
                        className="scale-150 shadow-lg rounded-xl hover:scale-160 p-1 transition-all"
                        type="text"
                        name="user_name"
                        value={form.user_name}
                        onChange={handleChange}
                        placeholder="Nombre de Usuario"
                        required
                    />

                    <input
                        className="scale-150 shadow-lg rounded-xl hover:scale-160 p-1 transition-all"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />

                    {/* PHONE NUMBER */}
                    <input
                        className="scale-150 shadow-lg rounded-xl hover:scale-160 p-1 transition-all"
                        type="tel"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder="Número de teléfono"
                        required
                    />

                    {/* PASSWORD CON OJITO */}
                    <div className="flex flex-row items-center gap-2">
                        <input
                            className="scale-150 shadow-lg rounded-xl hover:scale-160 p-1 transition-all"
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
                            className="z-50 text-2xl"
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
