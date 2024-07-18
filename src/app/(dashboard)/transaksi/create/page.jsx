import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page(){

    const vendorList = await AuthGetApi("/vendor/master-data")

    return (
        <>
            <p className="text-2xl font-bold mb-9">Create OTR</p>
            <PageFrame vendorList={vendorList}/>
        </>
    )
}