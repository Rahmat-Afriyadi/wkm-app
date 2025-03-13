"use server";
import dynamic from "next/dynamic";
const PageFrame = dynamic(() => import("./page-frame"));
import { getState } from "@/server/state/get-state";

// import PageFrame from "./page-frame";
// import TableFrame from "./table-frame";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
  const confirmer = await getState("confirmer_masuk");
  console.log("ini konfirmer ", confirmer);
  return <PageFrame defaultValues={{ confirmer: confirmer }}></PageFrame>;
}
