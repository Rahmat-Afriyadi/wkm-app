"use client"

import Dealer from "./dealer"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ListDealer({setIsModalOpen, setDealer}) {

  const searchParams = useSearchParams()

  const [dealer, setDealerList] = useState([])

  useEffect(()=>{
    (async () => {
      const response = await fetch("/api/dealer?" + new URLSearchParams({ search: searchParams.get("search_query_dealer") === null ? "" : searchParams.get("search_query_dealer") }))
      if (response.status == 200) {
        const data = await response.json()
        setDealerList(data?.response)
      }
    })()
  },[searchParams.get("search_query_dealer")])   // eslint-disable-line react-hooks/exhaustive-deps


    return (
      <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
              <tr>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Kode Dealer
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nama Dealer
                </th>
              </tr>
          </thead>
          <tbody className="bg-white">
              {dealer.length > 0 ? (
              dealer.map((item, i) => {
                return (
                  <Dealer
                      setDealer={setDealer}
                      setIsModalOpen={setIsModalOpen}
                      key={i}
                      id={i}
                      dealer={{ ...item }}
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
