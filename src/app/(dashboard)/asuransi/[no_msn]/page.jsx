import { AuthGetApi } from "../../../../lib/fetchApi";
import ListSites from "../list-items";
import ModalListAsuransi from "../modal/list-asuransi";
import AsuransiDetailPage from "./asuransi-detail";

export default async function Page({params}) {
    const {no_msn} = params
    const asuransi = await AuthGetApi("/asuransi/"+no_msn)
    return (
        <main className="h-full min-h-screen p-5">
        <ModalListAsuransi>
            <ListSites/>
        </ModalListAsuransi>
        <AsuransiDetailPage asuransi={asuransi}/>

        </main>
    )
}