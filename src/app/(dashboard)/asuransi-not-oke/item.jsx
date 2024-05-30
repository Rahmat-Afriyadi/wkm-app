"use client"

import { PencilIcon } from "@heroicons/react/24/solid";
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
        <tr key={site.nama} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")} onClick={ async()=>{
            await fetch("/api/asuransi/update-ambil-data",{
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({no_msn:site.no_msn})
            })
            router.push("/asuransi-pending/" + site.no_msn )
          }}>
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {site.no_msn}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.nama_customer}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.nm_dlr}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            <span className="text-blue-600 ">
              <PencilIcon className="w-6 h-5" aria-hidden="true" />
            </span>
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Asuransi);

export default memoizedSite;
