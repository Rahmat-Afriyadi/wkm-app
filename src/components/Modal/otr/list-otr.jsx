"use client"

import Otr from "./otr"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ListOtr({setIsModalOpen, setDetailOtr}) {

    const searchParams = useSearchParams()

  const search = searchParams.get("search_query_otr_na");  
  const [otr_na, setOtrList] = useState([])

  useEffect(()=>{
    (async () => {
      const response = await fetch("/api/otr/otr?" + new URLSearchParams({ search: searchParams.get("search_query_otr_na") === null ? "" : searchParams.get("search_query_otr_na") }))
      if (response.status == 200) {
        const data = await response.json()
        console.log("ini data satu yaa ", data?.response[0])
        setOtrList(data?.response)
      }
    })()
  },[searchParams.get("search_query_otr_na")])   // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
              <tr>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Kode Motor
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nama Motor
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Tahun
                </th>
              </tr>
          </thead>
          <tbody className="bg-white">
              {otr_na.length > 0 ? (
              otr_na.map((item, i) => {
                return (
                  <Otr
                      setDetailOtr={setDetailOtr}
                      setIsModalOpen={setIsModalOpen}
                      key={i}
                      id={i}
                      otr={{ ...item }}
                    />
                );
              })
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
