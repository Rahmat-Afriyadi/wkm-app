"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListItemTicketIt from "./list-items-ticket-it";
import ListItemTicketQueue from "./list-items-ticket-queue";
import { useSession } from "next-auth/react";
import ButtonExportDataTiketBantuan from "@/components/form/tiket-bantuan/form-export";

export default function PageFrame() {
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

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    router.refresh();
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    router.refresh();
  };

  // Interval auto-refresh halaman
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Auto-refresh triggered");
      router.refresh();
    }, 30 * 60 * 1000); // Interval 30 menit

    return () => clearInterval(interval);
  }, [router]);

  const handleExport = () => {
    // Fungsi untuk mengekspor data, misalnya panggil API untuk mengunduh data
    console.log("Export data");
  };

  return (
    <>{session?.user.role == 8 && (
      <div className="mb-4 flex items-center justify-between">
        {/* Kontainer untuk Dropdown Bulan dan Tahun */}
        <div className="flex items-center space-x-4">
          {/* Dropdown Bulan */}
          <div className="form-group">
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="mt-1 block w-auto border-gray-500 rounded-md shadow-sm"
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
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="mt-1 block w-auto border-gray-500 rounded-md shadow-sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
    
        <ButtonExportDataTiketBantuan
          params={{
            year: selectedYear,
            month: selectedMonth,
          }}
          />
      </div>
    )}
      {/* Konten Utama */}
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {session?.user.role == 7 && (
                <div className="overflow-y-auto max-h-96">
                  <ListItemTicketIt />
                </div>
              )}
              {/* Menyertakan ListItem dan meneruskan searchParams untuk digunakan di dalamnya */}
              {session?.user.role == 8 && (
                <div className="overflow-y-auto max-h-96">
                  <ListItemTicketQueue
                    month={selectedMonth}
                    year={selectedYear}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
