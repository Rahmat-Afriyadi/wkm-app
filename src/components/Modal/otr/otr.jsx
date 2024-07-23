"use client"

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Otr = ({ otr, id, setIsModalOpen, setDetailOtr }) => {

  if (otr) {
    return (
      <>
        <tr 
        onClick={()=>{
          setDetailOtr({
            kd_mdl:otr.motorprice_kode,
            nm_mtr:otr.mst_mtr?.nm_mtr,
            tahun:otr.tahun,
            otr:otr.otr
          })
          setIsModalOpen(false)
        }}
        key={otr.nama} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
              {otr.motorprice_kode}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {otr.mst_mtr?.nm_mtr}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {otr.tahun}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Otr);

export default memoizedSite;
