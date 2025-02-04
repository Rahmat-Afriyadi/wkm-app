"use client";

import React, { memo } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const ItemScript = ({ data, id }) => {
  const router = useRouter();
  return (
    <tr className={id % 2 === 0 ? "bg-gray-50" : "hover:bg-gray-100"}>
      <td className="px-3 py-4 text-sm">{data.title}</td>
      <td className="px-3 py-4 text-sm">{data.is_active}</td>
      <td className="px-3 py-4 text-sm">{data.created ? new Date(data.assign_date).toLocaleDateString() : "Belum Ditetapkan"} {/* Assign Date */}</td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {/* Edit button */}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/master-script/detail/" + data.id)}// Call the edit function with the ticket ID
          >
          <PencilIcon className="w-6 h-5" aria-hidden="true" />
        </span>
      </td>
    </tr>
  );
};

export default memo(ItemScript);
