"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import React, { memo } from "react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function determineStatus(print, stsRenewal, stsKartu, stsBayarRenewal) {
  if (print === 0 && stsRenewal === "O") {
    return "Belum Print TT";
  }
  switch (stsKartu) {
    case 1:
      return "Print TT";
    case 2:
      return "Bawa Kurir";
    case 3:
      if (stsRenewal === "O" && stsBayarRenewal === "S") {
        return "Sukses";
      }
      break;
    case 4:
      return "Check Kartu";
    case 6:
      return "Kartu Kembali TS";
  }
  return "";
}

const Membership = ({ site, id }) => {
  if (!site) return null;

  return (
    <tr
      key={site.no_msn}
      className={classNames(
        "cursor-pointer hover:text-yellow hover:bg-black",
        id % 2 === 0 ? "" : "bg-gray-50"
      )}
    >
      <td className="px-3 py-4 text-sm whitespace-nowrap font-bold">
        {site.no_msn}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {site.nm_customer11}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {site.sts_jenis_bayar}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {site.tgl_bayar_renewal}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {determineStatus(site.print, site.sts_renewal, parseInt(site.sts_kartu), site.sts_bayar_renewal)}
      </td>
      <td className="px-3 py-4 text-sm whitespace-nowrap">
        {site.nm_kurir}
      </td>
    </tr>
  );
};

export default memo(Membership);
