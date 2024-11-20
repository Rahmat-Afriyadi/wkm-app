"use client"

import { useRef, useState } from "react";

export default function ButttonExportDataRenewal({params}){
    const {year, month, role} = params
    const aBlobUrl = useRef(null);
    const aBlobUrl1 = useRef(null);
    const [submitted, setSubmit] = useState(false)

    const handleSubmit = async() =>{
        setSubmit(false)
        const url = "/api/data-renewal/export-data-renewal";
        const url2 = "/api/data-renewal/export-rekap";
        const response = await fetch(url,{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({year: year, month: month})
        });
        const response2 = await fetch(url2,{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({year: year, month: month})
        });
        const response1 =  await response.blob()
        const response2b =  await response2.blob()
        const filename = `Rekap Data Renewal ${year} - ${month}.xlsx`
        const filename2 = `Rekap Data Platinum Plus ${year} - ${month}.xlsx`

        if(aBlobUrl.current)aBlobUrl.current.href = URL.createObjectURL(response1)
        if(aBlobUrl.current)aBlobUrl.current.download = filename
        aBlobUrl.current?.click()

        if(aBlobUrl1.current)aBlobUrl1.current.href = URL.createObjectURL(response2b)
        if(aBlobUrl1.current)aBlobUrl1.current.download = filename2
        aBlobUrl1.current?.click()
    }


    return (
            <div className="sm:mt-5 sm:space-y-5 ">
                <button
                    onClick={handleSubmit}
                    id="button"
                    type="submit"
                    className="w-full px-6 py-1 mt-2 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
                >
                    Export
                </button>
                <a ref={aBlobUrl} className="hidden"></a>
                <a ref={aBlobUrl1} className="hidden"></a>
            </div>
    )
}