export default function AboutUsPage(){
    const configImage = "w-40";
    return(
        <section className = "bg-[url('/images/background/BOWLS3-recort.JPG')] bg-cover flex items-center justify-center p-10">
            <div className="absolute bg-black opacity-70 w-350 h-180 rounded-4xl z-10" ></div>
            <div className="flex flex-row items-center justify-center gap-60 px-40 py-50 w-350 h-180 rounded-4xl z-50">
                <div className="bg-gray-800 text-center italic rounded-3xl text-white p-5 opacity-80 ">
                    <h1 className= "font-playfair font-400 text-3xl ">About Us</h1>
                    <h2 className="font-saira text-2xl">Buscamos ofrecerte un servicio de alimentos, frescos, ricos y sobre todo saludables, comodos para tu dia a dia</h2>
                </div>
                <div className="relative w-400 h-80 flex flex-row">
                    <div className={`${configImage} absolute right-0`}>
                        <img src = "/images/Bowls/bowl_2.png"></img>
                    </div>
                    <div className={`${configImage} absolute left-0`}>
                        <img src = "/images/Bowls/bowl_1.png"></img>
                    </div>
                    <div className={`${configImage} absolute left-37 top-30`}>
                        <img src = "/images/Bowls/bowl_3.png"></img>
                    </div>
                </div>
            </div>
        </section>
    );
}