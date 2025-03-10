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
        <tr key={site.nama} className={classNames("hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")} >
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {site.motorprice_kode}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.mst_mtr?.nm_mtr}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.otr.toLocaleString()}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.tahun}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap cursor-pointer" onClick={()=>router.push("/otr/detail/" + site.id)}>
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
