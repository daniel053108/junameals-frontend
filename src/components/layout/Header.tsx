"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useAuth } from "@/context/authContext";

export default function Header(){
    const [open,setOpen] = useState(false);
    const { isLogged, loading, logout} = useAuth();

    if(loading) return null;

    const wButtons = !isLogged ? "w-120" : "w-160";

    return(
        <header className="relative w-full border-b-3 border-black p-4 h-25 bg-secondary z-50">
            <section className="absolute left-10 top-5 h-20 w-15">
                <Image
                    src = "/images/Logos/logoJuna.JPG" 
                    alt = "Logo JunaMeals"
                    width = {100}
                    height = {100}
                />
            </section>
            <section className = {`${wButtons} absolute top-10 right-10 rounded-xl shadow-lg opacity-90 text-xl flex items-center gap-0 hover:bg-gray-800`}>
                <Button href = "/" variant="link" onClick={() => setOpen(false)}> Inicio </Button>
                <section className="relative w-40">
                    <Button variant="link" onClick={() => setOpen(!open)} > Productos </Button>

                    {open && (
                        <section className="absolute right-0 bg-gray-800 shadow-xl rounded-b-xl">
                            <Button href="/Products/Bowls" variant="popover" onClick={() => setOpen(false)}> Bowls </Button>
                            <Button href="/Products/WeeklyMenu" variant="popover" onClick={() => setOpen(false)}> Menu Semanal </Button>
                        </section>
                    )}
                </section>
                {!isLogged && <Button variant="link" href="/Login" onClick={() => setOpen(false)}> Iniciar Sesion </Button>}
                {isLogged && (
                    <>
                        <Button variant="link" href="/me" onClick={() => setOpen(false)}>Mi Perfil</Button>
                        <Button variant="link" onClick={() => {
                            logout();
                            setOpen(false);
                        }}>Cerrar Sesion</Button>
                    </>
                )}
            </section>
        </header>
    );
}