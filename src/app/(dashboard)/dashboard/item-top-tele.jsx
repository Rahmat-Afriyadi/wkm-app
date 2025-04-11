"use client";

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PerformanceTs = ({ user, index }) => {
  if (!user) return null;

  return (
    <tr className={classNames(index % 2 === 0 ? "bg-white" : "bg-gray-50","hover:bg-yellow-50")}>
      <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
        {user.nama_user}
      </td>
      <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{user.jumlah_sukses}</td>
      <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{user.contribution}%</td>
    </tr>
  );
};

export default memo(PerformanceTs);
