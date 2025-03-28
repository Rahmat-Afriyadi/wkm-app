"use server";
import dynamic from "next/dynamic";
const FormInputTelesales = dynamic(() => import("@/components/form/telesales/form-input-telesales"));
import { AuthGetApi } from "../../../../../../lib/fetchApi";
import { Suspense } from "react";

export default async function Page({ params }) {
  const { no_msn, from } = params;

  const faktur = await AuthGetApi("/customer-mtr/show-all/" + no_msn + "/" + from);

  if (faktur.data === undefined) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <>
      <Suspense key={no_msn}>
        <FormInputTelesales defaultValues={faktur.data} isEditing={true} />
      </Suspense>
    </>
  );
}
