"use client";
// import DatePicker from "@/components/form/datepicker/datepicker"

import { Suspense } from "react";
import FormInputBayar from "../../../components/form/input-bayar/form-input-bayar";
import { InputBase } from "@/components/Input/input-base";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { searchFaktur } from "@/server/faktur/search-faktur";

export default function Page() {
  const { register, reset, handleSubmit } = useForm();
  const [faktur, setFaktur] = useState(null);
  const searchMut = useMutation({
    mutationFn: searchFaktur,
  });

  const onSubmit = (values) => {
    searchMut.mutate(values, {
      onSuccess: (data) => {
        setFaktur(data);
      },
      onError: (e) => {
        console.log("ini error ", e);
      },
    });
    console.log("ini values yaa ", values);
    reset();
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Input Bayar</p>
        <div className="w-4/12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBase name={"kode"} lable={"Search"} id={"kode"} register={register} disabled={false} />
          </form>
        </div>
      </div>
      <br />
      <hr />
      <br />
      {faktur && <FormInputBayar defaultValues={faktur} />}
    </>
  );
}
