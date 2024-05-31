"use server"

import Pagination from "@/components/Pagination/index";
import { readManyAsuransi } from "@/server/asuransi/lists";
import dynamic from "next/dynamic";
import Asuransi from "./item"

export default async function ListItem({searchParams}) {

  const pageParams = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const search = searchParams?.search_query;
  const active = searchParams?.active;
  const period = searchParams?.period;
  const offset = limit * (pageParams - 1);
  const sortBy = searchParams?.sortBy;

  const {data, page} = await readManyAsuransi({
    dataSource:searchParams?.dataSource,
    sts: "pre",
    pageParams,
    limit
  })


  const tableContent = data.map((item, i) => {

      return (
        <Asuransi
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
                        Nomor Mesin
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nama Customer
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Jenis Asuransi
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
              </tr>
          </tbody>
      </table>
    );
}
