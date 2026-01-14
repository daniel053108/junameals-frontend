import ProductsGrid from "@/components/ProductsGrid";

type product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

async function getProducts(): Promise<product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="p-8">
      <section className="flex flex-col items-center">
        <div className="bg-secondary w-200 rounded-xl mb-4">
          <h1 className="font-playfair text-center text-5xl italic">
            Nuestros Bowls
          </h1>
        </div>
      </section>

      <ProductsGrid products={products} />
    </section>
  );
}
