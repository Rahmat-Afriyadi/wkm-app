"use client";
import { Suspense, useState } from "react";
import SidebarDesktop from "../../components/organisms/sidebar/sidebar-desktop";



export default function RootLayout({ children }) {
  const [open, setOpen] = useState(true)

  return (
          <>
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
          </>
  );
}
