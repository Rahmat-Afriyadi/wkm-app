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
            {site.kd_produk}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {site.nm_produk}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.jns_asuransi == "1" ? "Kendaraan" : site.jns_asuransi == "2" ? "Jiwa":""}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.nilai_pertanggungan.toLocaleString()}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.premi.toLocaleString()}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.admin.toLocaleString()}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap cursor-pointer" onClick={()=>router.push("/produk/detail/" + site.kd_produk)}>
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
