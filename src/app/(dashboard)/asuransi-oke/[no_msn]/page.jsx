import { AuthGetApi } from "../../../../lib/fetchApi";
import AsuransiDetailPage from "@/components/asuransi/detail";

export default async function Page({params, searchParams}) {
    const {no_msn} = params
    const asuransi = await AuthGetApi("/asuransi/"+no_msn)
    return (
        <main className="h-full min-h-screen p-5">
        <AsuransiDetailPage asuransi={asuransi}/>

        </main>
    )
}