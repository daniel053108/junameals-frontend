import Button from "@/components/ui/Button"
import Recommended from "@/components/RecommendedCarousel";

export default function HomePage() {
    return(
      <section id = "HomePage" className="bg-white text-[#CF642C]">
        {/*Hero*/}
        <section className="bg-[url('/images/Background/BOWLS2.JPG')] bg-cover bg-center h-200 text-white flex items-center justify-center p-50">
          <section className = "bg-black rounded-3xl p-2 opacity-80">
            <h1 className="text-5xl font-playfair italic text-center">
              Bowls Saludables y Meal Preps listos para hacerte la semana mas facil.
            </h1>
            <section className= "text-center font-bold italic font-saira">
              <Button href = "/about-us"> Sobre Nosotros </Button>
            </section>
          </section>
        </section>

        {/*Recommended*/}
        <Recommended />
      </section>
    );
}
