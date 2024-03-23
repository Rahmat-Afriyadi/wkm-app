"use client"

import { useState } from "react";

import DatePicker from "../datepicker/datepicker";
import MultipleSelect from "../multiple-select";
import { Eater } from "next/font/google";

export default function FormWaBlast(){
    const [selected, setSelected] = useState([]);
    const [noLeas, setNoLeas] = useState("");
    const [kodeKerjaFilter, setKodeKerjaFilter] = useState("NOT IN");
    const [value, setValue] = useState({ 
        startDate: new Date(), 
        endDate: new Date().setMonth(11) 
    }); 

    const handleValueChange = (newValue) => {
        setValue(newValue); 
    } 


    const handleSubmit = () =>{
        const data = {
            awal_tenor:`${value.startDate.getFullYear()}-${(value.startDate.getMonth() + 1).toString().padStart(2, '0')}-${value.startDate.getDate().toString().padStart(2, '0')}`,
            akhir_tenor:value.endDate,
            no_leas:noLeas,
            kode_kerja_filter_type:kodeKerjaFilter,
            kode_kerja:selected
        }
        console.log("ini hasil ", data)
    }

    return (
            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="kode-kerja"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Nomor Leas
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select value={noLeas} onChange={(e)=>setNoLeas(e.target.value)} className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200">
                            <option value="" disabled>Please Select No Leas</option>
                            <option value="IN">IN</option>
                            <option value="NOT IN">NOT IN</option>
                        </select>
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
                            <option value="IN">IN</option>
                            <option value="NOT IN">NOT IN</option>
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
                        <MultipleSelect selected={selected} setSelected={setSelected}/>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    id="button"
                    type="button"
                    class="w-full px-6 py-2 mt-3 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
                >
                    Export
                </button>
            </div>
    )
}