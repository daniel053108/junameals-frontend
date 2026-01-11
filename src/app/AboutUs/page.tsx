import { playfair } from "@/lib/fonts";

export default function AboutUsPage(){
    return(
        <section className = "relative bg-[#67904cff] text-white p-20 h-100">
            <div className="absolute left-30 text-center italic bg-green-900 rounded-3xl opacity-60 w-100 p-4">
                <h1 className= "font-playfair font-400 text-3xl ">About Us</h1>
                <h2 className="font-saira text-2xl">Buscamos ofrecerte un servicio de alimentos, frescos, ricos y sobre todo saludables, comodos para tu dia a dia</h2>
            </div>
            <div className="absolute right-100 top-50 h-40 w-40">
                <img src = "/images/Bowls/bowl_2.png"></img>
            </div>
            <div className="absolute right-60  h-40 w-40">
                <img src = "/images/Bowls/bowl_1.png"></img>
            </div>
            <div className="absolute right-140 h-40 w-40">
                <img src = "/images/Bowls/bowl_3.png"></img>
            </div>
        </section>
    );
}