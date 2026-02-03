export default function AboutUsPage() {
    const configImage = "w-24 md:w-40";

    return (
        <section
            className="
                relative
                bg-[url('/images/background/BOWLS3-recort.JPG')]
                bg-cover
                bg-center
                flex
                items-center
                justify-center
                p-6
                md:p-10
            "
        >
            {/* Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    bg-black
                    opacity-70
                    z-10
                "
            />

            {/* Contenido */}
            <div
                className="
                    relative
                    z-25
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-center
                    gap-10
                    md:gap-60
                    px-6
                    md:px-40
                    py-10
                    md:py-50
                    w-full
                    max-w-6xl
                "
            >
                {/* Texto */}
                <div
                    className="
                        bg-gray-800
                        text-center
                        italic
                        rounded-3xl
                        text-white
                        p-6
                        opacity-90
                        max-w-xl
                    "
                >
                    <h1 className="font-playfair font-400 text-2xl md:text-3xl">
                        About Us
                    </h1>
                    <h2 className="font-saira text-base md:text-2xl mt-3">
                        Buscamos ofrecerte un servicio de alimentos frescos,
                        ricos y sobre todo saludables, cómodos para tu día a día
                    </h2>
                </div>

                {/* Imágenes */}
                <div
                    className="
                        relative
                        w-full
                        md:w-400
                        h-64
                        md:h-80
                        flex
                        items-center
                        justify-center
                    "
                >
                    {/* Bowl arriba izquierda */}
                    <div className="absolute top-0 left-0 w-24 md:w-40">
                        <img src="/images/Bowls/bowl_1.png" />
                    </div>

                    {/* Bowl centro abajo */}
                    <div className="
                        absolute
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        w-28
                        md:w-44
                    ">
                        <img src="/images/Bowls/bowl_2.png" />
                    </div>

                    {/* Bowl arriba derecha */}
                    <div className="absolute top-0 right-0 w-24 md:w-40">
                        <img src="/images/Bowls/bowl_3.png" />
                    </div>
                </div>
            </div>
        </section>
    );
}
