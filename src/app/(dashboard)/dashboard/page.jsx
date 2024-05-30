
import { LockClosedIcon, CurrencyDollarIcon, SignalIcon} from "@heroicons/react/24/outline";
import PageFrame from "./page-frame"
import { AuthGetApi } from "@/lib/fetchApi";


export default async function Page({searchParams}) {
    const today = new Date()
    const data  = await AuthGetApi(
        "/asuransi/rekap-by-status-tele?" +
        new URLSearchParams({
            tgl: searchParams.tgl ? searchParams.tgl : today.toISOString().split('T')[0],
        })
    )

    return (
        <>
            <PageFrame data={data}/>
        </>
    )
}
