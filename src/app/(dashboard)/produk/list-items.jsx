"use server"

import Pagination from "@/components/Pagination/index";
import { readManyProduk } from "@/server/asuransi/lists";
import Site from "./item"

export default async function ListAsuransi({searchParams}) {
  const pageParams = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const search = searchParams?.search_query
  const jenis_asuransi = searchParams?.jenis_asuransi

  const {data, page} = await readManyProduk({
    search,
    jenis_asuransi,
    limit,
    pageParams
  })


  const tableContent = data.map((item, i) => {

      return (
        <Site
          key={i}
          id={i}
          site={{ ...item }}
        />
      );
    });

    return (
      <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
              <tr>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Kode Produk
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nama Produk
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Jenis Asuransi
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nilai Pertanggungan
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Premi
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Admin
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Aksi
                </th>
              </tr>
          </thead>
          <tbody className="bg-white">
              {tableContent.length > 0 ? (
              tableContent
              ) : (
              <tr>
                  <td
                  colSpan={7}
                  className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap"
                  >
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