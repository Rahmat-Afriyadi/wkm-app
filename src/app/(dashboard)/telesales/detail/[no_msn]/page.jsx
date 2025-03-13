"use server";
import dynamic from "next/dynamic";
const FormInputTelesales = dynamic(() => import("@/components/form/telesales/form-input-telesales"));
import { AuthGetApi } from "../../../../../lib/fetchApi";

import { Suspense } from "react";

export default async function Page({ params }) {
  const { no_msn } = params;

  const faktur = await AuthGetApi("/customer-mtr/show/" + no_msn);

  if (faktur.data.sts_membership == "F") {
    faktur.data.tgl_prospect_membership = faktur.data?.tgl_prospect_membership.substring(0, 10);
  }
  if (faktur.data.sts_asuransi_pa == "F") {
    faktur.data.tgl_prospect_asuransi_pa = faktur.data?.tgl_prospect_asuransi_pa.substring(0, 10);
  }
  if (faktur.data.sts_asuransi_mtr == "F") {
    faktur.data.tgl_prospect_asuransi_mtr = faktur.data?.tgl_prospect_asuransi_mtr.substring(0, 10);
  }

  return (
    <>
      <Suspense key={no_msn}>
        <FormInputTelesales defaultValues={faktur.data} isEditing={true} />
      </Suspense>
    </>
  );
}
