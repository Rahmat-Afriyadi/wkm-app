"use server";
import dynamic from "next/dynamic";
import { readManyListPerKecamatan } from "@/server/customer-mtr/lists";
import { Suspense } from "react";

const Pagination = dynamic(() => import("@/components/Pagination/index"));

function TableLoadingSkeleton() {
  return (
    <div className="min-w-full divide-y divide-gray-300 animate-pulse">
      <div className="bg-gray-50 h-12"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-gray-100 h-14 mb-1"></div>
      ))}
    </div>
  );
}

export default async function ListDataPerKecamatan({ searchParams }) {
  const pageParams = parseInt(searchParams?.page, 10) || 1;
  const limit = parseInt(searchParams?.limit, 10) || 10;  
  const search = searchParams?.search_query || "";
  const tgl1 = searchParams?.tgl1 || "";
  const tgl2 = searchParams?.tgl2 || "";

  // Try to fetch data
  let response, data, tableData, page;
  try {
    response = await readManyListPerKecamatan({
      tgl1,
      tgl2,
      search,
      limit,
      pageParams,
    });
    
    data = response.data || [];
    tableData = response.data.data || [];
    
    page = {
      total_rows: data.total_records,
      total_pages: data.total_pages || 1,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Fall back to empty data if fetch fails
    data = {};
    tableData = [];
    page = { total_rows: 0, total_pages: 1 };
  }

  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      {!data ? (
        <TableLoadingSkeleton />
      ) : (
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Kecamatan
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                Jumlah Data
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableData && tableData.length > 0 ? (
              tableData.map((item, i) => (
                <tr key={i}>
                  <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.kecamatan}</td>
                  <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.jumlah}</td>
                  <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.persen}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
                  {search ? "Data not found" : "No data available"}
                </td>
              </tr>
            )}
            <tr>
              <td colSpan={10}>
                <Pagination
                  rows={data.total_row_per_page}
                  postsPerPage={10}
                  currentPage={pageParams}
                  totalRows={page.total_rows}
                  totalPages={Math.ceil((data.total_records || 0)/limit)}
                  scrollToTable={true}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </Suspense>
  );
}