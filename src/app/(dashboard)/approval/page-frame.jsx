"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Search from "@/components/Search/index";

export default function PageFrame({ children }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const today = new Date();
  const [value, setValue] = useState({
    startDate: today.toISOString().split("T")[0].slice(0, 8) + "01",
    endDate: today.toISOString().split("T")[0],
  });

  const [statusBayar, setStatusBayar] = useState(searchParams.get("sb") ? searchParams.get("sb") : 0);
  const [jnsAsuransi, setJnsAsuransi] = useState(searchParams.get("ja") ? searchParams.get("ja") : 0);

  const handleValueChange = (newValue) => {
    const params = new URLSearchParams(searchParams);
    params.set("tgl1", newValue.startDate);
    params.set("tgl2", newValue.endDate);
    replace(`${pathname}?${params}`);
    setValue(newValue);
  };

  const statusBayarList = [
    { name: "Apply", id: 1 },
    { name: "Proceess", id: 2 },
    { name: "Done", id: 3 },
    { name: "Decline", id: 4 },
  ];

  const jnsAsuransiList = [
    { name: "Asuransi Kendaraan", id: 1 },
    { name: "Asuransi Jiwa", id: 2 },
  ];

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-end">
          <div className="max-w-xs mr-2 w-80">
            <label htmlFor="search-query" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search
            </label>
            <Search id="search-query" name="search_query" placeholder={"Search for a transaksi..."} />
          </div>
          <div className="max-w-xs mr-2 w-80">
            <label htmlFor="range_verifikasi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Range Periode
            </label>

            <Datepicker
              id={"range_verifikasi"}
              // inputClassName="z-40 max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              toggleClassName="absolute rounded-r-lg -top-0  right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name={"range_verifikasi"}
              value={value}
              primaryColor={"amber"}
              onChange={handleValueChange}
            />
          </div>
          <div className="max-w-xs mr-2 w-80">
            <label htmlFor="status-bayar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Status Bayar
            </label>
            <select
              value={statusBayar}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set("sb", e.target.value);
                replace(`${pathname}?${params}`);
                setStatusBayar(e.target.value);
              }}
              className="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-2 sm:text-sm"
              id="status-bayar"
            >
              <option value={0}>All</option>
              {statusBayarList.map((e) => {
                return (
                  <option key={e.name} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="max-w-xs mr-2 w-80">
            <label htmlFor="jenis-asuransi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jenis Asuransi
            </label>
            <select
              value={jnsAsuransi}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set("ja", e.target.value);
                replace(`${pathname}?${params}`);
                setJnsAsuransi(e.target.value);
              }}
              className="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-2 sm:text-sm"
              id="jenis-asuransi"
            >
              <option value={0}>All</option>
              {jnsAsuransiList.map((e) => {
                return (
                  <option key={e.name} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
