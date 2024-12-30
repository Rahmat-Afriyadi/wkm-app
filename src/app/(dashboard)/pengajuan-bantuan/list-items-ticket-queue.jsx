"use server";

import { fetchTicketQueue } from "@/server/pengajuan-bantuan/lists";
import ItemTicketQueue from "./item-ticket-queue";

export default async function ListItemTicketQueue() {
  // Panggil API 1: List Ticket Queue
  const { data: ticketQueueData } = await fetchTicketQueue("", "");

  // console.log("queue",ticketQueueData); // Log data untuk memastikan diterima dengan benar

  // Jika data tidak ditemukan, tampilkan pesan error
  if (!ticketQueueData || ticketQueueData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        -
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
}
