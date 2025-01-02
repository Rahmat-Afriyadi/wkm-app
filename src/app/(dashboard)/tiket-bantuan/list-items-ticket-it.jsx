"use client";

import { useQuery } from "@tanstack/react-query";
import ItemTicketIt from "./item-ticket-it";
import { fetchTicketIT } from "@/server/pengajuan-bantuan/lists";

export default function ListItemTicketIt() {
  // Gunakan useQuery untuk memanggil API dengan fetchTicketIT
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ticketIT"],
    queryFn: fetchTicketIT,
  });

  // Ambil data tiket dari hasil query
  const ticketITData = data?.data;

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-4">Memuat data...</div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center text-red-500 py-4">
        Terjadi kesalahan saat memuat data tiket.
      </div>
    );
  }

  // Jika data kosong
  if (!ticketITData || ticketITData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">Data tidak ditemukan</div>
    );
  }

  // Render tabel data
  const tableITContent = ticketITData.map((ticket, i) => (
    <ItemTicketIt key={i} id={i} ticket={ticket} />
  ));

  return (
    <div className="space-y-10">
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
            {tableITContent.length > 0 ? (
              tableITContent
            ) : (
              <tr>
                <td colSpan="7" className="px-3 py-4 text-center text-gray-500">
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
