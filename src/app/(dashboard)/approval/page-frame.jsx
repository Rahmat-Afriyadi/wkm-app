"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function PageFrame({children}){

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const today = new Date()
     const [value, setValue] = useState({startDate:today.toISOString().split('T')[0].slice(0, 8)+"01", endDate:today.toISOString().split('T')[0]}); 


    const handleValueChange = (newValue) => {
      const params = new URLSearchParams(searchParams);
      params.set("tgl1", newValue.startDate);
      params.set("tgl2", newValue.endDate);
      replace(`${pathname}?${params}`);
      setValue(newValue); 
  } 

    return (
        <>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="range_verifikasi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range Periode</label>
                    
                    <Datepicker
                    id={"range_verifikasi"}
                    // inputClassName="z-40 max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    toggleClassName="absolute rounded-r-lg -top-0  right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed" 
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

                    name={"range_verifikasi"}
                    value={value}
                    primaryColor={"amber"}
                    onChange={handleValueChange}/>
                </div>
                
            </div>

            <div className="flex flex-col mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    {children}
                </div>
            </div>
            </div>
        </div>
        </>
    )
}