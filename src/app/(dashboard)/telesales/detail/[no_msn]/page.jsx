"use client";

import FormInputTelesales from "@/components/form/telesales/form-input-telesales";
import { detailAmbilData } from "@/server/telesales/show";
import ModalListFaktur from "../../modal/list-faktur";
import { useRouter } from "next/navigation";
import { listAmbilData } from "@/server/telesales/lists";
import { ambilData } from "@/server/telesales/ambil-data";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableAmbilData from "@/components/form/telesales/table-ambil-data";
import Swal from "sweetalert2";
import { Suspense } from "react";

export default function Page({ params, searchParams }) {
  const { no_msn } = params;
  const router = useRouter();

  const queryCLient = useQueryClient();
  const { data: faktur, isLoading } = useQuery({
    queryKey: ["detail-ambil-data", { no_msn }],
    queryFn: async () => await detailAmbilData(no_msn),
    initialData: { data: {} },
  });
  const { data: listAmbilData1 } = useQuery({
    queryKey: ["list-ambil-data-detail"],
    queryFn: async () => await listAmbilData(),
    initialData: { data: [{ no_msn: "" }] },
  });
  const ambilDataMut = useMutation({
    mutationFn: ambilData,
  });

  if (isLoading) {
    return "Loading...";
  }
  faktur.data.tgl_lahir_fkt = faktur.data?.tgl_lahir_fkt?.substring(0, 10);
  faktur.data.tgl_faktur = faktur.data?.tgl_faktur?.substring(0, 10);
  faktur.data.asuransi_mtr_tahun = new Date(faktur.data?.tgl_faktur).getFullYear();
  faktur.data.asuransi_nm_mtr = faktur.data?.nm_mtr;
  faktur.data.asuransi_no_mtr = faktur.data?.no_mtr;

  const handleAmbilData = (item) => {
    ambilDataMut.mutate(
      {
        no_msn: item.no_msn,
      },
      {
        onSuccess: (data) => {
          queryCLient.invalidateQueries({
            queryKey: ["list-ambil-data-detail"],
          });
          router.replace("/telesales/detail/" + item.no_msn);
          queryCLient.invalidateQueries({
            queryKey: ["detail-ambil-data", , { no_msn: item.no_msn }],
          });
        },
        onError: (e) => {
          queryCLient.invalidateQueries({ queryKey: ["list-ambil-data-detail"] });
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
      <Suspense key={no_msn + faktur.data.no_msn}>
        <FormInputTelesales defaultValues={faktur.data} isEditing={true} />
      </Suspense>
    </>
  );
}
