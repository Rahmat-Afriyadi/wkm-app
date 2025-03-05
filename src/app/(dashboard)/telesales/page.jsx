"use client";
import dynamic from "next/dynamic";
import React from "react";

const TableAmbilData = dynamic(() => import("@/components/form/telesales/table-ambil-data"));

import { useEffect } from "react";
import { listAmbilData, seflCount } from "@/server/telesales/lists";
import { ambilData } from "@/server/telesales/ambil-data";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { formatDate } from "@/lib/utils/format-date";

export default function Page() {
  const now = new Date();

  const queryCLient = useQueryClient();
  const { data: jumlahAmbil } = useQuery({
    queryKey: ["self-count"],
    refetchOnWindowFocus: false,
    queryFn: async () => await seflCount(),
    initialData: 0,
  });
  const { data: listAmbilData1 } = useQuery({
    queryKey: ["list-ambil-data"],
    queryFn: async () => await listAmbilData(),
    refetchOnWindowFocus: false,
    initialData: { data: [{ no_msn: "" }] },
  });
  const ambilDataMut = useMutation({
    mutationFn: ambilData,
  });

  const handleAmbilData = (item) => {
    ambilDataMut.mutate(
      {
        no_msn: item.no_msn,
      },
      {
        onSuccess: (data) => {
          queryCLient.invalidateQueries({ queryKey: ["self-count"] });
          Swal.fire("Success!", "Data berhasil di ambil", "info");
        },
        onError: (e) => {
          queryCLient.invalidateQueries({ queryKey: ["list-ambil-data"] });
          Swal.fire("Failed!", e.response.data.message, "error");
        },
      }
    );
  };

  return (
    <>
      <p className="">Ambil Data {formatDate(now)}</p>
      <p className="font-bold text-xl">Jumlah: {jumlahAmbil}</p>
      <TableAmbilData options={listAmbilData1.data} handleChange={handleAmbilData} />
    </>
  );
}
