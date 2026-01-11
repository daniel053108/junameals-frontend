export default function Footer(){
    return(
        <footer className="w-full border-t p-4 text-center text-sm text-white bg-[#154a28ff]">
            © {new Date().getFullYear()} JunaMeals. Todos los derechos reservados.
        </footer>
    );
}