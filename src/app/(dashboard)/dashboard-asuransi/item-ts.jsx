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
        <tr key={site.nama} className={classNames("hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {site.kd_user}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.name}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.p}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.t}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.o}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.total}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Asuransi);

export default memoizedSite;
