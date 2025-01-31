"use client";

import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function SelectGroup({ label, name, id, register, disabled, errors, options, validation }) {
  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <select
        disabled={disabled}
        {...register(name, validation)}
        id={id}
        className={`cursor-pointer appearance-none block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm  ${
          errors[name] ? "pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500" : ""
        } ${disabled ? "bg-gray-300 cursor-not-allowed" : ""}`}
      >
        {options.map((e) => {
          return (
            <option value={e.value} key={e.value} className="py-1 cursor-pointer">
              {e.name}
            </option>
          );
        })}
      </select>
      {errors[name] && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ExclamationCircleIcon aria-hidden="true" className="w-5 h-5 text-red-500" />
        </div>
      )}
      {errors[name] && (
        <p className="text-sm text-red absolute" style={{ marginTop: 2 }}>
          {errors[name]?.message}
        </p>
      )}
    </>
  );
}
