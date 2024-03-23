import localFont from "next/font/local";
import { Inter, Hammersmith_One } from "next/font/google";

export const kollektif = localFont({
  src: [
    {
      path: "../../public/fonts/kollektif/Kollektif.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/kollektif/Kollektif-Bold.ttf",
      style: "bold",
    },
    {
      path: "../../public/fonts/kollektif/Kollektif-Italic.ttf",
      style: "italic",
    },
    {
      path: "../../public/fonts/kollektif/Kollektif-BoldItalic.ttf",
      style: "bolditalic",
    },
  ],
  variable: "--font-kollektif",
});

export const inter = Inter({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-inter",
});
export const hammerSmith = Hammersmith_One({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-hammersmith",
});
