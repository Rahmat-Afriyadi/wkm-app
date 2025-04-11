"use server";

import dynamic from "next/dynamic";
import PageFrame from "./page-frame";
import { AuthGetApi } from "@/lib/fetchApi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Suspense } from "react";

// 🔹 Dynamic import components
const ListPerformance = dynamic(() => import("./list-items-top-tele"));
const ListMembership = dynamic(() => import("./list-items"));
const ListAsuransiPA = dynamic(() => import("./list-items-asuransi-pa"));
const ListAsuransiMtr = dynamic(() => import("./list-items-asuransi-mtr"));
const ListDataPerKecamatan = dynamic(() => import("./list-items-per-kecamatan"));

export default async function Page({ searchParams }) {
  let data = [];
  let dataWilayah = [];
  const session = await getServerSession(authOptions);

  if (session?.user?.role === 1) {
    data = await AuthGetApi(
      "/customer-mtr/rekap-tele?" +
        new URLSearchParams({
          tgl1: searchParams.tgl1 || "",
          tgl2: searchParams.tgl2 || "",
        })
    );
  } else if (session?.user?.role === 2) {
    data = await AuthGetApi(
      "/customer-mtr/rekap-leader-ts?" +
        new URLSearchParams({
          tgl1: searchParams.tgl1 || "",
          tgl2: searchParams.tgl2 || "",
        })
    );
    dataWilayah = await AuthGetApi(
      "/customer-mtr/rekap-per-wilayah?" +
        new URLSearchParams({
          tgl1: searchParams.tgl1 || "",
          tgl2: searchParams.tgl2 || "",
        })
    );
  }

  const category = searchParams.category || "Membership";
  let listComponent;

  if (session?.user?.role === 1) {
    if (category === "Membership") {
      listComponent = <ListMembership searchParams={searchParams} />;
    } else if (category === "Asuransi PA") {
      listComponent = <ListAsuransiPA searchParams={searchParams} />;
    } else if (category === "Asuransi Motor") {
      listComponent = <ListAsuransiMtr searchParams={searchParams} />;
    }
  } else if (session?.user?.role === 2) {
    listComponent = (
      <>
        <ListDataPerKecamatan searchParams={searchParams}/>
        <ListPerformance searchParams={searchParams} />
      </>
    );
  }

  return <PageFrame data={data} dataWilayah={dataWilayah}>
     <Suspense key={searchParams}>
     {listComponent}
     </Suspense>
    </PageFrame>;
}
