"use client"


import { LockClosedIcon, CurrencyDollarIcon, SignalIcon} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "@/components/Search/index"
import Datepicker from "react-tailwindcss-datepicker";
import { useSession } from "next-auth/react";
import ButttonExportReportAsuransi from "@/components/form/report-asuransi/form-export"


export default function PageFrame({children, data}) {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const today = new Date()
  const {data:session} =useSession()
  
  const [value, setValue] = useState({startDate:today.toISOString().split('T')[0], endDate:today.toISOString().split('T')[0]}); 

  useEffect(()=>{
    const params = new URLSearchParams(searchParams);
      params.set("tgl1", value.startDate);
      params.set("tgl2", value.endDate);
      replace(`${pathname}?${params}`);
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleValueChange = (newValue) => {
      const params = new URLSearchParams(searchParams);
      params.set("tgl1", newValue.startDate);
      params.set("tgl2", newValue.endDate);
      replace(`${pathname}?${params}`);
      setValue(newValue); 
  } 

  let content;

  const stats = [
    {
      id: 1,
      name: "Pending",
      stat: `${data.Pending} Participant`,
      icon: SignalIcon,
    },
    {
      id: 2,
      name: "Tidak Berminat",
      stat: `${data.TdkBerminat} Participant`,
      icon: LockClosedIcon,
    },
    {
      id: 3,
      name: "Berminat",
      stat: `${data.Berminat} Participant`,
      icon: CurrencyDollarIcon,
    },
  ];
    
  content = (
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
            
            <ButttonExportReportAsuransi params={{awal_tgl:value.startDate,  akhir_tgl:value.endDate}}/>
        </div>

      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">


        {stats.map((item) => (
          <div
            key={item.id}
            className="relative px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6">
            <dt>
              <div className=" absolute p-3 rounded-md bg-yellow">
                <item.icon
                  className="w-6 h-6 text-black"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="flex items-baseline ml-16">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
            </dd>
          </div>
        ))}
      </div>

        <br></br>

        <div className="sm:flex lg:items-center">
            <div className="sm:flex-auto">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-end">
                <div className="max-w-xs mr-2 w-80">
                  <Search
                          id="search-query"
                          name="search_query"
                          placeholder={"Search for a asuransi..."}
                      />
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
  return content;
}
