import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page({params, searchParams}){

    const {id} = params
    const otr = await AuthGetApi("/otr/detail-otr/"+id)

    return (
        <>
            <p className="text-2xl font-bold mb-9">Detail OTR</p>
            <PageFrame otr={otr}/>
        </>
    )
}