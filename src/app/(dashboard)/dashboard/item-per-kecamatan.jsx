"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import React, { memo } from "react";

const DataPerKecamatan = ({ site, id }) => {
  if (!site) return null;

  return (
    <tr
      key={site.kecamatan}
      className={classNames(
        "cursor-pointer hover:text-yellow hover:bg-black",
        id % 2 === 0 ? "" : "bg-gray-50"
      )}
    >
      <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
        {site.kecamatan}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {site.jumlah}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {site.persen}%
      </td>
    </tr>
  );
};

export default memo(DataPerKecamatan);
