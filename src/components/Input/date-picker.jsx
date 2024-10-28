import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export function DatepickerBase({ value, setValue, disabled = false, id, label }) {
  return (
    <>
      <label
        htmlFor={id}
        className="uppercase tracking-wide cursor-pointer text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"
      >
        {label}
      </label>
      <Datepicker
        disabled={disabled}
        id={id}
        popoverDirection="down"
        primaryColor={"emerald"}
        displayFormat="DD/MM/YYYY"
        placeholder="_ _ /_ _ /_ _ _ _"
        inputClassName="disabled:cursor-not-allowed pl-12 appearance-none block w-full  text-gray-700 border  col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        toggleClassName="absolute rounded-r-lg -top-0  left-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed text-black"
        dayClassName={(date) => (true ? "bg-red-200 text-red-600 cursor-not-allowed" : "")}
        useRange={false}
        asSingle={true}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        singleDatePicker={true}
      />
    </>
  );
}
