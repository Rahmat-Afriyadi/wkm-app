"use server";

import Pagination from "@/components/Pagination/index";
import { readManyApproval } from "@/server/asuransi/lists";
import Site from "./item";
import moment from "moment";

export default async function ListAsuransi({ searchParams }) {
  const pageParams = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const search = searchParams?.search_query;
  const sb = searchParams?.sb;
  const ja = searchParams?.ja || 0;

  const { data, page } = await readManyApproval({
    tgl1: searchParams?.tgl1,
    tgl2: searchParams?.tgl2,
    sb,
    ja,
    search,
    limit,
    pageParams,
  });

  const tableContent = data.map((item, i) => {
    return <Site key={i} id={i} site={{ ...item }} />;
  });

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Id Transaksi
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nama Konsumen
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            No HP
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Jenis Asuransi
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Tgl Pengajuan
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Status
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {tableContent.length > 0 ? (
          tableContent
        ) : (
          <tr>
            <td colSpan={7} className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
              Data not found
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={7}>
            <Pagination
              rows={data.length}
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
