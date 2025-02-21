"use client";
import { Suspense, useEffect, useState } from "react";
import SidebarDesktop from "../../components/organisms/sidebar/sidebar-desktop";
import Header from "../../components/organisms/header/header";
import { signIn, useSession } from "next-auth/react";
import { useSelectedLayoutSegment } from "next/navigation";
import SidebarMobile from "@/components/organisms/sidebar/sidebar-mobile";
import AutoLogoutProvider from "@/components/providers/auto-logout-provider";
import AppHeader from "@/layout/app-header";
import AppSidebar from "@/layout/app-sidebar";
import Backdrop from "@/layout/backdrop";
import { useSidebar } from "@/context/sidebar-context";

export default function RootLayout({ children }) {
  // const [open, setOpen] = useState(true);
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const { data: session, status } = useSession();
  // const segment = useSelectedLayoutSegment();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     void signIn(segment ? segment : "");
  //   }
  // }, [status, segment]);
  // 0103 0724 1054 3062

  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen ? "ml-0" : isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";
  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}>
        {/* Header */}
        <AppHeader />
        {/* <Header /> */}
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">{children}</div>
      </div>
    </div>
    // <>
    //   <AutoLogoutProvider />
    //   <SidebarDesktop open={open} setOpen={setOpen} />
    //   <Header setSidebarOpen={setOpen} />
    //   <div className={`lg:pl-72 ${!open ? "-translate-x-[220px] " : ""} duration-700 ease-in-out`}>
    //     {/* <div className={` ${!open ? " " : ""} duration-700 ease-in-out`}> */}
    //     <main>
    //       <div className="px-4 mx-auto mb-6 sm:px-6 md:px-8 lg:mt-6 md:mt-4 sm:mt-2">
    //         <Suspense>{children}</Suspense>
    //       </div>
    //     </main>
    //   </div>
    // </>
  );
}
