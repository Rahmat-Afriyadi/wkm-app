"use client"

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Produk = ({ produk, id, setIsModalOpen, setDetail }) => {


  if (produk) {
    return (
      <>
        <tr 
        onClick={()=>{
          setDetail({
            id_produk:produk.kd_produk,
            vendor_id:produk.vendor_id,
            nm_produk:produk.nm_produk,
            rate:produk.rate,
            admin:produk.admin,
          })
          setIsModalOpen(false)
        }}
        key={produk.nama} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
              {produk.kd_produk}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {produk.nm_produk}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {produk.rate} %
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {produk.nilai_pertanggungan}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Produk);

export default memoizedSite;
