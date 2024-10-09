// import DatePicker from "@/components/form/datepicker/datepicker"

import { Suspense } from "react";
import FormWaBlast from "../../../components/form/wa-blast/form-wa-blast";
import { AuthGetApi } from "../../../lib/fetchApi";
import FormInputBayar from "../../../components/form/input-bayar/form-input-bayar";

export default async function Page() {
  let kerja = AuthGetApi("/kerja/master-data");
  let leas = AuthGetApi("/leas/master-data");
  const [kerjaRes, leasRes] = await Promise.all([kerja, leas]);

  return (
    <>
      <p className="text-xl font-bold">Input Bayar</p>
      <br />
      <hr />
      <br />
      <Suspense>
        <FormInputBayar />
      </Suspense>
    </>
  );
}
