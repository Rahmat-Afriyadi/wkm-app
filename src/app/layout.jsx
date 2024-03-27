"use client";
import "./globals.css";
import { kollektif, inter, hammerSmith } from "./fonts";



export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${inter.variable} ${kollektif.variable} ${hammerSmith.variable} h-full `}>
      <body className="">
            {children}
      </body>
    </html>
  );
}
