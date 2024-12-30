"use client";

import React, { memo } from "react";
import moment from "moment";

const ItemTicketQueue = ({ ticket, id }) => {
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
      
    </tr>
  );
};

export default memo(ItemTicketQueue);
