"use client"

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Produk = ({ produk, id, setIsModalOpen, setDetailOtr }) => {


  if (produk) {
    return (
      <>
        <tr 
        onClick={()=>{
          setDetailOtr({
            motorprice_kode:produk.kd_mdl,
            product_nama:produk.nm_mtr,
            tahun:produk.tahun,
          })
          setIsModalOpen(false)
        }}
        key={produk.nama} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
              {produk.kd_mdl}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {produk.nm_mtr}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {produk.mtr_series}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Produk);

export default memoizedSite;
