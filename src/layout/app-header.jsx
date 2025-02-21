"use client";
// import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
// import NotificationDropdown from "@/components/header/NotificationDropdown";
// import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/sidebar-context";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

const AppHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();

  const handleMessage = () => {
    var today = new Date();
    var hrs = today.getHours();

    if (hrs < 12) {
      setMessage("Good morning");
    } else if (hrs < 18) {
      setMessage("Good afternoon");
    } else {
      setMessage("Good evening");
    }
  };

  useEffect(() => {
    handleMessage();
  }, []);

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        if (inputRef.current) inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky z-10 top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between flex-grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? "X" : "☰"}
          </button>

          <Link href="/" className="lg:hidden">
            <Image width={154} height={32} className="dark:hidden" src="./images/logo/logo.svg" alt="Logo" />
            <Image width={154} height={32} className="hidden dark:block" src="./images/logo/logo-dark.svg" alt="Logo" />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            ●●●
          </button>

          <div className="hidden lg:block">
            <div className="relative mx-4">
              <div className="flex items-center max-w-xs text-sm">
                <div className="hidden mr-0.5 lg:block">
                  <strong>{message},</strong>
                </div>
                <span className="hidden text-sm font-medium text-gray-700 lg:block">
                  <span className="sr-only">Open user menu for </span>
                  {session?.user.name}
                </span>
              </div>
            </div>
            {/* <form>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search or type command..."
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />
                <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                  <span> ⌘ </span>
                  <span> K </span>
                </button>
              </div>
            </form> */}
          </div>
        </div>
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            {/* <ThemeToggleButton /> */}
            {/* <NotificationDropdown /> */}
          </div>
          {/* <UserDropdown /> */}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
