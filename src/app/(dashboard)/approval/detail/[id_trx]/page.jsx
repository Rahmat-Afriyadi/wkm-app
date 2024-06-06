import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page({params}){

    const {id_trx} = params
    const approval = await AuthGetApi("/asuransi/detail-approval/"+id_trx)

    return (
        <PageFrame approval={approval}/>
    )
}