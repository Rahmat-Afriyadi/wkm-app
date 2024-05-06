import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import {useForm} from "react-hook-form";

export default function Input({
  id,
  name,
  type,
  minLength,
  errors,
  className,
  style,
  required,
  readOnly,
  disabled,
  register,
  ...props
}) {
  return (
    <>
      <div className={`relative ${className}`}>
        <input
          type={type}
          name={name}
          id={id}
          autoComplete={"on"}
          style={style}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={errors[name] ? "true" : "false"}
          aria-describedby={`${id}-error`}
          className={
            errors[name]
              ? "block w-full max-w-lg pr-10 rounded-md shadow-sm border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              : disabled
              ? "block w-full max-w-lg rounded-md shadow-sm border-gray-300 bg-gray-300 opacity-50 pointer-events-none sm:text-sm"
              : "block w-full max-w-lg rounded-md shadow-sm border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          }
          {...register(name, {
            required: required ? "This field is required" : false
          })}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {errors[name] ? (
            <ExclamationCircleIcon
              className="w-5 h-5 text-red-500"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {errors[name].message}
        </p>
      )}
    </>
  );
}
