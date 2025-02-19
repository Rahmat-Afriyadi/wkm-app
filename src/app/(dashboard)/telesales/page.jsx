"use client";

import React from "react";

import FormInputTelesales from "@/components/form/telesales/form-input-telesales";
import ModalListFaktur from "./modal/list-faktur";
import { listAmbilData } from "@/server/telesales/lists";
import { ambilData } from "@/server/telesales/ambil-data";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableAmbilData from "@/components/form/telesales/table-ambil-data";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter();

  const queryCLient = useQueryClient();
  const { data: listAmbilData1 } = useQuery({
    queryKey: ["list-ambil-data"],
    queryFn: async () => await listAmbilData(),
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
          router.push("/telesales/detail/" + item.no_msn);
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
      <ModalListFaktur>
        <TableAmbilData options={listAmbilData1.data} handleChange={handleAmbilData} />
      </ModalListFaktur>
      <br />
      <FormInputTelesales />
    </>
  );
}
