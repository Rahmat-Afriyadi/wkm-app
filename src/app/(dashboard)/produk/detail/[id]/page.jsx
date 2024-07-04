import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page({params, searchParams}){

    const {id} = params
    const item = await AuthGetApi("/produk/detail-produk/"+id)
    const vendorList = await AuthGetApi("/vendor/master-data")

    return (
        <>
            <p className="text-2xl font-bold mb-9">Detail Kendaraan</p>
            <PageFrame item={item} vendorList={vendorList}/>
        </>
    )
}