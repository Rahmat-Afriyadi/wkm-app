import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page({params, searchParams}){

    const {id} = params
    const item = await AuthGetApi("/vendor/detail-vendor/"+id)

    return (
        <>
            <p className="text-2xl font-bold mb-9">Detail Vendor</p>
            <PageFrame item={item} />
        </>
    )
}