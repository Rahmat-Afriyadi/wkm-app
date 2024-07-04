import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page({params, searchParams}){

    const {id} = params
    const otr = await AuthGetApi("/mst-mtr/detail-mst-mtr/"+id)

    const merkMotor = await AuthGetApi("/merk/master-data/1")
    const merkMobil = await AuthGetApi("/merk/master-data/2")

    return (
        <>
            <p className="text-2xl font-bold mb-9">Detail Kendaraan</p>
            <PageFrame otr={otr} merkMobil={merkMobil} merkMotor={merkMotor}/>
        </>
    )
}