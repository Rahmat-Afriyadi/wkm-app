"use client";
import "./globals.css";
import { kollektif, inter, hammerSmith } from "./fonts";
import Providers from "./providers";
import Script from "next/script";
import { ThemeProvider } from "@/context/theme-context";
import { SidebarProvider } from "@/context/sidebar-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${kollektif.variable} ${hammerSmith.variable} h-full `}>
      <body className="">
        <Providers>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
          {/* {children} */}
        </Providers>
      </body>
    </html>
  );
}
