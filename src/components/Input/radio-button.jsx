"use client";

import { useState } from "react";

export default function RadioButtonComponent({ options = [], name, label, register, validation, errors, ...props }) {
  return (
    <div className="w-full mx-auto ">
      <h1 className="">{label}</h1>
      <div
        className={`flex gap-3 px-2 py-1 border-2 border-gray-300 rounded-md justify-start ${
          errors[name] ? "pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500" : ""
        } ${props.disabled ? "bg-gray-300 cursor-not-allowed" : ""}`}
      >
        {options &&
          options.map((e) => {
            return (
              <label key={e.value} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  value={e.value}
                  disabled={props.disabled}
                  {...register(name, validation)}
                  className={`w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 cursor-pointer `}
                />
                <span className="text-gray-700">{e.name}</span>
              </label>
            );
          })}
      </div>
      {errors[name] && (
        <p className="text-sm text-red absolute" style={{ marginTop: 2 }}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
