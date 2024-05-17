"use client"

import { useRouter } from "next/navigation";
import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const Asuransi = ({ site, id }) => {

  const router = useRouter()

  if (site) {
    return (
      <>
        <tr key={site.nama} 
        onClick={async()=>{
            console.log("terklik kok ini")
            await fetch("/api/asuransi/update-ambil-data",{
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({no_msn:site.no_msn})
            })
            router.push("/asuransi/" + site.no_msn )
          }}
        className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap" >
            {site.no_msn}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.nama_customer}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.jenis_asuransi == '2' ? 'Personal Accident' : site.jenis_asuransi == '1' ? 'Motor' : site.jenis_asuransi == '3' ? 'Personal Accident & Motor' :'' }
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedAsuransi = memo(Asuransi);

export default memoizedAsuransi;
