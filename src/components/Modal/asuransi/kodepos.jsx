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
            province:{name:kodepos.province,code:kodepos.province_code},
            city:{name:kodepos.city,code:kodepos.city_code},
            subdistrict:{name:kodepos.subdistrict,code:kodepos.subdistrict_code},
          })
          setIsModalOpen(false)
        }}
        key={kodepos.nama} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
              {kodepos.province}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {kodepos.city}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {kodepos.subdistrict}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Kodepos);

export default memoizedSite;
