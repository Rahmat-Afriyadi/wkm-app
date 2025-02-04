"use client";

import React, { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Motor = ({ mtr, id, setIsModalOpen, handleClick = (e) => console.log(e) }) => {
  if (mtr) {
    return (
      <>
        <tr
          onClick={() => {
            handleClick(mtr);
            setIsModalOpen(false);
          }}
          key={mtr.nama}
          className={classNames("cursor-pointer hover:text-yellow hover:bg-black", id % 2 === 0 ? " " : "bg-gray-50")}
        >
          <td className="px-3 py-4 text-sm whitespace-nowrap">{mtr.no_mtr}</td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">{mtr.nm_mtr}</td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">{mtr.mtr_series}</td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Motor);

export default memoizedSite;
