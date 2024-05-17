import ListAsuransi from "./list-items"
import SiteFrame from "./page-frame"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Page({searchParams}) {
    
    const session = await getServerSession(authOptions);
    searchParams.dataSource = session?.user.dataSource
    return (
    <main className="h-full min-h-screen p-5">
        
        <SiteFrame>
            <ListAsuransi searchParams={searchParams}/>
        </SiteFrame>
    </main>
  )
}