"use client"

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Kodepos = ({ kodepos, id, setIsModalOpen, setAlamatKirim }) => {


  if (kodepos) {
    return (
      <>
        <tr 
        onClick={()=>{
          setAlamatKirim({
            kelurahan:kodepos.kelurahan,
            kecamatan:kodepos.kecamatan,
            kodepos:kodepos.kodepos,
          })
          setIsModalOpen(false)
        }}
        key={kodepos.nama} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
              {kodepos.kodepos}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {kodepos.kelurahan}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {kodepos.kecamatan}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Kodepos);

export default memoizedSite;
