"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function LoginPage(){

    const { isLogged, setUserModifiqued } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({
        user_email: "",
        password: "",        
    });

    const [error,setError] = useState("");

    const [sucess,setSucess] = useState(false);

    useEffect(() => {
        if(isLogged){
            router.push("/");
        }
    },[isLogged]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSucess(false);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
            credentials: "include",
        });

        const data = await res.json();

        if(!res.ok){
            setError( data.error || "Error al Iniciar Sesion");
            return;
        }else if(res.ok){
            setUserModifiqued(true);
        }

        setSucess(true);
        setForm({user_email: "", password: ""});
        router.push("/");
    };

    return(
        <form onSubmit={handleSubmit} className="flex flex-col items-center h-140 w-full p-10">
            <div className="flex flex-col gap-10 bg-secondary rounded-3xl w-100 p-20 items-center">
                <p className="font-playfair scale-160 font-bold ">Iniciar Sesion</p>
                <input 
                    className="scale-150 scale-150 shadow-lg rounded-xl hover:scale-160 p-1 transition-all"    
                    type="text"
                    name="user_email"
                    value={form.user_email}
                    onChange = {handleChange}
                    placeholder="Nombre de Usuario o Correo electronico"
                    required
                />
                <input
                    className="scale-150 shadow-lg rounded-xl hover:scale-160 p-1 transition-all"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                />            

                <Button type="submit">Iniciar Sesion</Button>
                <Button variant="none" className="hover:underline underline-offset-5 font-saira font-bold hover:scale-105 transition-all" 
                        href="/register" 
                >Crear Cuenta</Button>
            </div>
            {error && <p>{error}</p>}
            {sucess && <p>Inicio de Sesion Correcto</p>}
        </form>
    );
}