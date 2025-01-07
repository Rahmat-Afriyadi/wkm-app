"use client";

import React from "react";
import { InputBase } from "@/components/Input/input-base";
import { Form, useForm } from "react-hook-form";

export default function FormInputTelesales() {
  const { register, setValue, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-7">
      <div className="col-span-1">
        <InputBase name={"no_msn"} lable={"Nomor Mesin"} id={"no_msn"} register={register} disabled={true} />
      </div>
    </form>
  );
}
