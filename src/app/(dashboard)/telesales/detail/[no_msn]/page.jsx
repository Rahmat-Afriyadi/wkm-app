"use client";

import FormInputTelesales from "@/components/form/telesales/form-input-telesales";
import { detailAmbilData } from "@/server/telesales/show";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils/format-date";

export default function Page({ params, searchParams }) {
  const { no_msn } = params;
  const { data: faktur, isLoading } = useQuery({
    queryKey: ["list-ambil-data", no_msn],
    queryFn: async () => await detailAmbilData(no_msn),
    initialData: { data: {} },
  });

  if (isLoading) {
    return "Loading...";
  }
  faktur.data.tgl_lahir_fkt = faktur.data.tgl_lahir_fkt.substring(0, 10);

  return <FormInputTelesales defaultValues={faktur.data} isEditing={true} />;
}
