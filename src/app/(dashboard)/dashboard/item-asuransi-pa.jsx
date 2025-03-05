"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AsuransiPA = ({ site, id }) => {
  const router = useRouter();

  if (site) {
    return (
      <>
        <tr
          key={site.no_msn}
          className={classNames(
            "hover:text-yellow hover:bg-black",
            id % 2 === 0 ? "" : "bg-gray-50"
          )}
        >
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {site.no_msn}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.nm_customer_wkm === "" ? site.nm_customer_fkt : site.nm_customer_wkm}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.sts_asuransi}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.tgl_beli}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {site.id_produk}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(AsuransiPA);

export default memoizedSite;
