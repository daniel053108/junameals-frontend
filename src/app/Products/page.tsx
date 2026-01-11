type product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

async function getProducts(): Promise<product[]> {
  const res = await fetch("http://localhost:4000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="p-8">
      <h1 className="text-3xl font-saira text-5xl italic mb-6">Nuestros productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-playfair italic mt-3">
              {product.name}
            </h2>
            <p className="text-gray-600 italic">{product.description}</p>
            <p className="text-lg font-bold mt-2">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
