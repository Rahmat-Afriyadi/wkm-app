import { AuthGetApi } from "@/lib/fetchApi"
import PageFrame from "./page-frame"

export default async function Page(){

    const merkMotor = await AuthGetApi("/merk/master-data/1")
    const merkMobil = await AuthGetApi("/merk/master-data/2")

    return (
        <>
            <p className="text-2xl font-bold mb-9">Create Master Produk</p>
            <PageFrame merkMobil={merkMobil} merkMotor={merkMotor}/>
        </>
    )
}