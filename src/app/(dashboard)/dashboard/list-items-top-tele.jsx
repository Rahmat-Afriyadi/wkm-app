"use server";
import { readManyListPerformanceTs } from "@/server/customer-mtr/lists";
import PerformanceTs from "./item-top-tele";

export default async function ListPerformance({ searchParams }) {
  const tgl1 = searchParams?.tgl1 || "";
  const tgl2 = searchParams?.tgl2 || "";

  const response = await readManyListPerformanceTs({ tgl1, tgl2 });
  const result = response.data || {};
  const topUsers = result.data?.top_users || [];
  const lowPerformance = result.data?.low_performance || [];

  // console.log("data ts", result);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* TABEL TOP USERS */}
        {topUsers.length > 0 && (
          <div className="w-full md:w-1/2 overflow-auto">
            <h2 className="text-lg font-bold mb-2">Top Performances</h2>
            <table className="w-full table-auto divide-y divide-gray-300 mb-6">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Nama</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Jumlah Sukses</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Kontribusi (%)</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, i) => (
                  <PerformanceTs key={i} user={user} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
  
        {/* TABEL LOW PERFORMANCE */}
        {lowPerformance.length > 0 && (
          <div className="w-full md:w-1/2 overflow-auto">
            <h2 className="text-lg font-bold mb-2">Low Performance</h2>
            <table className="w-full table-auto divide-y divide-gray-300 mb-6">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Nama User</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Jumlah Sukses</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Kontribusi (%)</th>
                </tr>
              </thead>
              <tbody>
                {lowPerformance.map((user, i) => (
                  <PerformanceTs key={i} user={user} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );  
}
