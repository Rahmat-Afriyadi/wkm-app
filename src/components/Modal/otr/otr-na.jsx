"use client"

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OtrNa = ({ otrNa, id, setIsModalOpen, setDetailOtr }) => {

  if (otrNa) {
    return (
      <>
        <tr 
        onClick={()=>{
          setDetailOtr({
            motorprice_code:otrNa.motorprice_kode,
            product_nama:otrNa.nm_mtr,
            tahun:otrNa.tahun,
          })
          setIsModalOpen(false)
        }}
        key={otrNa.nama} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
              {otrNa.motorprice_kode}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {otrNa.nm_mtr}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {otrNa.tahun}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(OtrNa);

export default memoizedSite;
