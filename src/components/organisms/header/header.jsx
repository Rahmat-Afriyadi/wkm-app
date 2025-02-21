"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Header({ setSidebarOpen }) {
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

  return (
    <>
      <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {/* <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button> */}

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6"></div>
        <div className="flex items-center ml-4 md:ml-6">
          {/* Profile dropdown */}
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
        </div>
      </div>
    </>
  );
}
