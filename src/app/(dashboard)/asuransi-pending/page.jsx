import { PencilIcon } from "@heroicons/react/24/outline";
import ModalListAsuransi from "./modal/list-asuransi"
import ListAsuransi from "./list-items"
import SiteFrame from "./page-frame"
export default function Page({searchParams}) {
    
    return (
    <main className="h-full min-h-screen p-5">
        
        <SiteFrame>
            <ListAsuransi searchParams={searchParams}/>
        </SiteFrame>
    </main>
  )
}