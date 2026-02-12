"use client";
import { useEffect, useState, useRef } from "react";
import {product} from "./ProductsGrid";
import { FaChevronRight, FaChevronLeft} from  "react-icons/fa";

type Direction = "left" | "right";

export default function RecommendedCarousel(){
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const[products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/recommended`)
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
            if(!data){
                setProducts([]);
                return;
            }
            setProducts(data)
        })
        .catch((err) => console.log(err));
    }, []);

    const scroll = (direction: Direction) => {
        const scrollAmount = 300;
        carouselRef.current?.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    }

    const designCarrousel = products.length !== 0 ? "flex gap-4 overflow-x-auto scroll-smooth px-10 h-60" : " ";

    return(
        <section className="relative w-full bg-secondary p-3 ">
            <h1 className="font-playfair text-white  text-3xl italic text-center mb-4 bg-gray-400 rounded-xl">Recomendaciones de Hoy</h1>
            {products.length !== 0 && (
                <button 
                    className="absolute left-0 top-1/2 bg-primary rounded-3xl w-6 h-10 text-white
                                hover:bg-green-700 hover:scale-105 hover:text-xl " 
                    onClick={() => scroll("left")}
                >
                    <FaChevronLeft/>
                </button>
            )}
            <div ref = {carouselRef} 
                className={`${designCarrousel}`}>
                {products.length === 0 ? (
                    <h1 
                        className="font-saira bg-gray-500 shadow-xl rounded-xl text-white text-center text-3xl h-15"
                    >
                        Ups, al parecer no hay recomendados
                    </h1>
                ) :
                products?.map((product:product) => {
                    if(!product.available || !product.recommended) return;
                    return(
                    <div key={product.id}  className="min-w-[250px] bg-white rounded-xl shadow">
                        <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
                        <div className="pl-4">
                            <h3 className="font-saira italic" >{product.name}</h3>
                            <p className="text-green-600 font-saira">${product.price}</p>    
                        </div>
                    </div>
                    
                )})}
            </div>
            {products.length !== 0 && (
                <button 
                    className="absolute right-0 top-1/2 bg-primary rounded-3xl w-6 h-10 text-white
                                hover:bg-green-700 hover:scale-105 hover:text-xl"
                    onClick={() => scroll("right")} 
                >
                    <FaChevronRight/>
                </button>
            )}
        </section>
    );
} 