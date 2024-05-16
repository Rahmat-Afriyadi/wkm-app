"use client"

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dealer = ({ dealer, id, setIsModalOpen, setDealer }) => {


  if (dealer) {
    return (
      <>
        <tr 
        onClick={()=>{
          setDealer({
            kd_dlr:dealer.kd_dlr,
            nm_dlr:dealer.nm_dlr,
          })
          setIsModalOpen(false)
        }}
        key={dealer.kd_dlr} className={classNames("cursor-pointer hover:text-yellow hover:bg-black",id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
              {dealer.kd_dlr}
          </td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">
            {dealer.nm_dlr}
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedDealer = memo(Dealer);

export default memoizedDealer;
