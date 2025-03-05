"use server";

import Pagination from "@/components/Pagination/index";
import { readManyBerminatAsuransiPA } from "@/server/customer-mtr/lists";
import Site from "./item";

export default async function ListAsuransiPA({ searchParams }) {
  const pageParams = parseInt(searchParams?.page, 10) || 1;
  const limit = parseInt(searchParams?.limit, 10) || 10;  
  const search = searchParams?.search_query || "";
  const tgl1 = searchParams?.tgl1 || "";
  const tgl2 = searchParams?.tgl2 || "";

  const response = await readManyBerminatAsuransiPA({
    tgl1,
    tgl2,
    search,
    limit,
    pageParams,
  });
  const data = response.data || [];
  const tableData = response.data.data || [];
  // console.log(data.total_records);
  const page = {
    total_rows: data.total_records,
    total_pages: data.total_pages || 1,
  };

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nomor Mesin
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nama Customer
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Status Asuransi
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Tanggal Beli
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Produk
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {tableData.length > 0 ? (
          tableData.map((item, i) => (
            <tr key={i}>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.no_msn}</td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{item.nm_customer_wkm === "" ? item.nm_customer_fkt : item.nm_customer_wkm}</td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                {(() => {
                  switch (item.sts_asuransi) {
                  case 'P': return 'Pending';
                  case 'O': return 'Oke';
                  case 'F': return 'Prospect';
                  case 'T': return 'Tidak Minat';
                  default: return 'Unknown';
                  }
                })()}
              </td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                {item.tgl_beli ? item.tgl_beli : 'Tidak ada data'}
              </td>
              <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                {item.id_produk ? item.id_produk : 'Tidak ada data'}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
              Data not found
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={5}>
            <Pagination
              rows={data.total_records}
              postsPerPage={10}
              currentPage={pageParams}
              totalRows={page.total_rows}
              totalPages={page.total_pages}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
