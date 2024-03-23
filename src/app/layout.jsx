"use client";
import "./globals.css";
import { kollektif, inter, hammerSmith } from "./fonts";
import SidebarDesktop from "@/components/organisms/sidebar/sidebar-desktop";
import { Suspense, useState } from "react";



export default function RootLayout({ children }) {
  const [open, setOpen] = useState(true)

  return (
    <html lang="en" className={`${inter.variable} ${kollektif.variable} ${hammerSmith.variable} h-full `}>
      <body className="">
          <SidebarDesktop open={open} setOpen={setOpen}/>
          <div className={`lg:pl-72 ${!open? "-translate-x-[220px]" : ""} duration-700 ease-in-out`}>
            <main>
              <div className="px-4 mx-auto mb-6 max-w-7xl sm:px-6 md:px-8 lg:mt-6 md:mt-4 sm:mt-2">
                <Suspense>
                  {children}
                </Suspense>
              </div>
            </main>
        </div>
      </body>
    </html>
  );
}
