import { FaInstagram, FaFacebook } from "react-icons/fa";


export default function Footer(){
    return(
        <footer className="w-full border-t p-4 text-sm text-white bg-[#154a28ff]">
            <div className="flex items-center justify-center">
                <div className="bg-white flex flex-col text-black rounded-3xl shadow-xl w-50 text-center hover:scale-105">
                    <h1 className="font-saira font-bold" >Contactanos</h1>
                    <a 
                        href="https://www.instagram.com/juna_meals/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="hover:underline">
                            <FaInstagram className="h-8 w-8 text-black"/>
                        </button>
                    </a>
                </div>
            </div>
            <h1>
                Copyright © {new Date().getFullYear()} JunaMeals. Todos los derechos reservados.
            </h1>
        </footer>
    );
}