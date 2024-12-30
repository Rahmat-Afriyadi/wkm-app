"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PageFrame({ children }) {
  const router = useRouter();

  // Fungsi untuk navigasi ulang ke halaman saat auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Auto-refresh triggered"); // Debugging
      router.refresh(); // Melakukan refresh ke halaman yang sama
    }, 30 * 60 * 1000); // Interval 3 menit (3 * 60 * 1000 ms)

    return () => clearInterval(interval); // Membersihkan interval ketika komponen di-unmount
  }, [router]);

  // Fungsi untuk mengarahkan ke halaman add-ticket
  const handleGoToAddTicket = () => {
    router.push("pengajuan-bantuan/create");
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-end">
          <button
            onClick={handleGoToAddTicket}
            className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Buat Pengajuan
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
