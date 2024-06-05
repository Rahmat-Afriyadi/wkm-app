
import PageFrame from "./page-frame"
import { AuthGetApi } from "@/lib/fetchApi";
import ListAsuransi from "./list-items"
import ListAsuransiTS from "./list-items-ts"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({searchParams}) {
    const today = new Date()
    const data  = await AuthGetApi(
        "/asuransi/rekap-by-status-leader-tele?" +
        new URLSearchParams({
            tgl1: searchParams.tgl1 ? searchParams.tgl1 : today.toISOString().split('T')[0],
            tgl2: searchParams.tgl2 ? searchParams.tgl2 : today.toISOString().split('T')[0],
        })
    )
    const session = await getServerSession(authOptions);
    searchParams.dataSource = session?.user.dataSource

    return (
        <>
            <PageFrame data={data}>
                {session?.user.role == 1 && <ListAsuransi searchParams={searchParams}/>}
                {session?.user.role == 2 && <ListAsuransiTS searchParams={searchParams}/>}
            </PageFrame>
        </>
    )
}
