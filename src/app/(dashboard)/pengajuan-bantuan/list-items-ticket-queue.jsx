"use server";

import { fetchTicketQueue } from "@/server/pengajuan-bantuan/lists";
import ItemTicketQueue from "./item-ticket-queue";

export default async function ListItemTicketQueue() {
  try {
    // Panggil API 1: List Ticket Queue
    const response = await fetchTicketQueue("", "");
    const ticketQueueData = response?.data || [];

    // Jika data tidak ditemukan, tampilkan pesan "Tidak Ada Data"
    if (ticketQueueData.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
           Data Antrian Tiket Tidak Ada
        </div>
      );
    }

    // Render Item untuk Tabel 1 (Queue)
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
              </tr>
            </thead>
            <tbody className="bg-white">
              {tableQueueContent.length > 0 ? (
                tableQueueContent
              ) : (
                <tr>
                  <td colSpan="6" className="px-3 py-4 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    // Tangani error jika terjadi kesalahan pada fetch
    console.error("Error fetching ticket queue data:", error);
    return (
      <div className="text-center text-red-500 py-4">
        Terjadi kesalahan saat memuat data
      </div>
    );
  }
}
