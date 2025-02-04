"use client";

import { useQuery } from "@tanstack/react-query";
import ItemScript from "./item-mst-script";
import { MstScriptList } from "@/server/master/mst-script";

export default function ListItemScript() {
  // Gunakan useQuery untuk memanggil API dengan fetchTicketIT
  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-script"], // Unik untuk query ini
    queryFn: MstScriptList, // Fungsi API
  });

  // Ambil data tiket dari hasil query
  const listScriptData = data || []; // Pastikan array tidak undefined

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
  if (listScriptData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">Data tidak ditemukan</div>
    );
  }

  // Render tabel data
  const tableScriptContent = listScriptData.map((data, i) => (
    <ItemScript key={data?.id || i} id={data?.id || i} data={data} />
  ));

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-semibold mb-4">List Script</h2>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Judul</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status Aktif</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableScriptContent.length > 0 ? (
              tableScriptContent
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
