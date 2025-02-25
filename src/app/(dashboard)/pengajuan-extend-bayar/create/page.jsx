"use client";

import { AuthGetApi } from "@/lib/fetchApi";
import { FormInputExtendBayar } from "@/components/form/extend-bayar/form-input-extend-bayar";
import { InputBase } from "@/components/Input/input-base";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { searchFaktur } from "@/server/faktur/search-faktur";

export default function Page() {
  const { register, reset, handleSubmit, setFocus } = useForm();
  const [faktur, setFaktur] = useState(null);
  const [message, setMessage] = useState(null);
  const searchMut = useMutation({
    mutationFn: searchFaktur,
  });

  useEffect(() => {
    setFocus("kode");
  }, [setFocus]);

  const onSubmit = (values) => {
    setFaktur(null);
    searchMut.mutate(values, {
      onSuccess: (data) => {
        if (data.hasOwnProperty("message")) {
          setFaktur(null);
          setMessage(data.message);
        } else {
          setMessage(null);
          setFaktur(data.faktur);
        }
      },
      onError: (e) => {
        console.log("ini error ", e);
      },
    });
    reset();
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Extend Bayar</p>
        <div className="w-4/12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBase name={"kode"} lable={"Search"} id={"kode"} register={register} disabled={false} />
          </form>
        </div>
      </div>
      <br />
      <hr />
      <br />
      {faktur?.kartu.sts_kartu == "2" && <FormInputExtendBayar defaultValues={faktur} isEditing={false} />}
      {message && (
        <div className="h-screen w-full pt-12 text-center">
          <p className="text-[90px]">{message}</p>
          <div className="text-[90px] text-center">🤡</div>
        </div>
      )}
    </>
  );
}
