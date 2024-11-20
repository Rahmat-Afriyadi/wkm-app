"use client"


import { LockClosedIcon, CurrencyDollarIcon, SignalIcon, CreditCardIcon} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "@/components/Search/index"
import Datepicker from "react-tailwindcss-datepicker";
import { useSession } from "next-auth/react";
import ButttonExportDataRenewal from "@/components/form/data-renewal/form-export"


export default function PageFrame({children, data}) {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const today = new Date()
  const currentYear = today.getFullYear(); 
  const currentMonth = today.getMonth();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear); 

  const {data:session} =useSession()
  
  const [value, setValue] = useState({
    year: currentYear.toString(), 
    month: (currentMonth === 0 ? 12 : currentMonth).toString(), 
  });

  useEffect(()=>{
    const params = new URLSearchParams(searchParams);
      params.set("year", value.year);
      params.set("month", value.month);
      replace(`${pathname}?${params}`);
  },[value.year, value.month]) // eslint-disable-line react-hooks/exhaustive-deps

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i); 

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    setValue((prev) => ({ ...prev, month: newMonth })); // Perbarui value
    const params = new URLSearchParams(searchParams);
    params.set("month", newMonth);
    replace(`${pathname}?${params}`);
  };

  const handleYearChange = (e) => {

    const newYear = e.target.value; 
    setYear(newYear); 
    setValue((prev) => ({ ...prev, year: newYear })); // Perbarui value
    const params = new URLSearchParams(searchParams);
    params.set("year", newYear);
    replace(`${pathname}?${params}`);
  };

  let content;
  const stats = Array.isArray(data) && data.length > 0 
  ? data.map((item, index) => ({
      id: index + 1,
      name: item.jns_card,
      stat: `${item.total_jumlah_data} Participant`,
      icon: CreditCardIcon,
  }))
  : []; 
  content = (
    <>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="range_verifikasi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Month Periode</label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  id="month"
                  name="month"
                  value={month}
                  onChange={handleMonthChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {months.map((monthName, index) => (
                  <option key={index} value={(parseInt(index) + 1).toString().padStart(2, '0')}>
                   {monthName}
                  </option>
                  ))}
                </select>
                <select
                  id="year"
                  name="year"
                  value={year}
                  onChange={handleYearChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {years.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
            ))}
            </select>
              </div>  
            </div>
            <ButttonExportDataRenewal params={{year:parseInt(value.year),  month:parseInt(value.month), role:session?.user.role == 1 ? "telesales":""}}/>
        </div>
        <p className="text-2xl font-medium text-gray-700 mt-4">
      Rekap Data Renewal Periode Bulan {months[parseInt(month) - 1]} Tahun {year}
     </p>
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
    </>
  );
  return content;
}
