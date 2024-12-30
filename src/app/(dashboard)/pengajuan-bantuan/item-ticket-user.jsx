"use client";

import React, { memo } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const ItemTicketUser = ({ ticket, id }) => {
  const router = useRouter();
  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "On Progress";
      case 2:
        return "Pending";
      case 3:
        return "Finish";
      case 4:
        return "Decline";
      default:
        return "-";
    }
  };

  return (
    <tr className={id % 2 === 0 ? "bg-gray-50" : "hover:bg-gray-100"}>
      <td className="px-3 py-4 text-sm">{ticket.no_ticket}</td>
      <td className="px-3 py-4 text-sm">{ticket.kd_user}</td>
      <td className="px-3 py-4 text-sm">{ticket.jenis_ticket}</td>
      <td className="px-3 py-4 text-sm">{getStatusLabel(ticket.status)}</td>
      <td className="px-3 py-4 text-sm">{ticket.kd_user_it ? ticket.kd_user_it : "Belum Ditetapkan"}</td>
      <td className="px-3 py-4 text-sm">{ticket.assign_date ? new Date(ticket.assign_date).toLocaleDateString() : "Belum Ditetapkan"} {/* Assign Date */}</td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {/* Edit button */}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/pengajuan-bantuan/detail/" + ticket.no_ticket)}// Call the edit function with the ticket ID
          >
          <PencilIcon className="w-6 h-5" aria-hidden="true" />
        </span>
      </td>
    </tr>
  );
};

export default memo(ItemTicketUser);
