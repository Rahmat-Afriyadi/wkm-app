"use server";

import { fetchUserTicket } from "@/server/pengajuan-bantuan/lists";
import ItemTicketUser from "./item-ticket-user";

export default async function ListItemTicketUser() {
  try {
    // Panggil API 2: List Ticket User
    const response = await fetchUserTicket();
    const ticketUserData = response?.data || [];

    // Jika data tidak ditemukan, tampilkan pesan "Tidak Ada Data"
    if (ticketUserData.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
          Data Tiket User Tidak Ada
        </div>
      );
    }

    // Render Item untuk Tabel 2 (User)
    const tableUserContent = ticketUserData.map((ticket, i) => (
      <ItemTicketUser key={i} id={i} ticket={ticket} />
    ));

    return (
      <div className="space-y-10">
        {/* Tabel 2: List Ticket User */}
        <div>
          <h2 className="text-lg font-semibold mb-4">List Tiket Anda</h2>
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
              {tableUserContent.length > 0 ? (
                tableUserContent
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
  } catch (error) {
    // Tangani error jika terjadi kesalahan pada fetch
    console.error("Error fetching user ticket data:", error);
    return (
      <div className="text-center text-red-500 py-4">
        Terjadi kesalahan saat memuat data
      </div>
    );
  }
}
