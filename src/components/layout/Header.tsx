"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { isLogged, loading, logout } = useAuth();
    const router = useRouter();

    if (loading) return null;

    return (
        <header className="flex items-center justify-between w-full border-b-3 border-black p-4 bg-secondary z-50">
            
            {/* Logo */}
            <a href="/" className="rounded-3xl hover:scale-105 transition-all">
                <Image
                    className="rounded-3xl shadow-lg"
                    src="/images/Logos/logoJuna.JPG"
                    alt="Logo JunaMeals"
                    width={70}
                    height={70}
                />
            </a>

            {/* Menú Desktop */}
            <nav className="hidden md:flex bg-gray-300 rounded-xl shadow-lg text-xl items-center hover:bg-gray-800 hover:text-white transition">
                <Button href="/" variant="link">Inicio</Button>

                <div className="relative">
                    <Button variant="link" onClick={() => setOpen(!open)}>Productos</Button>
                    {open && (
                        <div className="absolute top-full left-0 bg-gray-800 rounded-b-xl z-50 shadow-xl">
                            <Button href="/products/bowls" variant="popover" onClick={() => setOpen(false)}>Bowls</Button>
                            <Button href="/products/weekly-menu" variant="popover" onClick={() => setOpen(false)}>Menú Semanal</Button>
                        </div>
                    )}
                </div>

                {!isLogged && <Button variant="link" href="/login">Iniciar Sesión</Button>}

                {isLogged && (
                    <>
                        <Button variant="link" href="/user/me">Mi Perfil</Button>
                        <Button variant="link" href="/user/orders">Mis pedidos</Button>
                        <Button
                            variant="link"
                            onClick={() => {
                                logout();
                                router.push("/");
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </>
                )}
            </nav>

            {/* Carrito */}
            <Button variant="link" href="/user/cart" className="hidden md:flex text-3xl">
                <FaShoppingCart />
            </Button>

            {/* Botón hamburguesa móvil */}
            <Button
                variant="link"
                className="md:hidden text-3xl"
                onClick={() => setMobileMenu(!mobileMenu)}
            >
                {mobileMenu ? <FaTimes /> : <FaBars />}
            </Button>

            {/* Menú móvil */}
            {mobileMenu && (
                <div className="absolute top-24 left-0 w-full bg-gray-800 text-white flex flex-col items-center z-50 gap-4 py-6 md:hidden shadow-xl">
                    <Button href="/" variant="link" onClick={() => setMobileMenu(false)}>Inicio</Button>
                    <Button href="/products/bowls" variant="link" onClick={() => setMobileMenu(false)}>Bowls</Button>
                    <Button href="/products/weekly-menu" variant="link" onClick={() => setMobileMenu(false)}>Menú Semanal</Button>

                    {!isLogged && (
                        <Button href="/login" variant="link" onClick={() => setMobileMenu(false)}>
                            Iniciar Sesión
                        </Button>
                    )}

                    {isLogged && (
                        <>
                            <Button href="/user/me" variant="link" onClick={() => setMobileMenu(false)}>Mi Perfil</Button>
                            <Button href="/user/orders" variant="link" onClick={() => setMobileMenu(false)}>Mis pedidos</Button>
                            <Button
                                variant="link"
                                onClick={() => {
                                    logout();
                                    setMobileMenu(false);
                                    router.push("/");
                                }}
                            >
                                Cerrar Sesión
                            </Button>
                        </>
                    )}

                    <Button href="/user/cart" variant="link" onClick={() => setMobileMenu(false)}>
                        <FaShoppingCart />
                    </Button>
                </div>
            )}
        </header>
    );
}
