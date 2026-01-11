import {Playfair_Display, Saira} from "next/font/google";

export const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    weight: ["400", "500"],
});

export const saira = Saira({
    subsets: ["latin"],
    variable: "--font-saira",
    weight: ["100", "200", "300", "400"],
});