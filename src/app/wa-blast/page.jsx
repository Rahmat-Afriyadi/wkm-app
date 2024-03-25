// import DatePicker from "@/components/form/datepicker/datepicker"

import FormWaBlast from "@/components/form/wa-blast/form-wa-blast"
import { getData } from "@/hooks/fetch-hook"

export default async function Page(){

    let kerja = getData('/kerja/master-data')
    let leas = getData('/leas/master-data')
    const [kerjaRes,leasRes] = await Promise.all([kerja,leas])

    return (
        <>
            <p className="text-xl font-bold">Export Data WA Blast</p>
            <FormWaBlast dataKerja={await kerjaRes.json()} dataLeas={await leasRes.json()}/>
            
        </>
    )
}