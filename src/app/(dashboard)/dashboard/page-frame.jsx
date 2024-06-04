"use client"


import { LockClosedIcon, CurrencyDollarIcon, SignalIcon} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormExportReportAsuransi  from "@/components/form/report-asuransi/form-export"


export default function PageFrame({data}) {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const today = new Date()
  const [tgl, setTgl] = useState(today.toISOString().split('T')[0])

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set("tgl", e.target.value);
    setTgl(e.target.value)
    replace(`${pathname}?${params}`);
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
                <label htmlFor="periode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode</label>
                <input type="date" id="periode" value={tgl} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
            </div>
        </div>

      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">


        {stats.map((item) => (
          <div
            key={item.id}
            className="relative px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6">
            <dt>
              <div className=" absolute p-3 rounded-md bg-cyan">
                <item.icon
                  className="w-6 h-6 text-white"
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

      <FormExportReportAsuransi/>

        

    </>
  );
  return content;
}
