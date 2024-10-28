import React from "react";

export function InputBase({ id, lable, register, name, disabled }) {
  return (
    <>
      <label
        className="uppercase tracking-wide cursor-pointer text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"
        style={{ whiteSpace: "nowrap" }}
        htmlFor={id}
      >
        {lable}
      </label>
      <input
        id={id}
        {...register(name)}
        disabled={disabled}
        className="disabled:cursor-not-allowed appearance-none block w-full  text-gray-700 border  col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="text"
      />
    </>
  );
}
