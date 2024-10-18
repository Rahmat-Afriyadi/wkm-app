"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Search from "@/components/Search/index";
import { UploadTanggalMerahExcel } from "@/server/tanggal-merah/upload-data-excel";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function PageFrame({ children }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const importTransaksiMut = useMutation({
    mutationFn: UploadTanggalMerahExcel,
  });

  const [value, setValue] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tgl1", "");
    params.set("tgl2", "");
    replace(`${pathname}?${params}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleValueChange = (newValue) => {
    const params = new URLSearchParams(searchParams);
    if (newValue.startDate != null && newValue.endDate) {
      params.set("tgl1", newValue.startDate);
      params.set("tgl2", newValue.endDate);
      replace(`${pathname}?${params}`);
    } else {
      params.set("tgl1", "");
      params.set("tgl2", "");
      replace(`${pathname}?${params}`);
    }
    setValue(newValue);
  };

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
          Swal.fire("Warning!", e.response?.data?.message, "info");
        },
      });
      console.log("File selected:", selectedFile);
    }
  };
  return (
    <>
      <div className="grid mb-6 md:grid-cols-12">
        <div className="w-full col-span-8 mr-2 mt-2 flex justify-start items-end ">
          <a
            href="/pengajuan-extend-bayar/create"
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create
          </a>
          <Search id="search-query" name="search_query" placeholder={"Search..."} />
          <div className="w-3"></div>
          <div className="w-64">
            <Datepicker
              id={"range_tgl_merah"}
              toggleClassName="absolute rounded-r-lg -top-0 right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              inputClassName="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-4 sm:text-sm"
              name={"range_tgl_merah"}
              value={value}
              primaryColor={"amber"}
              onChange={handleValueChange}
            />
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
