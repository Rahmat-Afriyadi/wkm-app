
import PageFrame from "./page-frame"
import { AuthGetApi } from "@/lib/fetchApi";
import ListAsuransi from "./list-items"
import ListAsuransiTS from "./list-items-ts"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({searchParams}) {
    let data = []
    const today = new Date()
    const session = await getServerSession(authOptions);
    if (session?.user?.role == 1) {
        searchParams.dataSource = session?.user.dataSource
        data  = await AuthGetApi(
            "/asuransi/rekap-by-status-tele?" +
            new URLSearchParams({
                tgl1: searchParams.tgl1 ? searchParams.tgl1 : today.toISOString().split('T')[0],
                tgl2: searchParams.tgl2 ? searchParams.tgl2 : today.toISOString().split('T')[0],
            })
        )
    } else if(session?.user?.role == 2){
        data  = await AuthGetApi(
            "/asuransi/rekap-by-status-leader-tele?" +
            new URLSearchParams({
                tgl1: searchParams.tgl1 ? searchParams.tgl1 : today.toISOString().split('T')[0],
                tgl2: searchParams.tgl2 ? searchParams.tgl2 : today.toISOString().split('T')[0],
            })
        )
       
    }

    return (
        <>
            <PageFrame data={data}>
                {session?.user.role == 1 && <ListAsuransi searchParams={searchParams}/>}
                {session?.user.role == 2 && <ListAsuransiTS searchParams={searchParams}/>}
            </PageFrame>
        </>
    )
}
