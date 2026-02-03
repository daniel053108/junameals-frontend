import CartItemsGrid from "@/components/CartItemsGrid";

export default function CartPage() {
    return(
    <section className="flex items-center justify-center flex-col p-4">
        <div className="bg-secondary w-200 rounded-xl mb-4">
            <h1 className="font-playfair text-center text-5xl italic">Tu Carrito</h1>
        </div>
        <CartItemsGrid />
    </section>  
    );
};
