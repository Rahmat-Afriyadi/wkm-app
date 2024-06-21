"use client"


import { useSession } from "next-auth/react";
import Search from "@/components/Search/index"
import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SiteFrame({children, alasanPendingList}) {
    const {data:session} = useSession()
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const [alasanPending, setAlasanPending]= useState("")

    const [value, setValue] = useState({startDate:"", endDate:""}); 

    useEffect(()=>{
        const params = new URLSearchParams(searchParams);
        params.set("tgl1", "");
        params.set("tgl2", "");
        replace(`${pathname}?${params}`);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleValueChange = (newValue) => {
        const params = new URLSearchParams(searchParams);
        if (newValue.startDate != null && newValue.endDate) {
            params.set("tgl1", newValue.startDate);
            params.set("tgl2", newValue.endDate);
            replace(`${pathname}?${params}`);
        } else {
            params.set("tgl1", "");
            params.set("tgl2", "");
            replace(`${pathname}?${params}`);
        }
        setValue(newValue); 
    } 

    if (!session?.user?.permissions?.includes("Asuransi Pending")) {
        
    }
    // const privileges = session?.user.role.privileges;
    // const privilege  = privileges?.filter((val) => val.name === "Sites")[0];
    const privilege  = {add:true,};
    return (
        <>
        {/* <Titlepage name="Sites" /> */}

        <div className="sm:flex lg:items-center">
            <div className="sm:flex-auto">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-end">
                {/* Search */}
                <div className="max-w-xs mr-2 w-80">
                <Search
                        id="search-query"
                        name="search_query"
                        placeholder={"Search for a asuransi..."}
                    />
                </div>
                <div className="max-w-xs mr-2 w-80">
                    
                    <Datepicker
                        id={"range_verifikasi"}
                        toggleClassName="absolute rounded-r-lg -top-0  right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed" 
                        inputClassName="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-9 sm:text-sm" 

                        name={"range_verifikasi"}
                        value={value}
                        primaryColor={"amber"}
                        onChange={handleValueChange}
                    />
                </div>
                <div className="max-w-xs mr-2 w-80">
                {/* <ActionSelect
                    id={"active"}
                    name={"active"}
                    required={false}
                /> */}
                    <select 
                    value={alasanPending}
                    onChange={(e)=>{
                        const params = new URLSearchParams(searchParams);
                        params.set("ap", e.target.value);
                        replace(`${pathname}?${params}`);
                        setAlasanPending(e.target.value)
                    }}
                    className="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-2 sm:text-sm" id="grid-state">
                        <option value="">Pilih Alasan</option>
                        {alasanPendingList.map((e)=>{
                            return (
                                <option key={e.name} value={e.id}>{e.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
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
    );
}
