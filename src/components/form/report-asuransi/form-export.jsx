"use client"

import { useRef, useState } from "react";

export default function ButttonExportReportAsuransi({params}){
    const {awal_tgl, akhir_tgl, role} = params
    const aBlobUrl = useRef(null);
    const [submitted, setSubmit] = useState(false)

    const handleSubmit = async() =>{
        setSubmit(false)
        const url = role == "telesales" ? "/api/export-report-asuransi-telesales" : "/api/export-report-asuransi";
        const response = await fetch(url,{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({awal_tgl, akhir_tgl})
        });
        const response1 =  await response.blob()
        const filename = `Data Report Asuransi periode ${awal_tgl} - ${akhir_tgl}.xlsx`

        if(aBlobUrl.current)aBlobUrl.current.href = URL.createObjectURL(response1)
        if(aBlobUrl.current)aBlobUrl.current.download = filename
        aBlobUrl.current?.click()
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
            </div>
    )
}