import ListAsuransi from "./list-items"
import SiteFrame from "./page-frame"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthGetApi } from "@/lib/fetchApi";
export default async function Page({searchParams}) {
    
    const session = await getServerSession(authOptions);
    searchParams.dataSource = session?.user.dataSource
    const alasanPendingList = await AuthGetApi("/asuransi/master-alasan-pending")

    return (
    <main className="h-full min-h-screen p-5">
        
        <SiteFrame alasanPendingList={alasanPendingList}>
            <ListAsuransi searchParams={searchParams}/>
        </SiteFrame>
    </main>
  )
}