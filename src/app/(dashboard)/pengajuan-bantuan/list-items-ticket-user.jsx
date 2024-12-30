"use server";

import { fetchUserTicket } from "@/server/pengajuan-bantuan/lists";
import ItemTicketQueue from "./item-ticket-queue";
import ItemTicketUser from "./item-ticket-user";

export default async function ListItemTicketUser() {
  // Panggil API 2: List Ticket User
  const { data: ticketUserData } = await fetchUserTicket();
  // console.log("User",ticketUserData);
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
}
