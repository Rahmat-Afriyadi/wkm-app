"use client"

import Kodepos from "./modal-kodepos"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ListKodepos({setIsModalOpen, setAlamatKirim}) {
  const searchParams = useSearchParams()

  const search = searchParams.get("search_query");  
  const [tableContent, setTableContent] = useState([])

  useEffect(()=>{
    (async () => {
      const response = await fetch("/api/kodepos?" + new URLSearchParams({ search: searchParams.get("search_query") === null ? "" : searchParams.get("search_query") }))
      if (response.status == 200) {
        const data = await response.json()
        setTableContent(data?.response?.map((item, i) => {
          return (
            <Kodepos
                setAlamatKirim={setAlamatKirim}
                setIsModalOpen={setIsModalOpen}
                key={i}
                id={i}
                kodepos={{ ...item }}
              />
          );
        }))
      }
    })()
  },[search, searchParams, setAlamatKirim, setIsModalOpen])


    return (
      <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
              <tr>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Kode Pos
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Kecamatan
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Kelurahan
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
          </tbody>
      </table>
    );
}
