"use client";
import dynamic from "next/dynamic";
const Motor = dynamic(() => import("./mtr"));
import { useEffect, useState } from "react";

export default function ListMotor({ setIsModalOpen, handleClick, query = "" }) {
  const [mtr, setMotorList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "/api/otr/produk?" +
          new URLSearchParams({
            search: query,
          })
      );
      if (response.status == 200) {
        const data = await response.json();
        setMotorList(data?.response);
      }
    })();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nomor Motor
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Nama Motor
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            Motor Series
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {mtr.length > 0 ? (
          mtr.map((item, i) => {
            return <Motor handleClick={handleClick} setIsModalOpen={setIsModalOpen} key={i} id={i} mtr={{ ...item }} />;
          })
        ) : (
          <tr>
            <td colSpan={7} className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
              Data not found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
