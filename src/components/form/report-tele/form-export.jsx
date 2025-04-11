"use client";

import { useRef, useState } from "react";

export default function ButttonExportReportTele({ params }) {
  const { awal_tgl, akhir_tgl, role } = params;
  const aBlobUrl = useRef(null);
  const [submitted, setSubmit] = useState(false);

  const requestBody = {
    tgl1: awal_tgl,
    tgl2: akhir_tgl,
  };

  const handleSubmit = async () => {
    setSubmit(false);

    // Pilih endpoint berdasarkan role
    const url =
      role == 1
        ? "api/rekap-tele/export-rekap-tele"
        : "api/rekap-tele/export-leader-ts";

    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const today = new Date().toISOString().split("T")[0];
    const start = awal_tgl || today;
    const end = akhir_tgl || today;
    const response1 = await response.blob();
    const filename = `Rekap Data Tele ${start} - ${end}.xlsx`;

    if (aBlobUrl.current)
      aBlobUrl.current.href = URL.createObjectURL(response1);
    if (aBlobUrl.current) aBlobUrl.current.download = filename;
    aBlobUrl.current?.click();
  };

  return (
    <div className="sm:mt-5 sm:space-y-5 ">
      <button
        onClick={handleSubmit}
        id="button"
        type="submit"
        className="w-full px-6 py-1 mt-2 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
      >
        Export
      </button>
      <a ref={aBlobUrl} className="hidden"></a>
    </div>
  );
}
