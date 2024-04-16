"use client";
import "./globals.css";
import { kollektif, inter, hammerSmith } from "./fonts";
import Providers from "./providers";
import Script from "next/script";


export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${inter.variable} ${kollektif.variable} ${hammerSmith.variable} h-full `}>

      <body className="">
            <Providers>
              {children}
            </Providers>
      </body>
    </html>
  );
}
