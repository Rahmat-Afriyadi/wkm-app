"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTicketQueue } from "@/server/pengajuan-bantuan/lists";
import ItemTicketQueue from "./item-ticket-queue";

export default function ListItemTicketQueue({ month, year }) {
  // Gunakan useQuery untuk mem-fetch data tiket
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ticketQueue", month, year], // Query key harus unik untuk setiap kombinasi parameter
    queryFn: () => fetchTicketQueue(month, year), // Panggil API dengan parameter
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Memuat data...
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center text-red-500 py-4">
        Terjadi kesalahan saat memuat data antrian tiket.
      </div>
    );
  }

  // Validasi respons data
  const ticketQueueData = data || [];
  if (ticketQueueData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        Data tidak ditemukan
      </div>
    );
  }

  // Render tabel data
  const tableQueueContent = ticketQueueData.map((ticket, i) => (
    <ItemTicketQueue key={i} id={i} ticket={ticket} />
  ));

  return (
    <div className="space-y-10">
      {/* Tabel 1: List Ticket Queue */}
      <div>
        <h2 className="text-lg font-semibold mb-4">List Antrian Tiket</h2>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">No Ticket</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nama</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jenis Ticket</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">User IT</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assign Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableQueueContent}
          </tbody>
        </table>
      </div>
    </div>
  );
}
