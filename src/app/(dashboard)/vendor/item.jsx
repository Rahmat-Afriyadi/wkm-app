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
            {site.nm_vendor}
          </td>
          <td dangerouslySetInnerHTML={{ __html: site.deskripsi }} className="px-3 py-4 text-sm whitespace-nowrap font-bold">
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.admin.toLocaleString()}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {site.dealer} %
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {site.wkm} %
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap cursor-pointer" onClick={()=>router.push("/vendor/detail/" + site.kd_vendor)}>
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
