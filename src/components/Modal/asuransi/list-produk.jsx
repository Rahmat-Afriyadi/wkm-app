"use client"

import Produk from "./produk"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ListProduk({setIsModalOpen, setDetail}) {

    const searchParams = useSearchParams()

  const search = searchParams.get("search_query_produk");  
  const [produk, setProdukList] = useState([])

  useEffect(()=>{
    (async () => {
      const response = await fetch("/api/asuransi/master-produk?" + new URLSearchParams({ search: searchParams.get("search_query_produk") === null ? "" : searchParams.get("search_query_produk") }))
      if (response.status == 200) {
        const data = await response.json()
        setProdukList(data?.response)
      }
    })()
  },[searchParams.get("search_query_produk")])   // eslint-disable-line react-hooks/exhaustive-deps

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
                        Rate Produk
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nilai Pertanggungan
                </th>
              </tr>
          </thead>
          <tbody className="bg-white">
              {produk.length > 0 ? (
              produk.map((item, i) => {
                return (
                  <Produk
                      setDetail={setDetail}
                      setIsModalOpen={setIsModalOpen}
                      key={i}
                      id={i}
                      produk={{ ...item }}
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
