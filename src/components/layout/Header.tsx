"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Header(){
    const [open,setOpen] = useState(false);
    const { isLogged, loading, logout} = useAuth();

    if(loading) return null;

    const wButtons = !isLogged ? "w-120 right-125" : "w-160 right-100";

    return(
        <header className="relative w-full border-b-3 border-black p-4 h-25 bg-secondary z-50">
            <section className="absolute left-10 top-2 rounded-3xl hover:scale-105 transition-all">
                <a href="/">
                    <Image
                        className="rounded-3xl shadow-lg"
                        src = "/images/Logos/logoJuna.JPG" 
                        alt = "Logo JunaMeals"
                        width = {70}
                        height = {70}
                    />
                </a>
            </section>
            <section className = {`absolute ${wButtons} bg-gray-300 top-10  rounded-xl shadow-lg opacity-90 text-xl flex items-center gap-0 hover:bg-gray-800 hover:text-white`}>
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
            <section className="absolute bg-gray-300 top-10 right-10 rounded-xl shadow-lg opacity-90 text-xl flex items-center gap-0 hover:bg-gray-800">
                <Button variant="link">
                    <FaShoppingCart/>
                    <span className="h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Button>
            </section>
        </header>
    );
}