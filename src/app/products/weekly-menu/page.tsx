import ProductsGrid, {product} from "@/components/ProductsGrid";

async function getWeeklyMenu() : Promise<product[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/weeklyMenu`,
        { cache: "no-store" }
    );

    if(!res.ok) return [];

    return res.json(); 
}

export default async function WeeklyMenuPage(){
    const WeeklyMenu = await getWeeklyMenu();
    
    return(
        <section className="flex flex-col items-center p-4">
            <div>
                <img className="w-200 rounded-3xl" src="/images/WeeklyMenus/WeeklyMenu_1.png"/>
            </div>
            <div className="p-4">
                <h1 className="text-center font-playfair italic text-4xl bg-secondary p-4 my-2 rounded-xl shadow-lg"
                >Selecciona el de tu agrado!!</h1>
                <ProductsGrid products={WeeklyMenu} />
            </div>
        </section>
    );
}