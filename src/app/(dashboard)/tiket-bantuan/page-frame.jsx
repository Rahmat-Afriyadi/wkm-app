"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListItemTicketIt from "./list-items-ticket-it";
import ListItemTicketQueue from "./list-items-ticket-queue";
import { useSession } from "next-auth/react";

export default function PageFrame({children, searchParams}) {
  const router = useRouter();
  const { data: session } = useSession(); 

  // Mendapatkan bulan dan tahun sekarang
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString(); // Bulan dalam angka (1-12)
  const currentYear = currentDate.getFullYear().toString(); // Tahun sekarang

  const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Default bulan saat ini
  const [selectedYear, setSelectedYear] = useState(currentYear); // Default tahun saat ini

  // Fungsi untuk menghasilkan opsi bulan
  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  // Fungsi untuk menghasilkan opsi tahun (5 tahun terakhir)
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  };

  const years = getYears();

  // Fungsi untuk refresh data berdasarkan parameter bulan dan tahun
  const handleFilterChange = () => {
    console.log("Filter applied: ", { selectedMonth, selectedYear });
    // Implementasikan panggilan API di sini dengan parameter bulan dan tahun
  };

  // Interval auto-refresh halaman
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Auto-refresh triggered");
      router.refresh();
    }, 30 * 60 * 1000); // Interval 30 menit

    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      {session?.user.role == 8 && (
        <div className="mb-4 flex items-center space-x-4">
          {/* Dropdown Bulan */}
          <div className="form-group">
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700"
            >
              Pilih Bulan
            </label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Tahun */}
          <div className="form-group">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Pilih Tahun
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol Apply Filter */}
          <button
            onClick={handleFilterChange}
            className="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
          >
            Terapkan Filter
          </button>
        </div>
      )}

      {/* Konten Utama */}
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {session?.user.role == 7 && (
                <div className="overflow-y-auto max-h-96">
                  <ListItemTicketIt searchParams={searchParams} />
                </div>
              )}
              {/* Menyertakan ListItem dan meneruskan searchParams untuk digunakan di dalamnya */}
              {session?.user.role == 8 && (
                <div className="overflow-y-auto max-h-96">
                  <ListItemTicketQueue month={selectedMonth} year={selectedYear} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
