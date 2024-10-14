"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Asuransi = ({ site, id }) => {
  const router = useRouter();

  if (site) {
    return (
      <>
        <tr key={site.id} className={classNames("hover:text-yellow hover:bg-black", id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
            {new Date(site.tgl_awal).toISOString().split("T")[0]}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {new Date(site.tgl_akhir).toISOString().split("T")[0]}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">{site.deskripsi}</td>
          <td
            className="px-3 py-4 text-sm whitespace-nowrap cursor-pointer"
            onClick={() => router.push("/input-tanggal-merah/detail/" + site.id)}
          >
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
