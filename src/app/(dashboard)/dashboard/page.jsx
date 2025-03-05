"use server";
import PageFrame from "./page-frame"
import { AuthGetApi } from "@/lib/fetchApi";
import ListMembership from "./list-items"
import ListAsuransiPA from "./list-items-asuransi-pa"
import ListAsuransiMtr from "./list-items-asuransi-mtr"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({searchParams}) {
    let data = []
    const today = new Date()
    const session = await getServerSession(authOptions);
    if (session?.user?.role == 1) {
        // searchParams.dataSource = session?.user.dataSource
        data  = await AuthGetApi(
            "/customer-mtr/rekap-tele?" +
            new URLSearchParams({
                tgl1: searchParams.tgl1 ? searchParams.tgl1 : '',
                tgl2: searchParams.tgl2 ? searchParams.tgl2 : '',
            })
        )
    } else if(session?.user?.role == 2){
        data  = await AuthGetApi(
            "/customer-mtr/rekap-tele?" +
            new URLSearchParams({
                tgl1: searchParams.tgl1 ? searchParams.tgl1 : '',
                tgl2: searchParams.tgl2 ? searchParams.tgl2 : '',
            })
        )
    }
    const category = searchParams.category || "Membership";
    let listComponent;
    if (category === "Membership") {
      // console.log(searchParams);
      listComponent = <ListMembership searchParams={searchParams} />;
    } else if (category === "Asuransi PA") {
      listComponent = <ListAsuransiPA searchParams={searchParams} />;
    } else if (category === "Asuransi Motor") {
      listComponent = <ListAsuransiMtr searchParams={searchParams} />;
    }

  return <PageFrame data={data}>{listComponent}</PageFrame>;
}
