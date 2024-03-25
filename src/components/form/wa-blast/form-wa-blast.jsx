"use client"

import { useState, useRef } from "react";

import DatePicker from "../datepicker/datepicker";
import MultipleSelect from "../multiple-select";
import { postData } from "@/hooks/fetch-hook";
import axios from "axios"

export default function FormWaBlast({dataKerja, dataLeas}){
    const [selected, setSelected] = useState([]);
    const [noLeas, setNoLeas] = useState("");
    const [kodeKerjaFilter, setKodeKerjaFilter] = useState("NOT IN");
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
            no_leas:noLeas,
            kode_kerja_filter_type:kodeKerjaFilter,
            kode_kerja:selected
        }

            let formData = new FormData();
            formData.append("awal_tenor", typeof value.startDate == 'string' ? value.startDate : `${value.startDate.getFullYear()}-${(value.startDate.getMonth() + 1).toString().padStart(2, '0')}-${value.startDate.getDate().toString().padStart(2, '0')}`)
            formData.append("akhir_tenor",typeof value.endDate == 'string' ? value.endDate : `${value.endDate.getFullYear()}-${(value.endDate.getMonth() + 1).toString().padStart(2, '0')}-${value.endDate.getDate().toString().padStart(2, '0')}`)
            formData.append("no_leas",noLeas)
            formData.append("kode_kerja_filter_type",kodeKerjaFilter)
            formData.append("kode_kerja",selected)   

        const response = await fetch("/api/export-data-wa-blast",{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const response1 =  await response.blob()
        console.log("ini blob yg ini", response1)

        // let response = await fetch("http://127.0.0.1:3001" + "/export-data-wa-blast", {
        //     method: "POST",
        //     headers: {
        //     // "Content-Type": "application/json",
        //     Accept: "*/*",
        //     },
        //     body: formData,
        //     mode: "no-cors",
        // });
        // let response1 = await response.blob();
        // console.log("ini data blob lagi nih", response1);

        // let response;
    //     fetch("http://127.0.0.1:3001" + "/export-data-wa-blast", {
    //     method: "POST",
    //     headers: {
    //     // "Content-Type": "application/json",
    //     Accept: "*/*",
    //     },
    //     body: formData,
    //     mode: "no-cors",
    // })
    //     .then((data) => {
    //     return data.blob();
    //     })
    //     .then(async (data) => {
    //         response=data
    //         console.log("ini blob ", data)
    //         if(aBlobUrl.current)aBlobUrl.current.href = URL.createObjectURL(data)
    //         if(aBlobUrl.current)aBlobUrl.current.download = "File Download.xlsx"
    //         aBlobUrl.current?.click()
    //     })
    //     .catch((error) => {
    //     console.log("ini errornya ", error);
    //     });

        // console.log("ini response blob", blob)  
        if(aBlobUrl.current)aBlobUrl.current.href = URL.createObjectURL(response1)
        if(aBlobUrl.current)aBlobUrl.current.download = "File Download.xlsx"
        aBlobUrl.current?.click()
        console.log("ini hasil ", response)
    }


    return (
            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                <a ref={aBlobUrl} className="hidden"></a>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="kode-kerja"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Nomor Leas
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select required value={noLeas} onChange={(e)=>setNoLeas(e.target.value)} className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer">
                            <option value="" disabled>Please Select No Leas</option>
                            {dataLeas && dataLeas.map((e)=>{
                                return <option key={e.Kode} value={e.Kode} className=" cursor-pointer">
                                    {e.Nama}
                                </option>
                            })}
                        </select>
                        {submitted && noLeas == "" && <p className="bg-red text-white rounded-lg px-2 py-1 max-w-lg mt-2">Wajib Diisi</p>}
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="kode-kerja"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Tanggal Akhir Tenor
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg">
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
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="kode-kerja"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Kode Kerja filter
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select value={kodeKerjaFilter} onChange={(e)=>setKodeKerjaFilter(e.target.value)} className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200">
                            <option value="NOT IN">NOT IN</option>
                            <option value="IN">IN</option>
                        </select>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="kode-kerja"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Kode Kerja
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <MultipleSelect selected={selected} setSelected={setSelected} dataKerja={dataKerja}/>
                        {submitted && selected.length == 0  && <p className="bg-red text-white rounded-lg px-2 py-1 max-w-lg mt-2">Wajib Diisi</p>}
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