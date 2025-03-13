"use server";
import dynamic from "next/dynamic";
const FormInputTelesales = dynamic(() => import("@/components/form/telesales/form-input-telesales"));
import { AuthGetApi } from "../../../../../lib/fetchApi";

import { detailAmbilData } from "@/server/telesales/show";
import { formatDate, formatDateIndo } from "@/lib/utils/format-date";
import { Suspense } from "react";
import { formatCurrency } from "@/lib/utils/format-currentcy";

export default async function Page({ params }) {
  const { no_msn } = params;

  const faktur = await AuthGetApi("/customer-mtr/show-balikan/" + no_msn);
  console.log("iin faktur yaa ", faktur.data);

  // if (faktur.data.sts_membership == "F") {
  //   faktur.data.tgl_prospect_membership = faktur.data?.tgl_prospect_membership.substring(0, 10);
  // }
  // if (faktur.data.sts_asuransi_pa == "F") {
  //   faktur.data.tgl_prospect_asuransi_pa = faktur.data?.tgl_prospect_asuransi_pa.substring(0, 10);
  // }
  // if (faktur.data.sts_asuransi_mtr == "F") {
  //   faktur.data.tgl_prospect_asuransi_mtr = faktur.data?.tgl_prospect_asuransi_mtr.substring(0, 10);
  // }

  // if (faktur.data.no_kartu2 != "") {
  //   if (faktur.data.no_kartu2?.slice(2, 4) == "02") {
  //     faktur.data.jns_membership_sebelum = "Gold";
  //   } else if (faktur.data.no_kartu2?.slice(2, 4) == "03") {
  //     faktur.data.jns_membership_sebelum = "Platinum";
  //   } else if (faktur.data.no_kartu2?.slice(2, 4) == "23") {
  //     faktur.data.jns_membership_sebelum = "Platinum Plus";
  //   }
  // }

  return (
    <>
      <Suspense key={no_msn}>
        <FormInputTelesales defaultValues={faktur.data} isEditing={true} />
      </Suspense>
    </>
  );
}
