import React from "react";

export function SelectBase({ id, lable, register, name, disabled, options }) {
  return (
    <>
      <label
        className="uppercase tracking-wide cursor-pointer text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"
        style={{ whiteSpace: "nowrap" }}
        htmlFor={id}
      >
        {lable}
      </label>
      <select
        disabled={disabled}
        {...register(name)}
        id={id}
        className={
          "appearance-none block w-full cursor-pointer text-gray-700 border col-span-8 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
        }
      >
        {options.map((e) => {
          return (
            <option value={e.value} key={e.value} className="py-1 cursor-pointer">
              {e.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
