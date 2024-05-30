import React from "react";
import Input from "@/components/Input/index";

export default function ActionInput({
  label,
  id,
  name,
  type,
  required,
  register,
  errors,
}) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        <span className="text-red-500" hidden={!required ? true : false}>
          *
        </span>
      </label>
      <div className="mt-1">
        <Input
          id={id}
          name={name}
          type={type}
          required={required}
          className="max-w-lg"
          register={register}
          errors={errors}
        />
      </div>
    </>
  );
}
