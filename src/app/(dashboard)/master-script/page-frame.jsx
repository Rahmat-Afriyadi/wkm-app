"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListItemScript from "./list-items-mst-script";
import { useSession } from "next-auth/react";

export default function PageFrame() {
  const router = useRouter();
  const { data: session } = useSession();

  // Interval auto-refresh halaman
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Auto-refresh triggered");
      router.refresh();
    }, 30 * 60 * 1000); // Interval 30 menit

    return () => clearInterval(interval);
  }, [router]);

  const handleGoToAddTicket = () => {
    router.push("master-script/create");
  };

  return (
    <>
      {/* Konten Utama */}
      <div className="w-full">
        <div className="flex justify-end">
          <button
            onClick={handleGoToAddTicket}
            className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Buat Script
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="overflow-y-auto max-h-96">
                <ListItemScript />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
