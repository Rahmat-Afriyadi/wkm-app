"use client"

import { useState, useRef } from "react";

import DatePicker from "../datepicker/datepicker";

export default function FormExportReportAsuransi(){
    const [value, setValue] = useState(); 
    const [submitted, setSubmit] = useState(false)
    const aBlobUrl = useRef(null);

    const handleValueChange = (newValue) => {
        setValue(newValue); 
    } 


    const handleSubmit = async() =>{
        setSubmit(false)
        if(noLeas==""||selected.length==0||!value){
            setSubmit(true)
            return
        }
        const data = {
            awal_tenor: typeof value.startDate == 'string' ? value.startDate : `${value.startDate.getFullYear()}-${(value.startDate.getMonth() + 1).toString().padStart(2, '0')}-${value.startDate.getDate().toString().padStart(2, '0')}`,
            akhir_tenor:typeof value.endDate == 'string' ? value.endDate : `${value.endDate.getFullYear()}-${(value.endDate.getMonth() + 1).toString().padStart(2, '0')}-${value.endDate.getDate().toString().padStart(2, '0')}`,
        }
        const response = await fetch("/api/export-data-wa-blast",{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const response1 =  await response.blob()
        const filename = `Data Report Asuransi periode ${data.awal_tenor} - ${data.akhir_tenor}.xlsx`

        if(aBlobUrl.current)aBlobUrl.current.href = URL.createObjectURL(response1)
        if(aBlobUrl.current)aBlobUrl.current.download = filename
        aBlobUrl.current?.click()
    }


    return (
            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5 ">
                <a ref={aBlobUrl} className="hidden"></a>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <label
                            htmlFor="periode"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Periode
                        </label>
                        <div className="max-w-lg z-100">
                            <DatePicker
                                id="date_range"
                                name="date_range"
                                primaryColor={"blue"}
                                handleValueChange={handleValueChange}
                                value={value}
                            />
                        </div>
                        {submitted && !value && <p className="bg-red text-white rounded-lg px-2 py-1 max-w-lg mt-2">Wajib Diisi</p>}
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    id="button"
                    type="submit"
                    className="w-full px-6 py-2 mt-3 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
                >
                    Export
                </button>
            </div>
    )
}