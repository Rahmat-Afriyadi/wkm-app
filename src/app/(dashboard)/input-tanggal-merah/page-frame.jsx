"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Search from "@/components/Search/index";
import { UploadTanggalMerahExcel } from "@/server/tanggal-merah/upload-data-excel";
import { useMutation } from "@tanstack/react-query";

export default function PageFrame({ children }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const importTransaksiMut = useMutation({
    mutationFn: UploadTanggalMerahExcel,
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("ini type ", selectedFile.type);
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ]; // Specify valid types
      if (!validTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a Xlsx file.");
        setFile(null);
        return;
      }
      setError("");
      const data = new FormData();
      data.append("files[]", selectedFile, selectedFile.name);

      importTransaksiMut.mutate(data, {
        onSuccess: (data) => {
          router.refresh();
        },
        onError: (e) => {
          console.log("ini error ", e);
        },
      });
      console.log("File selected:", selectedFile);
    }
  };
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="max-w-xs mr-2 w-80 mt-2 flex justify-start">
          <a
            href="/input-tanggal-merah/create"
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create
          </a>
          <label
            htmlFor="import-transaksi"
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
          >
            Import
          </label>
          <input
            type="file"
            className="hidden"
            id="import-transaksi"
            accept="application/vnd.ms-excel, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Specify accepted file types
            onChange={handleFileChange}
          />
          <Search id="search-query" name="search_query" placeholder={"Search for a OTR..."} />
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
