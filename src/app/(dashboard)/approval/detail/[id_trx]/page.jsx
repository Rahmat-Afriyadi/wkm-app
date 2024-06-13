import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page({params, searchParams}){

    const {id_trx} = params
    const approval = await AuthGetApi("/asuransi/detail-approval/"+id_trx)

    return (
        <>
            <p className="text-2xl font-bold mb-9">Detail Approval</p>
            <PageFrame approval={approval}/>
        </>
    )
}